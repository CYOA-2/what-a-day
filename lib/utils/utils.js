require('dotenv').config();

const fetch = require('cross-fetch');
const GAME_URL = 'http://localhost:7890';

const getPromptById = async (id) => {
  const res = await fetch(`${GAME_URL}/prompts/${id}`, {
    method: 'GET',
    header: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (res.error) {
    console.error(res.error.message);
  } else {
    return res.json(res.data);
  }
};

module.exports = { getPromptById };
