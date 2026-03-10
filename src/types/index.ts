// ============================================================
// DevAgent 2.0 — TypeScript Type Definitions
// ============================================================

export interface Profile {
  id: string;
  full_name: string;
  github_username?: string;
  target_companies: string[];
  experience_level: 'junior' | 'mid' | 'senior';
  created_at: string;
  updated_at: string;
}

export interface SkillMatrix {
  id: string;
  user_id: string;
  algorithms: number;
  data_structures: number;
  system_design: number;
  behavioral: number;
  language_proficiency: number;
  testing: number;
  assessed_at: string;
}

export type Difficulty = 'easy' | 'medium' | 'hard';
export type TDDPhase = 'red' | 'green' | 'refactor' | 'completed';

export type SupportedLanguage =
  | 'python'
  | 'javascript'
  | 'typescript'
  | 'go'
  | 'java'
  | 'cpp'
  | 'rust'
  | 'ruby';

export interface Challenge {
  id: string;
  title: string;
  difficulty: Difficulty;
  category: string;
  description: string;
  initial_tests: Record<SupportedLanguage, string>;
  solution_template: Record<SupportedLanguage, string>;
  hints: string[];
  estimated_minutes: number;
  skills_tested: string[];
}

export interface ChallengeAttempt {
  id: string;
  user_id: string;
  challenge_id: string;
  status: TDDPhase;
  user_code: string;
  language: SupportedLanguage;
  attempts: number;
  hints_used: number;
  time_spent_minutes: number;
  completed_at?: string;
  created_at: string;
}

export type InterviewType = 'technical' | 'behavioral' | 'system_design';

export interface InterviewMessage {
  role: 'interviewer' | 'candidate';
  content: string;
  timestamp: number;
}

export interface InterviewSession {
  id: string;
  user_id: string;
  interview_type: InterviewType;
  difficulty: Difficulty;
  transcript: InterviewMessage[];
  technical_score?: number;
  communication_score?: number;
  completed_at?: string;
  created_at: string;
}

export interface Certificate {
  id: string;
  user_id: string;
  track_name: string;
  score: number;
  blockchain_hash?: string;
  pdf_url?: string;
  issued_at: string;
  recipient_name: string;
  skills: string[];
  verified: boolean;
}

export interface ExecutionResult {
  status: 'success' | 'error' | 'timeout';
  output: string;
  error?: string;
  execution_time_ms: number;
  memory_kb?: number;
  tests_passed?: number;
  tests_total?: number;
}

export interface TDDResult {
  phase: TDDPhase;
  passed: boolean;
  output: string;
  error?: string;
  test_results: {
    name: string;
    passed: boolean;
    message?: string;
  }[];
}

export interface LearningPath {
  id: string;
  user_id: string;
  title: string;
  duration_days: number;
  status: 'active' | 'completed' | 'paused';
  current_day: number;
  created_at: string;
}

export interface WorkflowLog {
  id: string;
  workflow_name: string;
  execution_id?: string;
  user_id: string;
  status: 'running' | 'completed' | 'failed';
  started_at: string;
  completed_at?: string;
  error_message?: string;
}

// Language metadata for the multi-language code execution system
export const LANGUAGE_CONFIG: Record<
  SupportedLanguage,
  { name: string; judge0Id: number; monacoLang: string; icon: string }
> = {
  python: { name: 'Python', judge0Id: 71, monacoLang: 'python', icon: '🐍' },
  javascript: { name: 'JavaScript', judge0Id: 63, monacoLang: 'javascript', icon: '🟨' },
  typescript: { name: 'TypeScript', judge0Id: 74, monacoLang: 'typescript', icon: '🔷' },
  go: { name: 'Go', judge0Id: 60, monacoLang: 'go', icon: '🐹' },
  java: { name: 'Java', judge0Id: 62, monacoLang: 'java', icon: '☕' },
  cpp: { name: 'C++', judge0Id: 54, monacoLang: 'cpp', icon: '⚡' },
  rust: { name: 'Rust', judge0Id: 73, monacoLang: 'rust', icon: '🦀' },
  ruby: { name: 'Ruby', judge0Id: 72, monacoLang: 'ruby', icon: '💎' },
};
