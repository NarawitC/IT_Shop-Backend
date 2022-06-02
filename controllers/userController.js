const { User } = require('../models/index');

const createError = require('../utils/createError');

exports.getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findOne({
      attributes: { exclude: ['password'] },
      where: { id: req.user.id },
    });
    if (!user) {
      createError('You are unauthorized', 404);
    }
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};
