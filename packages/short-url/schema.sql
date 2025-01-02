DROP TABLE IF EXISTS short_url;
CREATE TABLE IF NOT EXISTS short_url (
    id INTEGER PRIMARY KEY,
    short_code TEXT,
    short_url TEXT,
    long_url TEXT
);
