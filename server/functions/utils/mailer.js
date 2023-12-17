const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  return new Promise(async (resolve, reject) => {
    try {
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: '',
          pass: '',
        },
      });

      let mail = await transporter.sendMail({
        from: 'vadhervishant@gmail.com',
        to,
        subject,
        text,
      });

      resolve(mail.messageId);
    } catch (err) {
      console.log('Error', err);
      reject(err);
    }
  });
};

module.exports = sendEmail;
