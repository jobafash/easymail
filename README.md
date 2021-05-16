# easymail

# Setup

##### Run All Tests

`npm test`

# Sending An Email

You can request to send an email to an individual or multiple people at once.

##### Using the API

The application will be hosted on your local machine in this base URL `localhost:3000`.

Endpoint: `/api/email`

##### Using the CLI

##### Additional Notes

A validation has been put in place for the `body` field in both the CLI and the endpoint to only accept `html` strings.

# Make sure queues are running

In order to listen for queues, you will need to leave the queue check running in the console.

You can start it up by running the following:

`node email.worker consumeMessage `

# How To Add A New Mail Provider

For scalability and fallback purposes, it is a good idea to have multiple mail providers.

Right now, only Mailjet and Sendgrid have been implemented, but it is also possible to add a new mail provider.

You will have to do the following:

##### Create The Provider

Let's say we want to add a provider for MailGun.

You will need to create a `MailGun.js` file in this directory:

`easymail/mailer/`

Code your implementation in this file and export it
