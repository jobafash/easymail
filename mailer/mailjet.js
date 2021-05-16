const logger = require('turbo-logger').createStream({});
const dotenv = require('dotenv');

dotenv.config();

const node_mailjet = require ('node-mailjet')
.connect(process.env.MAILJET_PUBLIC_KEY, process.env.MAILJET_PRIVATE_KEY)
const mailjet = async (data) => {
    const{ to, subject, message } = data
    node_mailjet.post("send", {'version': 'v3.1'}).request({
    "Messages":[
        {
        "From": {
            "Email": process.env.EMAIL_SENDER,
            "Name": "Sender"
        },
        "To": [
            {
            "Email": to,
            "Name": "Receiver"
            }
        ],
        "Subject": subject,
        "TextPart": message,
        "HTMLPart": `<p>${message}</p>`,
        }
    ]
    })
    .then((x) => {
        logger.log('Email sent successfully!', x)
        return true;
    })
    .catch((error) => {
        logger.error(`An error occured while sending email `, error.toString())
        return false;
    })
}

module.exports = mailjet;
