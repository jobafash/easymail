const EmailService = require('./email.service');

const queue = 'email-task';

const open = require('amqplib').connect(process.env.AMQP_SERVER);
//console.log(process.env.AMQP_SERVER)
// Publisher
const publishMessage = payload => open.then(connection => connection.createChannel())
  .then(channel => channel.assertQueue(queue)
    .then(() => channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)))))
  .catch(error => console.warn(error));

// Consumer
const consumeMessage = () => {
  open.then(connection => connection.createChannel()).then(ch => ch.assertQueue(queue).then(() => {
    console.log(' [*] Waiting for messages in %s. Use  CTRL+C to exit', queue);
    return ch.consume(queue, (msg) => {
      if (msg !== null) {
        const { to, subject, message } = JSON.parse(msg.content.toString());
        console.log(' [x] Received %s', to);
        // send email via sendgrid
        EmailService.sendMail(to, subject, message).then(() => {
          ch.ack(msg);
        });
      }
    });
  })).catch(error => console.warn(error));
};

module.exports = {
  publishMessage,
  consumeMessage
}
require('make-runnable');