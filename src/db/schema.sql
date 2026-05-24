CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  subheadline TEXT,
  excerpt TEXT NOT NULL,
  author TEXT NOT NULL,
  date TEXT NOT NULL,
  read_time TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT NOT NULL DEFAULT '[]',
  image_src TEXT NOT NULL,
  image_alt TEXT NOT NULL,
  image_width INTEGER,
  image_height INTEGER,
  content TEXT NOT NULL,
  is_breaking INTEGER NOT NULL DEFAULT 0,
  featured INTEGER NOT NULL DEFAULT 0,
  trending INTEGER NOT NULL DEFAULT 0,
  popular INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX idx_posts_featured ON posts(featured);
CREATE INDEX idx_posts_trending ON posts(trending);
CREATE INDEX idx_posts_popular ON posts(popular);
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_posts_date ON posts(date);

CREATE TABLE ticker_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  message TEXT NOT NULL,
  priority INTEGER NOT NULL DEFAULT 0,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
