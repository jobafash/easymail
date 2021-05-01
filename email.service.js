const sgMail = require('@sendgrid/mail')
const dotenv = require('dotenv');

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
//console.log(process.env.SENDGRID_API_KEY)
module.exports = {
  sendMail(to, subject, message) {
    const msg = {
        to: to,
        from: "jobafash3@gmail.com",
        subject: subject,
        text: message,
        html: `<strong>${message}</strong>`,
    }
    sgMail
    .send(msg)
    .then(() => {
    console.log('Email sent')
      })
    .catch((error) => {
    console.error(error)
      })
  }
};