DO $$
DECLARE
  mock_user_id UUID := gen_random_uuid();
  track1_id UUID := gen_random_uuid();
  track2_id UUID := gen_random_uuid();
  track3_id UUID := gen_random_uuid();
  i INT;
  d DATE;
BEGIN
  INSERT INTO users (id, clerk_id, email, display_name) 
  VALUES (mock_user_id, 'mock_clerk_id', 'demo@musicforge.test', 'Demo Artist');

  INSERT INTO tracks (id, user_id, title, artist, genre, s3_key, s3_bucket, file_format, file_size_bytes)
  VALUES 
    (track1_id, mock_user_id, 'Midnight Sun', 'Demo Artist', 'Synthwave', 'mock/1', 'mock_bucket', 'audio/mpeg', 3000000),
    (track2_id, mock_user_id, 'Neon Lights', 'Demo Artist', 'Pop', 'mock/2', 'mock_bucket', 'audio/mpeg', 3500000),
    (track3_id, mock_user_id, 'Retro Wave', 'Demo Artist', 'Lo-Fi', 'mock/3', 'mock_bucket', 'audio/mpeg', 4000000);

  FOR i IN 0..89 LOOP
    d := current_date - i;
    
    INSERT INTO stream_events (track_id, platform, stream_count, event_date, revenue_usd)
    VALUES 
      (track1_id, 'Spotify', (random() * 500 + 100)::INT, d, (random() * 2 + 0.5)::NUMERIC),
      (track1_id, 'Apple Music', (random() * 300 + 50)::INT, d, (random() * 1.5 + 0.3)::NUMERIC),
      (track2_id, 'Spotify', (random() * 1000 + 200)::INT, d, (random() * 4 + 1)::NUMERIC),
      (track3_id, 'YouTube', (random() * 5000 + 500)::INT, d, (random() * 5 + 1)::NUMERIC);
  END LOOP;
END $$;
