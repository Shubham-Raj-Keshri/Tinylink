-- initial migration for tinylink
CREATE TABLE IF NOT EXISTS links (
  id SERIAL PRIMARY KEY,
  code VARCHAR(255) UNIQUE NOT NULL,
  target_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  clicks INTEGER DEFAULT 0
);
