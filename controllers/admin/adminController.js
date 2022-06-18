const validator = require('validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { Admin } = require('../../models/index');
const createError = require('../../utils/createError');

exports.getAdminInfo = async (req, res, next) => {
  try {
    if (req.admin) {
      const admin = await Admin.findOne({
        attributes: { exclude: ['password'] },
        where: { id: req.admin.id },
      });
      if (!admin) {
        createError('You are unauthorized', 404);
      }
      res.status(200).json({ admin });
    }
  } catch (err) {
    next(err);
  }
};
