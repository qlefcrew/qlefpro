CREATE TABLE stream_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  track_id UUID NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  country_code TEXT,
  stream_count INTEGER NOT NULL DEFAULT 0,
  event_date DATE NOT NULL,
  revenue_usd NUMERIC(10,6) DEFAULT 0
);
CREATE INDEX ON stream_events(track_id);
CREATE INDEX ON stream_events(event_date);
