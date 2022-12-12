const inquirer = require('inquirer');
const { getById } = require('./lib/');

// function startstory:
// arrow function storyLine takes in an id
// if id = 0, game over
// else: getpromptsbyId(id)
// store and destructure properties of prompts
// return inquirer.prompt?