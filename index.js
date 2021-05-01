const express = require('express');
const { publishMessage } = require('./email.worker')

const app = express();
const port = 3000 || process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/api/email', async (req, res, next) => {
    const { email, text } = req.body
    const msg = {
        to: email,
        subject: '[IMPORTANT] Testing API',
        message: `<strong>${text}</strong>`,
      }
    try {
        publishMessage(msg);
        return res.status(200).json({"success": "Email sent"});   
    } catch (err) {
        next(err)
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