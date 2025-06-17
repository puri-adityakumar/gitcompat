-- GitCompat Database Schema
-- Simple design with two tables

-- Feedback table
CREATE TABLE feedback (
  id BIGSERIAL PRIMARY KEY,
  liked_project BOOLEAN,
  helpful_for_devs BOOLEAN,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  suggestions TEXT,
  wants_to_contribute BOOLEAN,
  email TEXT,
  twitter TEXT,
  user_agent TEXT,
  page_url TEXT,
  session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contribution signups table
CREATE TABLE contribution_signups (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  time_of_response TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Basic policies to allow public access
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE contribution_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow feedback submission" ON feedback FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow contribution signups" ON contribution_signups FOR INSERT WITH CHECK (true); 