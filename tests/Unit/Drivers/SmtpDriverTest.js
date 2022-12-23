/**
 * @athenna/mail
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Mail } from '#src/index'
import { test } from '@japa/runner'
import { Config } from '@athenna/config'
import { Folder, Path } from '@athenna/common'
import { MailProvider } from '#src/Providers/MailProvider'

test.group('SmtpDriverTest', group => {
  group.setup(async () => {
    await new Folder(Path.stubs('views')).copy(Path.views())
    await new Folder(Path.stubs('configs')).copy(Path.config())
    await Config.safeLoad(Path.config('mail.js'))
  })

  group.each.setup(async () => {
    new MailProvider().register()
  })

  group.teardown(async () => {
    await Folder.safeRemove(Path.views())
    await Folder.safeRemove(Path.config())
  })

  test('should be able to send emails as text', async ({ assert }) => {
    const result = await Mail.mailer('default')
      .from('no-reply@athenna.io')
      .to('lenon@athenna.io')
      .cc('txsoura@athenna.io')
      .references('Hello')
      .replyTo('txsoura@athenna.io')
      .inReplyTo('lenon@athenna.io')
      .bcc('lenonsec7@gmail.com', 'lenonsec7@hotmail.com')
      .subject('Hello from Athenna!')
      .text('Hello from Athenna')
      .envelope({ from: 'no-reply@athenna.io', to: 'lenon@athenna.io' })
      .send()

    assert.deepEqual(result.response, '250 Ok')
    assert.deepEqual(result.envelope, {
      from: 'no-reply@athenna.io',
      to: ['lenon@athenna.io'],
    })
  })

  test('should be able to send emails as html', async ({ assert }) => {
    const result = await Mail.from('no-reply@athenna.io')
      .to('lenon@athenna.io')
      .subject('Hello from Athenna!')
      .html('<h1>Hello from Athenna</h2>')
      .send()

    assert.deepEqual(result.response, '250 Ok')
    assert.deepEqual(result.envelope, { from: 'no-reply@athenna.io', to: ['lenon@athenna.io'] })
  })

  test('should be able to send emails as markdown', async ({ assert }) => {
    const result = await Mail.from('no-reply@athenna.io')
      .to('lenon@athenna.io')
      .subject('Hello from Athenna!')
      .markdown('# Hello from Athenna!')
      .send()

    assert.deepEqual(result.response, '250 Ok')
    assert.deepEqual(result.envelope, { from: 'no-reply@athenna.io', to: ['lenon@athenna.io'] })
  })

  test('should be able to set up text views and send it', async ({ assert }) => {
    const result = await Mail.from('no-reply@athenna.io')
      .to('lenon@athenna.io')
      .subject('Hello from Athenna!')
      .view('others/hello', { name: 'Athenna' })
      .send()

    assert.deepEqual(result.response, '250 Ok')
    assert.deepEqual(result.envelope, { from: 'no-reply@athenna.io', to: ['lenon@athenna.io'] })
  })

  test('should be able to set up html views and send it', async ({ assert }) => {
    const result = await Mail.from('no-reply@athenna.io')
      .to('lenon@athenna.io')
      .subject('Hello from Athenna!')
      .view('others/nice')
      .send()

    assert.deepEqual(result.response, '250 Ok')
    assert.deepEqual(result.envelope, { from: 'no-reply@athenna.io', to: ['lenon@athenna.io'] })
  })

  test('should be able to set up markdown views and send it', async ({ assert }) => {
    const result = await Mail.from('no-reply@athenna.io')
      .to('lenon@athenna.io')
      .subject('Hello from Athenna!')
      .view('hello', { name: 'João' })
      .send()

    assert.deepEqual(result.response, '250 Ok')
    assert.deepEqual(result.envelope, { from: 'no-reply@athenna.io', to: ['lenon@athenna.io'] })
  })

  test('should be able to send files as attachments in emails', async ({ assert }) => {
    const result = await Mail.from('no-reply@athenna.io')
      .to('lenon@athenna.io')
      .subject('Email attachment')
      .attachment(Path.stubs('views/mail/hello.edge'))
      .text('Sending the e-mail attachment')
      .send()

    assert.deepEqual(result.response, '250 Ok')
    assert.deepEqual(result.envelope, { from: 'no-reply@athenna.io', to: ['lenon@athenna.io'] })
  })

  test('should be able to create and send contents as attachments in emails', async ({ assert }) => {
    const result = await Mail.from('no-reply@athenna.io')
      .to('lenon@athenna.io')
      .subject('Email attachment')
      .attachment('hello.js', 'console.log("hello world!")', 'utf-8')
      .text('Sending the e-mail attachment')
      .send()

    assert.deepEqual(result.response, '250 Ok')
    assert.deepEqual(result.envelope, { from: 'no-reply@athenna.io', to: ['lenon@athenna.io'] })
  })

  test('should be able to send multiple attachments in emails', async ({ assert }) => {
    const result = await Mail.from('no-reply@athenna.io')
      .to('lenon@athenna.io')
      .subject('Email attachments')
      .attachments(Path.stubs('views/mail'))
      .text('Sending the e-mail attachments')
      .send()

    assert.deepEqual(result.response, '250 Ok')
    assert.deepEqual(result.envelope, { from: 'no-reply@athenna.io', to: ['lenon@athenna.io'] })
  })
})
