-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS prompts;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email VARCHAR,
  password_hash VARCHAR NOT NULL,
  character_name VARCHAR NOT NULL,
  current_story_id INT
);

CREATE TABLE prompts (
  id BIGINT PRIMARY KEY,
  story VARCHAR NOT NULL,
  prompt_a VARCHAR NOT NULL,
  prompt_b VARCHAR NOT NULL,
  bailout VARCHAR NOT NULL,
  a_id INT NOT NULL,
  b_id INT NOT NULL,
  bail_id INT
);

INSERT INTO prompts (id, story, prompt_a, prompt_b, bailout, a_id, b_id, bail_id) 
VALUES 
(1, 'Good morning and what another sunny day. You have had a filling breakfast, a nice morning with your family and are about to get ready for work when... What is that sound? You rush to the bathroom and your toilet is spouting water everywhere! You quickly get the water turned off and the flood subsides before finally stopping. What do you do from here?', 'I am going to stay home and handle the plumber visit.', 'I am heading to work, my partner handles things like this for us.', 'Save My Game', 2, 3, 0),
(2, 'After choosing home you call the plumber. They say you are on the roster, but it will be a few hours. How will you occupy the meantime?', 'My team at work relies on me, I have the option, I am going to work from home.', 'My team can survive without me, I am going to stay off the computer.', 'Save My Game', 7, 6, 0),
(3, 'Having a reliable partner for things like this is such a gift. After getting in the car you come to the thought of all the water kind of wore you out. With your semi-flexible start time would you like to get coffee on the way to work?', 'A nice cup of coffee would be great right now.', 'I am already later than my normal arrival, I am going straight to work.', 'Save My Game', 4, 5, 0),
(4, 'That cup of coffee has really hit the spot! You have a couple different options of how to get to work from here, one is faster, but the other definitely looks a lot nicer, which way do you take?', 'I will head straight in to work.', 'I think I will take the pretty way today.', 'Save My Game', 5, 35, 0),
(5, 'With a delightfully uneventful drive you have now arrived at work! This time of day you and your coworkers frequently break for water and snacks. Do you head for the breakroom to check in or straight for your desk?', 'I head to the breakroom, then I can tell them about my morning and they can fill me in on what is happening here.', 'I am going to just go straight to my desk.', 'Save My Game', 13, 20, 0),
(6, 'offline', 'productivity', 'netflix', 'Save My Game', 8, 9, 0),
(7, 'wfh', 'news', 'email', 'Save My Game', 10, 20, 0),
(8, 'productivity', 'laundry', 'money', 'Save My Game', 11, 12, 0),
(9, 'netflix', 'documentary', 'bandersnatch', 'Save My Game', 14, 15, 0),
(10, 'news', 'positive', 'skeptical', 'Save My Game', 16, 17, 0),
(11, 'laundry', 'tv', 'yard', 'Save My Game', 9, 23, 0),
(12, 'money', 'tv', 'yard', 'Save My Game', 9, 23, 0),
(13, 'Everyone in the breakroom is clustered around someone new! It feels a little crazy but... are they green? Not wearing green but they literally have green skin. How is no one else noticing?', 'I am calling my cousin at the NSA, maybe its paranoia but I would rather be safe.', 'Maybe I am just seeing things. This is no big deal.', 'Save My Game', 18, 19, 0),
(14, 'documentary', 'front yard', 'back yard', 'Save My Game', 22, 23, 0),
(15, 'bandersnatch', 'no answer', 'answer', 'Save My Game', 25, 26, 0),
(16, 'positive', 'go back 1', 'new day', 'Exit', 10, 1, 0),
(17, 'skeptical', 'email', 'coffee break', 'Save My Game', 20, 13, 0),
(18, 'Your cousin thanks you for your service and hangs up. What in the world?? You have had odd conversations before but this one takes the cake. Then nothing. Your cousin has bombed your office. In the following weeks it comes out that the government was hiding a known alien invasion. The World devolves to chaos.', 'Go back to the breakroom', 'Start a New Day', 'Exit', 13, 1, 0),
(19, 'The day ends and all is fine as far as you know. The world turns. You slowly begin to notice more and more people like your mystery coworker. Then one day, you realize every world leader is green. The world has been taken over by Aliens.', 'Go back to the breakroom', 'Start a New Day', 'Exit', 13, 1, 0),
(20, 'email', 'utopia?', 'no more ozone', 'Save My Game', 27, 28, 0),
(21, 'u bend', 'go back 1', 'new day', 'Exit', 33, 1, 0),
(22, 'front yard', 'go back 1', 'new day', 'Exit', 14, 1, 0),
(23, 'back yard', 'hike', 'hammock', 'Save My Game', 24, 29, 0),
(24, 'hike', 'go back 1', 'new day', 'Exit', 23, 1, 0),
(25, 'snack', 'ice cream', 'grilled cheese', 'Save My Game', 32, 33, 0),
(26, 'answer', 'email', 'news', 'Save My Game', 20, 10, 0),
(27, 'utopia?', 'go back 1', 'new day', 'Exit', 20, 1, 0),
(28, 'no more ozone', 'go back 1', 'new day', 'Exit', 20, 1, 0),
(29, 'hammock', 'awake', 'asleep', 'Save My Game', 34, 30, 0),
(30, 'reschedule', 'go back 1', 'new day', 'Exit', 29, 1, 0),
(31, 'u bend', 'go back 1', 'new day', 'Exit', 32, 1, 0),
(32, 'ice cream', 'call', 'door', 'Save My Game', 26, 31, 0),
(33, 'grilled cheese', 'call', 'door', 'Save My Game', 26, 31, 0),
(34, 'plumber arrives', 'go back 1', 'new day', 'Exit', 29, 1, 0),
(35, 'landslide', 'go back 1', 'new day', 'Exit', 4, 1, 0);