CREATE TABLE IF NOT EXISTS links (
  id bigserial PRIMARY KEY,
  code varchar(8) NOT NULL UNIQUE,
  target_url text NOT NULL,
  total_clicks bigint NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  last_clicked timestamptz
);

CREATE INDEX IF NOT EXISTS idx_links_code ON links(code);
