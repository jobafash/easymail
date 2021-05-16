"use strict";

const logger = require('turbo-logger').createStream({});
const ejs = require('ejs');
const path = require('path');

class Emailer {
  constructor(sender, recepient, subject, message = null) {
    this.sender = sender;
    this.recepient = recepient;
    this.subject = subject,
    this.message = message;
    this.logger = logger;
 }

  async sendEmail() {
    let content = await ejs.renderFile(
        path.join(__dirname, `/templates/${this.template}.ejs`), {...this.data, app_url: "http://localhost/3000"})
        .then(async(res) => {return res});

      return new Promise(async () => {
        this.logger.log(`Sending email to ${this.recepient}`)
        let data = this.buildData(content);

        return await data
      })
  }

  buildData(content) {
    return {
      to: this.recepient,
      from: this.sender ? this.sender : 'jobafash3@gmail.com',
      subject: this.subject,
      text: this.message,
      html: content
    }
  }
}

module.exports = Emailer;
