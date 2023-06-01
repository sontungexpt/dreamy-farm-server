'use strict';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

import User from '~/models/User';
import UserInfo from '~/models/UserInfo';

const JWT_SECRET =
  'hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe';
class UserController {
  forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
      const oldUser = await User.findOne({ email });
      if (!oldUser) {
        return res.json({ status: 'User Not Exists!!' });
      }
      const secret = JWT_SECRET + oldUser.password;
      const token = jwt.sign(
        { email: oldUser.email, id: oldUser._id },
        secret,
        {
          expiresIn: '5m',
        },
      );
      const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'adarsh438tcsckandivali@gmail.com',
          pass: 'rmdklolcsmswvyfw',
        },
      });

      var mailOptions = {
        from: 'youremail@gmail.com',
        to: 'thedebugarena@gmail.com',
        subject: 'Password Reset',
        text: link,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      console.log(link);
    } catch (error) {}
  };

  register = async (req, res) => {
    const { name, email, password } = req.body;

    const encryptedPassword = await bcrypt.hash(password, 10);

    try {
      // check if email is existed
      const oldUser = await User.findOne({ email });
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
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ status: 'error', message: 'User not found' });
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ email: user.email }, JWT_SECRET, {
        expiresIn: '15m',
      });

      if (res.status(201)) {
        return res.json({
          status: 'success',
          message: 'Login successfully',
          token: token,
        });
      } else {
        return res.json({ status: 'error', message: 'error' });
      }
    }
    res.json({ status: 'error', error: 'Invalid password' });
  };
}

export default UserController;
