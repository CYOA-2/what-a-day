#!/usr/bin/env node
/* eslint-disable no-console */

require('dotenv').config();
const inquirer = require('inquirer');
const {
  signIn,
  signUp,
  getPromptById,
  updateUser
} = require('./lib/utils/utils.js');

async function startStory() {
  let user, cookie;
  console.log('Welcome to What A Day!');
  const existingUser = await inquirer.prompt([
    {
      name: 'auth',
      type: 'confirm',
      message: 'Have an account?',
    },
  ]);
  if (existingUser.auth === true) {
    const inputs = await inquirer.prompt([
      {
        prefix: '*',
        name: 'email',
        message: 'Enter your email',
      },
      {
        prefix: '*',
        name: 'password',
        type: 'password',
        message: 'Enter your password',
      },
    ]);
    [user, cookie] = await signIn(inputs);
    const { characterName, currentStoryId } = user;
    console.log(`Welcome back ${characterName}!`);

    const userPickup = await inquirer.prompt([
      {
        name: 'pickup',
        type: 'confirm',
        message: 'Pick up where you left off?',
      },
    ]);
    if (userPickup.pickup === true) {
      const id = currentStoryId;
      return storyLine(id, { user }, cookie);
    } else {
      const id = 1;
      return storyLine(id, { user }, cookie);
    }
  } else {
    const userData = await inquirer.prompt([
      {
        prefix: '*',
        name: 'characterName',
        message: 'Create a character name',
      },
      {
        prefix: '*',
        name: 'email',
        message: 'Enter your email',
      },
      {
        prefix: '*',
        name: 'password',
        type: 'password',
        message: 'Enter your password',
      },
    ]);

    [user, cookie] = await signUp(userData);
    console.log(`Welcome ${user.characterName}!`);
    return storyLine(1, { user }, cookie);
  }
}
const storyLine = async (id, { user }, cookie) => {
  if (id === 0) {
    console.log('Thanks for playing!');
    console.log(
      'Developed By: Andrew Boyle, Emily Sellers, Morgan Niemeyer'
    );
    return endStory();
  }
  const { story, promptA, promptB, bailout, aId, bId, bailId } =
    await getPromptById(id, cookie);
  console.log(story);
  const options = await inquirer.prompt([
    {
      name: 'options',
      type: 'list',
      choices: [promptA, promptB, bailout],
    },
  ]);
  if (options.options === promptA) {
    console.clear();
    const currentStoryId = aId;
    await updateUser({ user }, currentStoryId, cookie);
    return storyLine(aId, { user }, cookie);
  }
  if (options.options === promptB) {
    console.clear();
    const currentStoryId = bId;
    await updateUser({ user }, currentStoryId, cookie);
    return storyLine(bId, { user }, cookie);
  }
  if (options.options === bailout) {
    console.clear();
    return storyLine(bailId, { user }, cookie);
  }
};

async function endStory() {
  (err) => {
    if (err) {
      console.log('Something went wrong...');
      console.log(err);
      return;
    }
  };
}

startStory();
