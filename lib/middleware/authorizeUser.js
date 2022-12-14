module.exports = async (req, res, next) => {
  try {
    if (!req.user.id || req.user.id !== req.params.id)
      throw new Error('You do not have access to view this page');
  
    next();
  } catch (err) {
    err.status = 403;
    next(err);
  }
};
