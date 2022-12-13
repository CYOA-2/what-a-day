-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS prompts;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email VARCHAR,
  password_hash VARCHAR NOT NULL,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL
);

CREATE TABLE prompts (
  id BIGINT PRIMARY KEY,
  story VARCHAR NOT NULL,
  prompt_a VARCHAR NOT NULL,
  prompt_b VARCHAR,
  a_id INT NOT NULL,
  b_id INT
);

INSERT INTO prompts (id, story, prompt_a, prompt_b, a_id, b_id) 
VALUES 
(1, 'story start', 'stay home', 'work', 2, 3),
(2, 'stay home', 'offline', 'wfh', 6, 7),
(3, 'work', 'coffee', 'arrival', 4, 5),
(4, 'coffee', 'direct', 'scenic', 5, 35),
(5, 'arrival', 'breakroom', 'email', 13, 20),
(6, 'offline', 'productivity', 'netflix', 8, 9),
(7, 'wfh', 'news', 'email', 10, 20),
(8, 'productivity', 'laundry', 'money', 11, 12),
(9, 'netflix', 'documentary', 'bandersnatch', 14, 15),
(10, 'news', 'positive', 'skeptical', 16, 17),
(11, 'laundry', 'tv', 'yard', 9, 23),
(12, 'money', 'tv', 'yard', 9, 23),
(13, 'breakroom', 'nukes', 'aliens', 18, 19),
(14, 'documentary', 'front yard', 'back yard', 22, 23),
(15, 'bandersnatch', 'no answer', 'answer', 25, 26),
(16, 'positive', 'new day', 'exit', 1, 0),
(17, 'skeptical', 'email', 'coffee break', 20, 13),
(18, 'nukes', 'new day', 'exit', 1, 0),
(19, 'aliens', 'new day', 'exit', 1, 0),
(20, 'email', 'utopia?', 'no more ozone', 27, 28),
(22, 'front yard', 'new day', 'exit', 1, 0),
(23, 'back yard', 'hike', 'hammock', 24, 29),
(24, 'hike', 'new day', 'exit', 1, 0),
(25, 'snack', 'ice cream', 'grilled cheese', 32, 33),
(26, 'answer', 'email', 'news', 20, 10),
(27, 'utopia?', 'new day', 'exit', 1, 0),
(28, 'no more ozone', 'new day', 'exit', 1, 0),
(29, 'hammock', 'awake', 'asleep', 34, 30),
(30, 'reschedule', 'new day', 'exit', 1, 0),
(31, 'u bend', 'new day', 'exit', 1, 0),
(32, 'ice cream', 'call', 'door', 26, 31),
(33, 'grilled cheese', 'call', 'door', 26, 31),
(34, 'plumber arrives', 'new day', 'exit', 1, 0),
(35, 'landslide', 'new day', 'exit', 1, 0);