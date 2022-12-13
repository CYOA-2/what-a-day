#!/usr/bin/env node
/* eslint-disable no-console */

require('dotenv').config();
const inquirer = require('inquirer');
const Prompt = require('./lib/models/Prompt.js');
//const inquirer = require('inquirer');
//const { getPromptById } = require('./lib/utils/utils.js');
const sleep = (ms = 5000) => new Promise((r) => setTimeout(r, ms));

// function startstory:
async function startStory() {
  console.log('Welcome to What A Day!');
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
  }
  // else: getpromptsbyId(id)
  //const story = await getPromptById(id);
  // store and destructure properties of prompts
  const { story, promptA, promptB, aId, bId } = await Prompt.getById(id);

  console.log(promptA);
  // return inquirer.prompt?
  const options = await inquirer.prompt([
    {
      name: 'options',
      type: 'list',
      choices: [promptA, promptB],
    },
  ]);
  console.log(options);
};

startStory();
