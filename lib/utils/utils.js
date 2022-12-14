const cookie = require('cookie');
const fetch = require('cross-fetch');

require('dotenv').config();
const API_URL = 'https://what-a-day.herokuapp.com';

const getPromptById = async (id, cookieInfo) => {
  const resp = await fetch(`${API_URL}/api/v1/prompts/${id}`, {
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
  const resp = await fetch(`${API_URL}/api/v1/users/sessions`, {
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
  const resp = await fetch(`${API_URL}/api/v1/users`, {
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

const updateUser = async ({ user }, currentStoryId, cookieInfo) => {
  
  const resp = await fetch(`${API_URL}/api/v1/users/${user.id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Cookie: cookie.serialize('session', cookieInfo.session),
    },
    body: JSON.stringify({ ...user, currentStoryId }),
    credentials: 'include',
  });
  const data = await resp.json();
  
  return data;
};

module.exports = { getPromptById, signIn, signUp, updateUser };
