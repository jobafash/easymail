const sendgrid = require('sendgrid')
const mailjet = require('mailjet')
const dotenv = require('dotenv');

dotenv.config();
//console.log(process.env.SENDGRID_API_KEY)
module.exports = {
  sendMail(to, subject, message) {
    const msg = {
        to: to,
        from: process.env.EMAIL_SENDER,
        subject: subject,
        text: message,
        html: `<strong>${message}</strong>`,
    }
    //Nested conditionals for fallback mechanism
    let sent = sendgrid(msg);
    if(!sent){
      sent = mailjet(msg);
    }
    else{
      return null
    }
  }
};