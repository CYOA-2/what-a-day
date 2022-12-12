const Router = require('express');
const Prompt = require('../models/Prompt.js');

module.exports = Router().get('/:id', async (req, res, next) => {
  try {
    const prompts = await Prompt.getById(req.params.id);
    res.json(prompts);
  } catch (e) {
    next(e);
  }
});
