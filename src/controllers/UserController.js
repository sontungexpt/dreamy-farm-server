'use strict';
import bcrypt from 'bcrypt';
// import nodemailer from 'nodemailer';

import Feedback from '~/models/Feedback';
import User from '~/models/User';
import UserInfo from '~/models/UserInfo';

import jwt from 'jsonwebtoken';
import properties from '~/configs';

class UserController {
  forgotPassword = async (req, res) => {
    // const { email } = req.body;
    // try {
    //   const oldUser = await User.findOne({ email });
    //   if (!oldUser) {
    //     return res.json({ status: 'User Not Exists!!' });
    //   }
    //   const secret = properties.JWT_SECRET + oldUser.password;
    //   const token = jwt.sign(
    //     { email: oldUser.email, id: oldUser._id },
    //     secret,
    //     {
    //       expiresIn: '5m',
    //     },
    //   );
    //   const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;
    //   var transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //       user: 'adarsh438tcsckandivali@gmail.com',
    //       pass: 'rmdklolcsmswvyfw',
    //     },
    //   });
    //   var mailOptions = {
    //     from: 'youremail@gmail.com',
    //     to: 'thedebugarena@gmail.com',
    //     subject: 'Password Reset',
    //     text: link,
    //   };
    //   transporter.sendMail(mailOptions, function (error, info) {
    //     if (error) {
    //       console.log(error);
    //     } else {
    //       console.log('Email sent: ' + info.response);
    //     }
    //   });
    //   console.log(link);
    // } catch (error) {}
  };

  register = async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      const encryptedPassword = await bcrypt.hash(password, 10);

      // check if email is existed
      const oldUser = res.locals._user;
      // const oldUser = await User.findOne({ email });
      if (oldUser) {
        return res.json({ status: 'error', message: 'Email is existed' });
      }

      // create new user
      await User.create({
        email,
        password: encryptedPassword,
      });
      await UserInfo.create({
        name,
        email,
      });

      return res.json({ status: 'success', message: 'Register successfully' });
    } catch (error) {
      res.json({ status: 'error', message: error });
    }
  };

  login = async (req, res, next) => {
    try {
      const user = res.locals._user;
      const { password } = req.body;

      // if email is existed, check password
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ email: user.email }, properties.JWT_SECRET, {
          expiresIn: '15m',
        });

        if (res.status(201)) {
          return res.json({
            status: 'success',
            message: 'Login successfully',
            data: token,
          });
        } else {
          return res.json({ status: 'error', message: 'error' });
        }
      }

      res.json({ status: 'error', message: 'Invalid password' });
    } catch (error) {
      res.json({ status: 'error', message: error });
    }
  };

  getUserInfos = async (req, res) => {
    try {
      const user = res.locals._user;
      const userInfo = await UserInfo.findOne({ email: user.email });
      if (!userInfo)
        return res.json({
          status: 'error',
          message: 'User infos not found',
          data: 'User infos not found',
        });

      res.json({
        status: 'success',
        message: 'Get user data successfully',
        data: userInfo,
      });
    } catch (error) {
      res.send({ status: 'error', message: error });
    }
  };

  getFavoriteProducts = async (req, res) => {
    try {
      const user = res.locals._user;
      const userInfo = await UserInfo.findOne({ email: user.email })
        .populate('favoriteProducts')
        .exec();

      if (!userInfo) {
        return res.json({
          status: 'error',
          message: 'User infos not found',
          data: 'User infos not found',
        });
      }

      res.json({
        status: 'success',
        message: 'Get favorite products successfully',
        data: userInfo.favoriteProducts,
      });
    } catch (error) {
      res.send({ status: 'error', message: error });
    }
  };

  updateFavoriteProducts = async (req, res) => {
    try {
      const user = res.locals._user;
      const userInfo = await UserInfo.findOne({ email: user.email });

      if (!userInfo) {
        return res.json({
          status: 'error',
          message: 'User infos not found',
          data: 'User infos not found',
        });
      }

      const { productId, method } = req.body;

      // pass method to middleware
      if (method === 'add') {
        userInfo.favoriteProducts.push(productId);
      } else if (method === 'remove') {
        userInfo.favoriteProducts = userInfo.favoriteProducts.filter(
          (item) => item.toString() !== productId,
        );
      } else {
        // if not pass method to middleware,
        // update favoriteProducts with mehtod = toggle
        const productExistIndex = userInfo.favoriteProducts.findIndex(
          (item) => item.toString() === productId,
        );
        if (productExistIndex === -1) {
          userInfo.favoriteProducts.push(productId);
        } else {
          userInfo.favoriteProducts = userInfo.favoriteProducts.filter(
            (item) => item.toString() !== productId,
          );
        }
      }

      res.json({
        status: 'success',
        message: 'Update favorite products successfully',
        data: userInfo.favoriteProducts,
      });

      await userInfo.save();
    } catch (error) {
      res.send({ status: 'error', message: error });
    }
  };

  feedback = async (req, res) => {
    try {
      const user = res.locals._user;
      const userInfo = await UserInfo.findOne({ email: user.email });

      if (!userInfo) {
        return res.json({
          status: 'error',
          message: 'User infos not found',
          data: 'User infos not found',
        });
      }

      const { content } = req.body;
      if (!content) {
        return res.json({
          status: 'error',
          message: 'Content is required',
          required: 'content',
        });
      }

      await Feedback.create({
        user: userInfo._id,
        content,
      });

      res.json({ status: 'success', message: 'Feedback successfully' });
    } catch (err) {
      res.json({ status: 'error', message: err });
    }
  };
}

// getFavoriteProduct = async (req, res) => {};

export default UserController;
