const express = require('express');
// require(dotenv.config());
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const app = express();
const port = 3000 || process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/api/email', async (req, res, next) => {
    const { email, text } = req.body
    const msg = {
        to: email,
        from: 'jobafash3@gmail.com',
        subject: 'Sending with SendGrid is Fun',
        text: text,
        html: `<strong>${text}</strong>`,
      }
    try {
        sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
            res.status(200).json({"success": "Email sent"});
          })
          .catch((error) => {
            console.error(error)
          })
    } catch (err) {
        next(err);
    }
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  
  return;
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`)
})