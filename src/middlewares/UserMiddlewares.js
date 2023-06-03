'use strict';
import User from '~/models/User.js';
import jwt from 'jsonwebtoken';
import properties from '~/configs';

export const checkToken = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (token) {
      const user = jwt.verify(token, properties.JWT_SECRET, (err, res) => {
        if (err) {
          return 'token expired';
        }
        return res;
      });
      if (user === 'token expired') {
        return res.json({
          status: 'error',
          message: 'token expired',
          data: 'token expired',
        });
      }
      res.locals._user = user;
    }
    next();
  } catch (error) {
    res.json({ status: 'error', message: error });
  }
};

export const checkUser = async (req, res, next) => {
  try {
    // no token
    if (!res.locals._user) {
      const { email, method } = req.body;

      if (!email) {
        return res.json({
          status: 'warning',
          message: 'You need to login to use this feature',
          required: 'email',
        });
      }

      const user = await User.findOne({ email });
      if (!user) {
        if (method === 'register') {
          return next();
        }
        return res.json({
          status: 'error',
          message: 'User not found',
        });
      }
      if (user.status === 'blocked') {
        return res.json({
          status: 'error',
          message: 'User are no longer authorized to access this account',
        });
      }
      res.locals._user = user;
    }
    next();
  } catch (error) {
    res.json({ status: 'error', message: error });
  }
};
