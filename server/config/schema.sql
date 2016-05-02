DROP DATABASE IF EXISTS bits;
CREATE DATABASE bits;
\c bits;

CREATE TABLE users (
  id SERIAL NOT NULL PRIMARY KEY,
  username VARCHAR(61) NOT NULL UNIQUE
);

-- Dummy Data
INSERT INTO users (username) VALUES ('KenM'), ('Haoser');
