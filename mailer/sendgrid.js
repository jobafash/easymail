const sgMail = require('@sendgrid/mail');
const logger = require('turbo-logger').createStream({});
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendgrid = async (data) => {
    await sgMail.send(data)
    .then((x) => {
    logger.log('Email sent successfully!', x)
    return true;
    })
    .catch((error) => {
    logger.error(`An error occured while sending email `, error.toString())
    return false;
    })
}

module.exports = sendgrid;
