/**
 * @athenna/mail
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Mail } from '#src'
import { Test } from '@athenna/test'
import { Path } from '@athenna/common'
import { BaseTest } from '#tests/helpers/BaseTest'
import type { Context } from '@athenna/test/types'

export default class SmtpDriverTest extends BaseTest {
  @Test()
  public async shouldBeAbleToSendEmailsAsText({ assert }: Context) {
    const result = await Mail.mailer('default')
      .from('no-reply@athenna.io')
      .to('lenon@athenna.io')
      .cc('txsoura@athenna.io')
      .references('Hello')
      .date(new Date())
      .encoding('utf-8')
      .textEncoding('quoted-printable')
      .priority('high')
      .disableUrlAccess(true)
      .disableFileAccess(true)
      .replyTo('txsoura@athenna.io')
      .inReplyTo('lenon@athenna.io')
      .bcc('lenonsec7@gmail.com', 'lenonsec7@hotmail.com')
      .subject('Hello from Athenna!')
      .content('Hello from Athenna', { type: 'text' })
      .envelope({ from: 'no-reply@athenna.io', to: 'lenon@athenna.io' })
      .send()

    assert.deepEqual(result.response, '250 OK: message queued')
    assert.deepEqual(result.envelope, {
      from: 'no-reply@athenna.io',
      to: ['lenon@athenna.io']
    })
  }

  @Test()
  public async shouldBeAbleToSendEmailsAsHtml({ assert }: Context) {
    const result = await Mail.from('no-reply@athenna.io')
      .to('lenon@athenna.io')
      .subject('Hello from Athenna!')
      .content('<h1>Hello from Athenna</h1>')
      .send()

    assert.deepEqual(result.response, '250 OK: message queued')
    assert.deepEqual(result.envelope, { from: 'no-reply@athenna.io', to: ['lenon@athenna.io'] })
  }

  @Test()
  public async shouldBeAbleToSendEmailsAsMarkdown({ assert }: Context) {
    const result = await Mail.from('no-reply@athenna.io')
      .to('lenon@athenna.io')
      .subject('Hello from Athenna!')
      .content('# Hello from Athenna!', { type: 'markdown' })
      .send()

    assert.deepEqual(result.response, '250 OK: message queued')
    assert.deepEqual(result.envelope, { from: 'no-reply@athenna.io', to: ['lenon@athenna.io'] })
  }

  @Test()
  public async shouldBeAbleToSetUpPlainTextViewsAndSendIt({ assert }: Context) {
    const result = await Mail.from('no-reply@athenna.io')
      .to('lenon@athenna.io')
      .subject('Hello from Athenna!')
      .view('mail/plain', { name: 'Athenna' }, { type: 'text' })
      .send()

    assert.deepEqual(result.response, '250 OK: message queued')
    assert.deepEqual(result.envelope, { from: 'no-reply@athenna.io', to: ['lenon@athenna.io'] })
  }

  @Test()
  public async shouldBeAbleToSetUpHtmlViewsAndSendIt({ assert }: Context) {
    const result = await Mail.from('no-reply@athenna.io')
      .to('lenon@athenna.io')
      .subject('Hello from Athenna!')
      .view('mail/html', { name: 'Athenna' })
      .send()

    assert.deepEqual(result.response, '250 OK: message queued')
    assert.deepEqual(result.envelope, { from: 'no-reply@athenna.io', to: ['lenon@athenna.io'] })
  }

  @Test()
  public async shouldBeAbleToSetUpMarkdownViewsAndSendIt({ assert }: Context) {
    const result = await Mail.from('no-reply@athenna.io')
      .to('lenon@athenna.io')
      .subject('Hello from Athenna!')
      .view('mail/markdown', { name: 'Athenna' }, { type: 'markdown' })
      .send()

    assert.deepEqual(result.response, '250 OK: message queued')
    assert.deepEqual(result.envelope, { from: 'no-reply@athenna.io', to: ['lenon@athenna.io'] })
  }

  @Test()
  public async shouldBeAbleToSendFilesAsAttachmentsInEmails({ assert }: Context) {
    const result = await Mail.from('no-reply@athenna.io')
      .to('lenon@athenna.io')
      .subject('Email attachment')
      .attachment({
        path: Path.fixtures('attachments/file.txt')
      })
      .content('Sending the e-mail attachment')
      .send()

    assert.deepEqual(result.response, '250 OK: message queued')
    assert.deepEqual(result.envelope, { from: 'no-reply@athenna.io', to: ['lenon@athenna.io'] })
  }

  @Test()
  public async shouldBeAbleToCreateAndSendContentsAsAttachmentsInEmails({ assert }: Context) {
    const result = await Mail.from('no-reply@athenna.io')
      .to('lenon@athenna.io')
      .subject('Email attachment')
      .attachment({
        filename: 'hello.js',
        content: 'console.log("hello world!")',
        encoding: 'utf-8'
      })
      .content('Sending the e-mail attachment')
      .send()

    assert.deepEqual(result.response, '250 OK: message queued')
    assert.deepEqual(result.envelope, { from: 'no-reply@athenna.io', to: ['lenon@athenna.io'] })
  }

  @Test()
  public async shouldBeAbleToSendMultipleAttachmentsInEmails({ assert }: Context) {
    const result = await Mail.from('no-reply@athenna.io')
      .to('lenon@athenna.io')
      .subject('Email attachments')
      .attachment({ path: Path.fixtures('attachments/file.txt') })
      .attachment({ path: Path.fixtures('attachments/file.edge') })
      .content('Sending the e-mail attachments')
      .send()

    assert.deepEqual(result.response, '250 OK: message queued')
    assert.deepEqual(result.envelope, { from: 'no-reply@athenna.io', to: ['lenon@athenna.io'] })
  }

  @Test()
  public async shouldBeAbleToChangeConfigurationInRuntime({ assert }: Context) {
    const result = await Mail.config({ port: 5080 })
      .mailer('smtp')
      .from('no-reply@athenna.io')
      .to('lenon@athenna.io')
      .subject('Email attachments')
      .attachment({ path: Path.fixtures('attachments/file.txt') })
      .attachment({ path: Path.fixtures('attachments/file.edge') })
      .content('Sending the e-mail attachments')
      .send()

    assert.deepEqual(result.response, '250 OK: message queued')
    assert.deepEqual(result.envelope, { from: 'no-reply@athenna.io', to: ['lenon@athenna.io'] })
  }

  @Test()
  public async shouldBeAbleToUseAllDataDefinedInEmailInsideTheView({ assert }: Context) {
    const result = await Mail.from('no-reply@athenna.io')
      .to('lenon@athenna.io')
      .subject('Hello from Athenna!')
      .content('Hello World!')
      .view('mail/properties')
      .send()

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const content = Mail.driver.message.html

    assert.deepEqual(
      content,
      '<h1>lenon@athenna.io</h1>\n' +
        '<h1>Hello from Athenna!</h1>\n' +
        '<h1>no-reply@athenna.io</h1>\n' +
        '<h1>Hello World!</h1>'
    )
    assert.deepEqual(result.response, '250 OK: message queued')
    assert.deepEqual(result.envelope, { from: 'no-reply@athenna.io', to: ['lenon@athenna.io'] })
  }

  @Test()
  public async shouldBeAbleToSetHeaders({ assert }: Context) {
    const result = await Mail.from('no-reply@athenna.io')
      .to('lenon@athenna.io')
      .subject('Hello from Athenna!')
      .content('<h1>Hello from Athenna</h1>')
      .header('x-my-header', 'value')
      .send()

    assert.deepEqual(result.response, '250 OK: message queued')
    assert.deepEqual(result.envelope, { from: 'no-reply@athenna.io', to: ['lenon@athenna.io'] })
  }

  @Test()
  public async shouldBeAbleToSetHeadersSafely({ assert }: Context) {
    const result = await Mail.from('no-reply@athenna.io')
      .to('lenon@athenna.io')
      .subject('Hello from Athenna!')
      .content('<h1>Hello from Athenna</h1>')
      .safeHeader('x-my-header', 'value')
      .send()

    assert.deepEqual(result.response, '250 OK: message queued')
    assert.deepEqual(result.envelope, { from: 'no-reply@athenna.io', to: ['lenon@athenna.io'] })
  }

  @Test()
  public async shouldNotOverwriteAlreadySetHeadersIfUsingSafeHeaderMethod({ assert }: Context) {
    const result = await Mail.from('no-reply@athenna.io')
      .to('lenon@athenna.io')
      .subject('Hello from Athenna!')
      .content('<h1>Hello from Athenna</h1>')
      .header('x-my-header', 'value')
      .safeHeader('x-my-header', 'value')
      .send()

    assert.deepEqual(result.response, '250 OK: message queued')
    assert.deepEqual(result.envelope, { from: 'no-reply@athenna.io', to: ['lenon@athenna.io'] })
  }

  @Test()
  public async shouldBeAbleToRemoveHeaders({ assert }: Context) {
    const result = await Mail.from('no-reply@athenna.io')
      .to('lenon@athenna.io')
      .subject('Hello from Athenna!')
      .content('<h1>Hello from Athenna</h1>')
      .header('x-my-header', 'value')
      .removeHeader('x-my-header')
      .send()

    assert.deepEqual(result.response, '250 OK: message queued')
    assert.deepEqual(result.envelope, { from: 'no-reply@athenna.io', to: ['lenon@athenna.io'] })
  }
}
