const nodemailer = require('nodemailer');
import properties from '~/configs';

module.exports = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: properties.HOST,
      service: properties.SERVICE,
      port: Number(properties.EMAIL_PORT),
      secure: Boolean(properties.SECURE),
      auth: {
        user: properties.USER,
        pass: properties.PASS,
      },
    });

    await transporter.sendMail({
      from: properties.USER,
      to: email,
      subject: subject,
      text: text,
    });
    console.log('email sent successfully');
  } catch (error) {
    console.log('email not sent!');
    console.log(error);
    return error;
  }
};
