-- Drop and recreate Widgets table (Example)

DROP TABLE IF EXISTS widgets CASCADE;
DROP TABLE IF EXISTS stories CASCADE;
DROP TABLE IF EXISTS contributed_stories CASCADE;

CREATE TABLE stories (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  story_body TEXT,
  votes INTEGER NOT NULL DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE
);

CREATE TABLE contributed_stories (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  story_id INTEGER REFERENCES stories(id),
  contributed_body TEXT,
  contributed_votes INTEGER NOT NULL DEFAULT 0,
  accepted_contribution BOOLEAN DEFAULT FALSE
);

