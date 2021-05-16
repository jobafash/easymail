const lodash = require('lodash');
const emailDataValidator = require('../../validations/validator').emailDataValidator;
const Emailer = require('./emailer');
const logger = require('turbo-logger').createStream({});

module.exports = {
    processEmail: async (payload) => {
        const allowedKeys = [
            'sender',
            'recepient',
            'subject',
            'message'
        ]
        
        let emailData = lodash.pick(payload, allowedKeys);
        const validation = await emailDataValidator.validate(emailData);

        if(validation.hasOwnProperty("error")) {
            throw new Error(validation.error.toString());
        }
        
        const {sender, recepient, subject, message} = emailData;
        try {
            return await new Emailer(
                sender, 
                recepient, 
                subject, 
                message
            ).sendEmail();
        }
        catch(e) {
            logger.error(
                'An error occured while sending email ', 
                JSON.stringify(e)
            );
            throw new Error("An error occured while sending email");
        }
    }
}