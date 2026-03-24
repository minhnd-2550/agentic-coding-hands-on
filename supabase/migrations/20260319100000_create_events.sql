-- Create events table for SAA 2025
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_date TIMESTAMPTZ NOT NULL,
  venue TEXT NOT NULL,
  broadcast_note TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS: authenticated read-only
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read events"
  ON events FOR SELECT
  TO authenticated
  USING (true);

-- Seed data
INSERT INTO events (event_date, venue, broadcast_note)
VALUES (
  '2025-12-26T18:30:00+07:00',
  'Âu Cơ Art Center',
  'Tường thuật trực tiếp qua sóng Livestream'
);
