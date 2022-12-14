#!/usr/bin/env node
/* eslint-disable no-console */

require('dotenv').config();
const inquirer = require('inquirer');
const Prompt = require('./lib/models/Prompt.js');
const User = require('./lib/models/User.js');
const UserService = require('./lib/services/UserService.js');

async function startStory() {
  console.log('Welcome to What A Day!');
  const existingUser = await inquirer.prompt([
    {
      name: 'auth',
      type: 'confirm',
      message: 'Have an account?',
    },
  ]);
  if (existingUser.auth === true) {
    const user = await inquirer.prompt([
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
    await UserService.signIn(user);
    const { characterName, currentStoryId } = await User.getByEmail(user.email);
    console.log(`Welcome back ${characterName}`);

    const userPickup = await inquirer.prompt([
      {
        name: 'pickup',
        type: 'confirm',
        message: 'Pick up where you left off?',
      },
    ]);
    if (userPickup.pickup === true) {
      const id = currentStoryId;
      return storyLine(id, { user });
    } else {
      const id = 1;
      return storyLine(id, { user });
    }
  } else {
    const user = await inquirer.prompt([
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

    await UserService.create(user);
    await UserService.signIn(user);
    console.log(`Welcome ${user.characterName}`);
    return storyLine(1, { user });
  }
}
const storyLine = async (id, { user }) => {
  if (id === 0) {
    console.log('Thanks for playing!');
    console.log(
      'Developed By: Andrew Boyle, Emily Sellers, Lexus Banton, Morgan Niemeyer'
    );
    return endStory();
  }
  const { story, promptA, promptB, bailout, aId, bId, bailId } =
    await Prompt.getById(id);
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
    await User.update({ user }, currentStoryId);
    return storyLine(aId, { user });
  }
  if (options.options === promptB) {
    console.clear();
    const currentStoryId = bId;
    await User.update({ user }, currentStoryId);
    return storyLine(bId, { user });
  }
  if (options.options === bailout) {
    console.clear();
    return storyLine(bailId, { user });
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
