-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (synced with Clerk)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clerk_id VARCHAR UNIQUE NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR,
  subscription_tier VARCHAR DEFAULT 'free', -- free, pro, premium
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Job Applications
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  job_title VARCHAR NOT NULL,
  company_name VARCHAR NOT NULL,
  company_website VARCHAR,
  location VARCHAR,
  salary_range VARCHAR,
  job_description TEXT,
  job_url VARCHAR,
  source VARCHAR, -- linkedin, indeed, google_jobs, manual
  status VARCHAR DEFAULT 'saved', -- saved, applied, interviewing, offer, rejected, withdrawn
  applied_date DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Application Timeline Events
CREATE TABLE timeline_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
  event_type VARCHAR NOT NULL, -- applied, followed_up, interview_scheduled, interview_completed, offer_received, rejected
  title VARCHAR,
  notes TEXT,
  event_date TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- User Profiles
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  resume_url VARCHAR,
  cover_letter_template TEXT,
  linkedin_url VARCHAR,
  portfolio_url VARCHAR,
  github_url VARCHAR,
  phone VARCHAR,
  saved_answers JSONB DEFAULT '{}', -- common application questions
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Saved Jobs (not yet applied)
CREATE TABLE saved_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  job_title VARCHAR NOT NULL,
  company_name VARCHAR NOT NULL,
  location VARCHAR,
  salary_range VARCHAR,
  job_url VARCHAR,
  job_description TEXT,
  source VARCHAR,
  job_data JSONB, -- full job data from API
  created_at TIMESTAMP DEFAULT NOW()
);

-- Reminders/Tasks
CREATE TABLE reminders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
  reminder_type VARCHAR NOT NULL, -- follow_up, interview_prep, thank_you, check_status
  title VARCHAR NOT NULL,
  description TEXT,
  scheduled_for TIMESTAMP NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP,
  bhindi_schedule_id VARCHAR, -- reference to Bhindi scheduler
  created_at TIMESTAMP DEFAULT NOW()
);

-- AI Generated Content (for tracking usage)
CREATE TABLE ai_generations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  application_id UUID REFERENCES applications(id) ON DELETE SET NULL,
  generation_type VARCHAR NOT NULL, -- cover_letter, interview_prep, email_template
  prompt TEXT,
  result TEXT,
  tokens_used INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_applications_user_id ON applications(user_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_created_at ON applications(created_at DESC);
CREATE INDEX idx_timeline_events_application_id ON timeline_events(application_id);
CREATE INDEX idx_saved_jobs_user_id ON saved_jobs(user_id);
CREATE INDEX idx_reminders_user_id ON reminders(user_id);
CREATE INDEX idx_reminders_scheduled_for ON reminders(scheduled_for);

-- Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_generations ENABLE ROW LEVEL SECURITY;

-- RLS Policies (users can only access their own data)
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid()::text = clerk_id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid()::text = clerk_id);

CREATE POLICY "Users can view own applications" ON applications FOR SELECT USING (user_id IN (SELECT id FROM users WHERE clerk_id = auth.uid()::text));
CREATE POLICY "Users can insert own applications" ON applications FOR INSERT WITH CHECK (user_id IN (SELECT id FROM users WHERE clerk_id = auth.uid()::text));
CREATE POLICY "Users can update own applications" ON applications FOR UPDATE USING (user_id IN (SELECT id FROM users WHERE clerk_id = auth.uid()::text));
CREATE POLICY "Users can delete own applications" ON applications FOR DELETE USING (user_id IN (SELECT id FROM users WHERE clerk_id = auth.uid()::text));

-- Similar policies for other tables
CREATE POLICY "Users can manage own timeline events" ON timeline_events FOR ALL USING (application_id IN (SELECT id FROM applications WHERE user_id IN (SELECT id FROM users WHERE clerk_id = auth.uid()::text)));
CREATE POLICY "Users can manage own profile" ON user_profiles FOR ALL USING (user_id IN (SELECT id FROM users WHERE clerk_id = auth.uid()::text));
CREATE POLICY "Users can manage own saved jobs" ON saved_jobs FOR ALL USING (user_id IN (SELECT id FROM users WHERE clerk_id = auth.uid()::text));
CREATE POLICY "Users can manage own reminders" ON reminders FOR ALL USING (user_id IN (SELECT id FROM users WHERE clerk_id = auth.uid()::text));
CREATE POLICY "Users can view own AI generations" ON ai_generations FOR SELECT USING (user_id IN (SELECT id FROM users WHERE clerk_id = auth.uid()::text));

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
