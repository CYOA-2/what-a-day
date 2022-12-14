const cookie = require('cookie');
const fetch = require('cross-fetch');

require('dotenv').config();

const getPromptById = async (id, cookieInfo) => {
  console.log('cookieInfo', cookieInfo);
  const resp = await fetch(`${process.env.API_URL}/api/v1/prompts/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Cookie: cookie.serialize('session', cookieInfo.session),
    },
    credentials: 'include',
  });
  const data = await resp.json();
  return data;
};

const signIn = async ({ email, password }) => {
  const resp = await fetch(`${process.env.API_URL}/api/v1/users/sessions`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });
  const data = await resp.json();
  if (!resp.ok) {
    throw new Error(data.message);
  }
  // console.log(resp.headers.raw());
  const cookieInfo = cookie.parse(resp.headers.raw()['set-cookie'][0]);
  // console.log(chalk.bold.yellow(cookieInfo.session));
  return [data, cookieInfo];
};

const signUp = async ({ email, password, characterName }) => {
  const resp = await fetch(`${process.env.API_URL}/api/v1/users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, characterName }),
    credentials: 'include',
  });
  const data = await resp.json();
  if (!resp.ok) {
    throw new Error(data.message);
  }
  // console.log(resp.headers.raw());
  const cookieInfo = cookie.parse(resp.headers.raw()['set-cookie'][0]);
  // console.log(chalk.bold.yellow(cookieInfo.session));
  return [data, cookieInfo];
};

const updateUser = async (userId, currentStoryId, cookieInfo) => {
  const resp = await fetch(`${process.env.API_URL}/api/v1/users/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Cookie: cookie.serialize('session', cookieInfo.session),
    },
    body: JSON.stringify({ currentStoryId }),
    credentials: 'include',
  });
  const data = await resp.json();
  return data;
};

module.exports = { getPromptById, signIn, signUp, updateUser };
