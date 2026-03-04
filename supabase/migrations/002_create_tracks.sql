CREATE TABLE tracks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  genre TEXT,
  s3_key TEXT NOT NULL,
  s3_bucket TEXT NOT NULL,
  file_format TEXT NOT NULL,
  file_size_bytes BIGINT NOT NULL,
  duration_seconds INTEGER,
  splits JSONB DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'processing',
  cover_art_url TEXT,
  isrc_code TEXT,
  pro_affiliation TEXT DEFAULT 'unaffiliated',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE tracks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users own tracks" ON tracks FOR ALL USING (
  user_id = (SELECT id FROM users WHERE clerk_id = auth.uid()::text)
);
