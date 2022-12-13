const Prompt = require('../models/Prompt.js');

require('dotenv').config();

const getPromptById = async (id) => {
  const res = await Prompt.getById(id);
  if (res.error) {
    console.error(res.error.message);
  } else {
    return res.data;
  }
};

module.exports = { getPromptById };
