#!/usr/bin/env node

const inquirer = require('inquirer');
const { getPromptById } = require('./lib/utils/utils.js');

// function startstory:
async function startStory() {
  console.log('Welcome to What A Day!');
  console.clear();
}
// arrow function storyLine takes in an id
// if id = 0, game over
// else: getpromptsbyId(id)
// store and destructure properties of prompts
// return inquirer.prompt?
