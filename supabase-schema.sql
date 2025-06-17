-- GitCompat Database Schema
-- Simplified design with two independent tables

-- Feedback table for user feedback responses
CREATE TABLE feedback (
  id BIGSERIAL PRIMARY KEY,
  liked_project BOOLEAN,
  helpful_for_devs BOOLEAN,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  suggestions TEXT,
  wants_to_contribute BOOLEAN,
  email TEXT, -- Optional user email
  twitter TEXT, -- Optional user twitter
  user_agent TEXT,
  page_url TEXT,
  session_id TEXT, -- For anonymous tracking
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contribution signups table for newsletter/notification requests
CREATE TABLE contribution_signups (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL, -- Required email for notifications
  time_of_response TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_feedback_created_at ON feedback(created_at);
CREATE INDEX idx_feedback_rating ON feedback(rating);
CREATE INDEX idx_feedback_liked_project ON feedback(liked_project);
CREATE INDEX idx_feedback_email ON feedback(email);

CREATE INDEX idx_contribution_signups_email ON contribution_signups(email);
CREATE INDEX idx_contribution_signups_time ON contribution_signups(time_of_response);

-- Enable Row Level Security (RLS)
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE contribution_signups ENABLE ROW LEVEL SECURITY;

-- RLS Policies for feedback table
CREATE POLICY "Allow public feedback submission" ON feedback
  FOR INSERT 
  TO public 
  WITH CHECK (true);

CREATE POLICY "Allow authenticated feedback reads" ON feedback
  FOR SELECT 
  TO authenticated 
  USING (true);

-- RLS Policies for contribution_signups table
CREATE POLICY "Allow public contribution signups" ON contribution_signups
  FOR INSERT 
  TO public 
  WITH CHECK (true);

CREATE POLICY "Allow authenticated signup reads" ON contribution_signups
  FOR SELECT 
  TO authenticated 
  USING (true);

-- Analytics Views
CREATE VIEW feedback_analytics AS
SELECT 
  COUNT(*) as total_responses,
  AVG(rating::float) as average_rating,
  COUNT(*) FILTER (WHERE liked_project = true) as liked_count,
  COUNT(*) FILTER (WHERE helpful_for_devs = true) as helpful_count,
  COUNT(*) FILTER (WHERE wants_to_contribute = true) as contribute_count,
  COUNT(*) FILTER (WHERE email IS NOT NULL) as email_provided_count,
  DATE_TRUNC('day', created_at) as date
FROM feedback
GROUP BY DATE_TRUNC('day', created_at)
ORDER BY date DESC;

CREATE VIEW contribution_analytics AS
SELECT 
  COUNT(*) as total_signups,
  COUNT(DISTINCT email) as unique_emails,
  DATE_TRUNC('day', time_of_response) as date
FROM contribution_signups
GROUP BY DATE_TRUNC('day', time_of_response)
ORDER BY date DESC; 