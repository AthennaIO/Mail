/**
 * @athenna/mail
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Mail } from '#src'
import { Test, TestContext } from '@athenna/test'
import { BaseTest } from '#tests/Helpers/BaseTest'

export default class SmtpDriverTest extends BaseTest {
  @Test()
  public async shouldBeAbleToSendEmailsAsText({ assert }: TestContext) {
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
  }

  @Test()
  public async shouldBeAbleToSendEmailsAsHtml({ assert }: TestContext) {
    const result = await Mail.from('no-reply@athenna.io')
      .to('lenon@athenna.io')
      .subject('Hello from Athenna!')
      .html('<h1>Hello from Athenna</h2>')
      .send()

    assert.deepEqual(result.response, '250 Ok')
    assert.deepEqual(result.envelope, { from: 'no-reply@athenna.io', to: ['lenon@athenna.io'] })
  }

  @Test()
  public async shouldBeAbleToSendEmailsAsMarkdown({ assert }: TestContext) {
    const result = await Mail.from('no-reply@athenna.io')
      .to('lenon@athenna.io')
      .subject('Hello from Athenna!')
      .markdown('# Hello from Athenna!')
      .send()

    assert.deepEqual(result.response, '250 Ok')
    assert.deepEqual(result.envelope, { from: 'no-reply@athenna.io', to: ['lenon@athenna.io'] })
  }

  @Test()
  public async shouldBeAbleToSetUpPlainTextViewsAndSendIt({ assert }: TestContext) {
    const result = await Mail.from('no-reply@athenna.io')
      .to('lenon@athenna.io')
      .subject('Hello from Athenna!')
      .view('mail::plain', { name: 'Athenna' })
      .send()

    assert.deepEqual(result.response, '250 Ok')
    assert.deepEqual(result.envelope, { from: 'no-reply@athenna.io', to: ['lenon@athenna.io'] })
  }

  @Test()
  public async shouldBeAbleToSetUpHtmlViewsAndSendIt({ assert }: TestContext) {
    const result = await Mail.from('no-reply@athenna.io')
      .to('lenon@athenna.io')
      .subject('Hello from Athenna!')
      .view('mail::html', { name: 'Athenna' })
      .send()

    assert.deepEqual(result.response, '250 Ok')
    assert.deepEqual(result.envelope, { from: 'no-reply@athenna.io', to: ['lenon@athenna.io'] })
  }

  @Test()
  public async shouldBeAbleToSetUpMarkdownViewsAndSendIt({ assert }: TestContext) {
    const result = await Mail.from('no-reply@athenna.io')
      .to('lenon@athenna.io')
      .subject('Hello from Athenna!')
      .view('mail::markdown', { name: 'Athenna' })
      .send()

    assert.deepEqual(result.response, '250 Ok')
    assert.deepEqual(result.envelope, { from: 'no-reply@athenna.io', to: ['lenon@athenna.io'] })
  }

  @Test()
  public async shouldBeAbleToSendFilesAsAttachmentsInEmails({ assert }: TestContext) {
    const result = await Mail.from('no-reply@athenna.io')
      .to('lenon@athenna.io')
      .subject('Email attachment')
      .attachment(Path.stubs('attachments/file.txt'))
      .text('Sending the e-mail attachment')
      .send()

    assert.deepEqual(result.response, '250 Ok')
    assert.deepEqual(result.envelope, { from: 'no-reply@athenna.io', to: ['lenon@athenna.io'] })
  }

  @Test()
  public async shouldBeAbleToCreateAndSendContentsAsAttachmentsInEmails({ assert }: TestContext) {
    const result = await Mail.from('no-reply@athenna.io')
      .to('lenon@athenna.io')
      .subject('Email attachment')
      .attachment('hello.js', 'console.log("hello world!")', 'utf-8')
      .text('Sending the e-mail attachment')
      .send()

    assert.deepEqual(result.response, '250 Ok')
    assert.deepEqual(result.envelope, { from: 'no-reply@athenna.io', to: ['lenon@athenna.io'] })
  }

  @Test()
  public async shouldBeAbleToSendMultipleAttachmentsInEmails({ assert }: TestContext) {
    const result = await Mail.from('no-reply@athenna.io')
      .to('lenon@athenna.io')
      .subject('Email attachments')
      .attachments(Path.stubs('attachments'))
      .text('Sending the e-mail attachments')
      .send()

    assert.deepEqual(result.response, '250 Ok')
    assert.deepEqual(result.envelope, { from: 'no-reply@athenna.io', to: ['lenon@athenna.io'] })
  }

  @Test()
  public async shouldBeAbleToChangeConfigurationInRuntime({ assert }: TestContext) {
    const result = await Mail.config({ port: 5080 })
      .mailer('smtp')
      .from('no-reply@athenna.io')
      .to('lenon@athenna.io')
      .subject('Email attachments')
      .attachments(Path.stubs('attachments'))
      .text('Sending the e-mail attachments')
      .send()

    assert.deepEqual(result.response, '250 Ok')
    assert.deepEqual(result.envelope, { from: 'no-reply@athenna.io', to: ['lenon@athenna.io'] })
  }
}
