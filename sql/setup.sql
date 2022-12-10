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
(4, 'coffee', 'arrival', null, 5, null),
(5, 'arrival', 'breakroom', 'email', 13, 20),
(6, 'offline', 'productivity', 'netflix', 8, 9),
(7, 'wfh', 'news', 'email', 10, 20),
(8, 'productivity', 'laundry', 'money', 11, 12),
(9, 'netflix', 'documentary', 'bandersnatch', 14, 15),
(10, 'news', 'positive', 'skeptical', 16, 17),
(11, 'laundry', 'no water', null, 9, null),
(12, 'money', 'frustration', null, 9, null),
(13, 'breakroom', 'nukes', 'aliens', 18, 19),
(14, 'documentary', 'front yard', 'back yard', 22, 23),
(15, 'bandersnatch', 'no answer', 'answer', 25, 26),
(16, 'positive', 'ai takeover', null, 21, null),
(17, 'skeptical', 'work task/email', null, 20, null),
(18, 'nukes', 'ending page', null, 35, null),
(19, 'aliens', 'ending page', null, 35, null),
(20, 'email', 'utopia?', 'no more ozone', 27, 28),
(21, 'ai takeover', 'ending page', null, 35, null),
(22, 'front yard', 'plumber arrives', null, 34, null),
(23, 'back yard', 'hike', 'hammock', 24, 29),
(24, 'hike', 'missed plumber', null, 30, null),
(25, 'snack', 'ice cream', 'grilled cheese', 32, 33),
(26, 'answer', 'email', null, 20, null),
(27, 'utopia?', 'ending page', null, 35, null),
(28, 'no more ozone', 'ending page', null, 35, null),
(29, 'hammock', 'plumber arrives', null, 34, null),
(30, 'reschedule', 'ending page', null, 35, null),
(31, 'u bend', 'ending page', null, 35, null),
(32, 'ice cream', 'plumber arrives', null, 34, null),
(33, 'grilled cheese', 'plumber arrives', null, 34, null),
(34, 'plumber arrives', 'u bend', null, 31, null),
(35, 'ending page', 'new day', 'exit', 1, 0);