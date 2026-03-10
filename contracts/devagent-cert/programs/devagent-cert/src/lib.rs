use anchor_lang::prelude::*;

declare_id!("DevAg24CertProgramXXXXXXXXXXXXXXXXXXXXXXXXXXX");

#[program]
pub mod devagent_cert {
    use super::*;

    /// Issue a new certificate as an on-chain account (PDA).
    /// Called by the platform authority after a user completes a track.
    pub fn issue_certificate(
        ctx: Context<IssueCertificate>,
        track_name: String,
        recipient_name: String,
        score: u8,
        skills: Vec<String>,
    ) -> Result<()> {
        require!(score <= 100, CertError::InvalidScore);
        require!(track_name.len() <= 64, CertError::TrackNameTooLong);
        require!(recipient_name.len() <= 64, CertError::RecipientNameTooLong);
        require!(skills.len() <= 10, CertError::TooManySkills);

        let cert = &mut ctx.accounts.certificate;
        let clock = Clock::get()?;

        cert.authority = ctx.accounts.authority.key();
        cert.recipient = ctx.accounts.recipient.key();
        cert.track_name = track_name;
        cert.recipient_name = recipient_name;
        cert.score = score;
        cert.skills = skills;
        cert.issued_at = clock.unix_timestamp;
        cert.is_valid = true;
        cert.bump = ctx.bumps.certificate;

        emit!(CertificateIssued {
            certificate: cert.key(),
            recipient: cert.recipient,
            track_name: cert.track_name.clone(),
            score: cert.score,
            issued_at: cert.issued_at,
        });

        msg!(
            "Certificate issued: {} for {} (score: {})",
            cert.track_name,
            cert.recipient_name,
            cert.score
        );

        Ok(())
    }

    /// Verify a certificate is valid on-chain.
    /// Anyone can call this — it's a read-only check.
    pub fn verify_certificate(ctx: Context<VerifyCertificate>) -> Result<()> {
        let cert = &ctx.accounts.certificate;

        require!(cert.is_valid, CertError::CertificateRevoked);

        emit!(CertificateVerified {
            certificate: cert.key(),
            recipient: cert.recipient,
            track_name: cert.track_name.clone(),
            is_valid: cert.is_valid,
        });

        msg!(
            "Certificate verified: {} for {} — VALID (score: {})",
            cert.track_name,
            cert.recipient_name,
            cert.score
        );

        Ok(())
    }

    /// Revoke a certificate. Only the original authority can do this.
    pub fn revoke_certificate(ctx: Context<RevokeCertificate>) -> Result<()> {
        let cert = &mut ctx.accounts.certificate;
        cert.is_valid = false;

        emit!(CertificateRevoked {
            certificate: cert.key(),
            recipient: cert.recipient,
            track_name: cert.track_name.clone(),
        });

        msg!("Certificate revoked: {}", cert.track_name);

        Ok(())
    }
}

// ── Accounts ──

#[derive(Accounts)]
#[instruction(track_name: String)]
pub struct IssueCertificate<'info> {
    /// The platform authority (signer who pays for the account)
    #[account(mut)]
    pub authority: Signer<'info>,

    /// The recipient's public key (doesn't need to sign)
    /// CHECK: This is the certificate recipient, validated by authority
    pub recipient: AccountInfo<'info>,

    /// The certificate PDA — derived from recipient + track_name
    #[account(
        init,
        payer = authority,
        space = Certificate::SIZE,
        seeds = [
            b"certificate",
            recipient.key().as_ref(),
            track_name.as_bytes(),
        ],
        bump,
    )]
    pub certificate: Account<'info, Certificate>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct VerifyCertificate<'info> {
    /// The certificate account to verify
    pub certificate: Account<'info, Certificate>,
}

#[derive(Accounts)]
pub struct RevokeCertificate<'info> {
    /// Only the original authority can revoke
    #[account(
        constraint = authority.key() == certificate.authority @ CertError::Unauthorized
    )]
    pub authority: Signer<'info>,

    #[account(mut)]
    pub certificate: Account<'info, Certificate>,
}

// ── State ──

#[account]
pub struct Certificate {
    /// Authority who issued this certificate
    pub authority: Pubkey,
    /// Recipient's public key
    pub recipient: Pubkey,
    /// Track name (e.g. "Agentic AI", "navan.ai TDD")
    pub track_name: String,
    /// Recipient's display name
    pub recipient_name: String,
    /// Score 0-100
    pub score: u8,
    /// Skills demonstrated
    pub skills: Vec<String>,
    /// Unix timestamp of issuance
    pub issued_at: i64,
    /// Whether the certificate is still valid
    pub is_valid: bool,
    /// PDA bump seed
    pub bump: u8,
}

impl Certificate {
    // 8 (discriminator) + 32 (authority) + 32 (recipient)
    // + 4+64 (track_name) + 4+64 (recipient_name)
    // + 1 (score) + 4+10*(4+32) (skills) + 8 (issued_at)
    // + 1 (is_valid) + 1 (bump) + padding
    pub const SIZE: usize = 8 + 32 + 32 + 68 + 68 + 1 + 364 + 8 + 1 + 1 + 64;
}

// ── Events ──

#[event]
pub struct CertificateIssued {
    pub certificate: Pubkey,
    pub recipient: Pubkey,
    pub track_name: String,
    pub score: u8,
    pub issued_at: i64,
}

#[event]
pub struct CertificateVerified {
    pub certificate: Pubkey,
    pub recipient: Pubkey,
    pub track_name: String,
    pub is_valid: bool,
}

#[event]
pub struct CertificateRevoked {
    pub certificate: Pubkey,
    pub recipient: Pubkey,
    pub track_name: String,
}

// ── Errors ──

#[error_code]
pub enum CertError {
    #[msg("Score must be between 0 and 100")]
    InvalidScore,
    #[msg("Track name too long (max 64 characters)")]
    TrackNameTooLong,
    #[msg("Recipient name too long (max 64 characters)")]
    RecipientNameTooLong,
    #[msg("Too many skills (max 10)")]
    TooManySkills,
    #[msg("Certificate has been revoked")]
    CertificateRevoked,
    #[msg("Only the issuing authority can perform this action")]
    Unauthorized,
}
