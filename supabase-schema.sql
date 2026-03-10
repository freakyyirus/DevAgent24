-- ==============================================================================
-- DEVAGENT24: Supabase Implementation Schema
-- Run this in the Supabase SQL Editor to initialize the database
-- ==============================================================================

-- 1. Create custom types
CREATE TYPE difficulty AS ENUM ('easy', 'medium', 'hard');
CREATE TYPE tdd_phase AS ENUM ('red', 'green', 'refactor', 'completed');
CREATE TYPE interview_type AS ENUM ('technical', 'behavioral', 'system_design');

-- 2. Profiles Table (Extends auth.users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    github_username TEXT,
    avatar_url TEXT,
    experience_level TEXT DEFAULT 'junior',
    target_companies TEXT[] DEFAULT '{}',
    is_pro BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone." 
    ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." 
    ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile." 
    ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, github_username)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.raw_user_meta_data->>'user_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- 3. Skill Matrices Table
CREATE TABLE public.skill_matrices (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
    algorithms INTEGER DEFAULT 0 CHECK (algorithms >= 0 AND algorithms <= 100),
    data_structures INTEGER DEFAULT 0 CHECK (data_structures >= 0 AND data_structures <= 100),
    system_design INTEGER DEFAULT 0 CHECK (system_design >= 0 AND system_design <= 100),
    behavioral INTEGER DEFAULT 0 CHECK (behavioral >= 0 AND behavioral <= 100),
    testing INTEGER DEFAULT 0 CHECK (testing >= 0 AND testing <= 100),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.skill_matrices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own skill matrix" 
    ON public.skill_matrices FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own skill matrix" 
    ON public.skill_matrices FOR ALL USING (auth.uid() = user_id);

-- Trigger to create default skill matrix on profile creation
CREATE OR REPLACE FUNCTION public.handle_new_profile() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.skill_matrices (user_id) VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_profile_created
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_profile();


-- 4. Challenge Attempts Table
CREATE TABLE public.challenge_attempts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    challenge_id TEXT NOT NULL,
    status tdd_phase DEFAULT 'red',
    language TEXT NOT NULL,
    attempts INTEGER DEFAULT 0,
    time_spent_minutes INTEGER DEFAULT 0,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, challenge_id, language)
);

ALTER TABLE public.challenge_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own attempts" 
    ON public.challenge_attempts FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own attempts" 
    ON public.challenge_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own attempts" 
    ON public.challenge_attempts FOR UPDATE USING (auth.uid() = user_id);


-- 5. Certificates Table
CREATE TABLE public.certificates (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    track_name TEXT NOT NULL,
    score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
    blockchain_hash TEXT,
    explorer_url TEXT,
    certificate_address TEXT,
    issued_at TIMESTAMPTZ DEFAULT NOW(),
    skills TEXT[] DEFAULT '{}',
    is_valid BOOLEAN DEFAULT TRUE
);

ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Certificates are publicly viewable" 
    ON public.certificates FOR SELECT USING (true);

-- Note: In a real app, only the backend service role should be able to insert certs
CREATE POLICY "Users can insert certs (Demo mode)" 
    ON public.certificates FOR INSERT WITH CHECK (auth.uid() = user_id);


-- ==============================================================================
-- Functions & Views
-- ==============================================================================

-- Function to increment completed challenge count easily
CREATE OR REPLACE FUNCTION get_user_stats(req_user_id UUID)
RETURNS JSON AS $$
DECLARE
    challenges_count INT;
    certs_count INT;
    avg_score INT;
BEGIN
    SELECT COUNT(*) INTO challenges_count FROM public.challenge_attempts WHERE user_id = req_user_id AND status = 'completed';
    SELECT COUNT(*) INTO certs_count FROM public.certificates WHERE user_id = req_user_id;
    SELECT COALESCE(AVG(score)::INT, 0) INTO avg_score FROM public.certificates WHERE user_id = req_user_id;
    
    RETURN json_build_object(
        'challengesCompleted', challenges_count,
        'certificatesEarned', certs_count,
        'averageScore', avg_score
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
