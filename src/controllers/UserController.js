'use strict';
import bcrypt from 'bcrypt';
// import nodemailer from 'nodemailer';

import Feedback from '~/models/Feedback';
import User from '~/models/User';
import UserInfo from '~/models/UserInfo';
import Order from '~/models/Order';
import checkParams from '~/utils/checkParams';

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

  register = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const encryptedPassword = await bcrypt.hash(password, 10);

      // check if email is existed
      const oldUser = res.locals._user;
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

  login = async (req, res) => {
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
      const userInfo = res.locals._userInfo;

      res.json({
        status: 'success',
        message: 'Get user data successfully',
        data: userInfo,
      });
    } catch (error) {
      res.send({ status: 'error', message: error.message, error: error });
    }
  };

  //[POST] /user/feedback
  feedback = async (req, res) => {
    try {
      const userInfo = res.locals._userInfo;

      const { content } = req.body;
      checkParams(req.body, 'content');

      await Feedback.create({
        user: userInfo._id,
        content,
      });

      res.json({ status: 'success', message: 'Feedback successfully' });
    } catch (err) {
      res.json({ status: 'error', message: err.message, error: err });
    }
  };

  // [PUT] /user/profile
  updateProfile = async (req, res) => {
    try {
      const userInfo = res.locals._userInfo;

      const { name, sex } = req.body;
      if (name) userInfo.name = name;
      if (sex) userInfo.sex = sex;

      await userInfo.save();

      res.json({
        status: 'success',
        message: 'Update profile successfully',
        data: userInfo,
      });
    } catch (error) {
      res.send({ status: 'error', message: error.message, error: error });
    }
  };
}

export default UserController;
