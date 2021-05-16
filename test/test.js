const path = require('path')
const test = require('ava')

process.env.TEMPLATES_DIR = path.join(__dirname, 'templates')
process.env.TRANSPORT = 'stub'
const fetch = require('./_fetch')

const env = require('../src/utils/env')()
const email = require('../src/email')(env)

test('fail when suspicious path', t => {
  return email.processTemplate('../../package.json', { user: { name: 'John' } }, 'en')
    .then(response => t.fail())
    .catch(err => {
      t.truthy(err.message === 'Invalid template path')
    })
})

test('send templated email', t => {
  const emailOptions = {
    from: 'Judy <judy@example.com>',
    to: 'John <john@example.com>'
  }
  return email.sendTemplatedEmail(emailOptions, 'pugbody', { user: { name: 'John' } }, 'en')
    .then(info => {
      const rawContent = info.response.toString()
      t.truthy(rawContent.indexOf('Welcome John') >= 0)
    })
})

test('successful rest API call', t => {
  return fetch('/email/send', {
    method: 'POST',
    body: {
      language: 'en',
      templateName: 'pugbody',
      templateOptions: {
        user: { name: 'John' }
      },
      emailOptions: {
        from: 'Judy <judy@example.com>',
        to: 'John <john@example.com>'
      }
    }
  })
  .then(response => {
    t.is(response.status, 200)
    return response.json()
  })
  .then(body => {
    t.truthy(body.messageId)
    t.deepEqual(body.envelope, { from: 'judy@example.com', to: [ 'john@example.com' ] })
  })
})

test('failed rest API call', t => {
  return fetch('/email/send', {
    method: 'POST',
    body: {
      language: 'en',
      templateName: 'pugbody',
      templateOptions: {},
      emailOptions: {
        from: 'Judy <judy@example.com>',
        to: 'John <john@example.com>'
      }
    }
  })
  .then(response => {
    t.is(response.status, 500)
    return response.json()
  })
  .then(body => {
    t.truthy(body.error.indexOf('Cannot read property \'name\' of undefined') > 0)
  })
})

test('bad API call request', t => {
  return fetch('/email/send', {
    method: 'POST',
    body: {}
  })
  .then(response => {
    t.is(response.status, 400)
    return response.json()
  })
  .then(body => {
    t.truthy(body.error.indexOf('"templateName" is required') > 0)
  })
})