/**
 * DevAgent24 — n8n Webhook Client
 *
 * Triggers n8n workflows on key platform events.
 * Events: challenge_completed, interview_done, certificate_issued
 *
 * Set N8N_WEBHOOK_URL in .env.local to enable.
 * Without a URL, events are silently discarded.
 */

type EventType = 'challenge_completed' | 'interview_done' | 'certificate_issued';

interface EventPayload {
  [key: string]: string | number | boolean | string[];
}

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || '';

export async function triggerN8nWebhook(
  event: EventType,
  payload: EventPayload
): Promise<boolean> {
  if (!N8N_WEBHOOK_URL) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[n8n] Event "${event}" (no webhook URL configured):`, payload);
    }
    return false;
  }

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event,
        timestamp: new Date().toISOString(),
        platform: 'devagent24',
        ...payload,
      }),
      signal: AbortSignal.timeout(5000), // 5s timeout
    });

    if (!response.ok) {
      console.error(`[n8n] Webhook failed: ${response.status} ${response.statusText}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error('[n8n] Webhook error:', error);
    return false;
  }
}

/**
 * Helper: fire webhook after a challenge is completed
 */
export function onChallengeCompleted(data: {
  userId: string;
  challengeId: string;
  challengeTitle: string;
  language: string;
  score: number;
  timeSpentMinutes: number;
}) {
  return triggerN8nWebhook('challenge_completed', data);
}

/**
 * Helper: fire webhook after an interview session ends
 */
export function onInterviewDone(data: {
  userId: string;
  interviewType: string;
  questionsAnswered: number;
  averageScore: number;
}) {
  return triggerN8nWebhook('interview_done', data);
}

/**
 * Helper: fire webhook after a certificate is issued
 */
export function onCertificateIssued(data: {
  certificateId: string;
  recipient: string;
  track: string;
  score: number;
  blockchainHash: string;
}) {
  return triggerN8nWebhook('certificate_issued', {
    certificate_id: data.certificateId,
    recipient: data.recipient,
    track: data.track,
    score: data.score,
    blockchain_hash: data.blockchainHash,
  });
}
