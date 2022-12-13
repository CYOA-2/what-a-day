#!/usr/bin/env node
/* eslint-disable no-console */

require('dotenv').config();
const inquirer = require('inquirer');
const Prompt = require('./lib/models/Prompt.js');
const UserService = require('./lib/services/UserService.js');
//const inquirer = require('inquirer');
//const { getPromptById } = require('./lib/utils/utils.js');
// const sleep = (ms = 5000) => new Promise((r) => setTimeout(r, ms));

// function startstory:
async function startStory() {
  console.log('Welcome to What A Day!');
  const user = await inquirer.prompt([
    {
      prefix: '*',
      name: 'firstName',
      message: 'Enter your first name',
    },
    {
      prefix: '*',
      name: 'lastName',
      message: 'Enter your last name',
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
  //await sleep();
  //console.clear();
  return storyLine(1);
}
// arrow function storyLine takes in an id
const storyLine = async (id = 1) => {
  // if id = 0, game over
  if (id === 0) {
    console.log('Thanks for playing!');
    console.log(
      'Developed By: Andrew Boyle, Emily Sellers, Lexus Banton, Morgan Niemeyer'
    );
    return endStory();
  }
  // else: getpromptsbyId(id)
  //const story = await getPromptById(id);
  // store and destructure properties of prompts
  const { story, promptA, promptB, aId, bId } = await Prompt.getById(id);

  console.log(story);
  // return inquirer.prompt?
  const options = await inquirer.prompt([
    {
      name: 'options',
      type: 'list',
      choices: [promptA, promptB],
    },
  ]);
  // console.log(options);
  if (options.options === promptA) {
    console.clear();
    return storyLine(aId);
  }
  if (options.options === promptB) {
    console.clear();
    return storyLine(bId);
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
