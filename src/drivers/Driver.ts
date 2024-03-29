/**
 * @athenna/mail
 *
 * (c) Victor Tesoura Júnior <txsoura@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import type { ContentOptions } from '#src/types'
import type { Attachment, Envelope } from 'nodemailer/lib/mailer/index.js'

export abstract class Driver {
  /**
   * Send a new mail message.
   */
  public abstract send(): Promise<any>

  /**
   * Define the email that is sending the email.
   *
   * @example
   * ```ts
   * await Mail.from('support@athenna.io').send()
   * ```
   */
  public abstract from(from: string): this

  /**
   * Define who will receive the email.
   *
   * @example
   * ```ts
   * await Mail.from('support@athenna.io')
   *  .to('lenon@athenna.io, mailer@athenna.io')
   *  .to('lenon@athenna.io', 'mailer@athenna.io')
   *  .send()
   * ```
   */
  public abstract to(...to: string[]): this

  /**
   * Define the email subject that will appear on the
   * subject field.
   *
   * @example
   * ```ts
   * await Mail.from('support@athenna.io')
   *  .to('lenon@athenna.io')
   *  .subject('Hello World!')
   *  .send()
   * ```
   */
  public abstract subject(subject: string): this

  /**
   * Define the emails that will appear on the cc field.
   *
   * @example
   * ```ts
   * await Mail.from('support@athenna.io')
   *  .to('lenon@athenna.io')
   *  .cc('mailer@athenna.io, mailer2@athenna.io')
   *  .cc('mailer@athenna.io', 'mailer2@athenna.io')
   *  .send()
   * ```
   */
  public abstract cc(...cc: string[]): this

  /**
   * Define the emails that will appear on the bcc field.
   *
   * @example
   * ```ts
   * await Mail.from('support@athenna.io')
   *  .to('lenon@athenna.io')
   *  .bcc('mailer@athenna.io, mailer2@athenna.io')
   *  .bcc('mailer@athenna.io', 'mailer2@athenna.io')
   *  .send()
   * ```
   */
  public abstract bcc(...bcc: string[]): this

  /**
   * Define the email that will apear in the reply to field.
   *
   * @example
   * ```ts
   * await Mail.from('support@athenna.io')
   *  .to('lenon@athenna.io')
   *  .replyTo('mailer@athenna.io')
   *  .send()
   * ```
   */
  public abstract replyTo(replyTo: string): this

  /**
   * Define the emails that this message is replying to.
   *
   * @example
   * ```ts
   * await Mail.from('support@athenna.io')
   *  .to('lenon@athenna.io')
   *  .inReplyTo('mailer@athenna.io')
   *  .send()
   * ```
   */
  public abstract inReplyTo(inReplyTo: string): this

  /**
   * Define mail references.
   *
   * @example
   * ```ts
   * await Mail.from('support@athenna.io')
   *  .to('lenon@athenna.io')
   *  .references('1, 2, 3')
   *  .send()
   * ```
   */
  public abstract references(references: string): this

  /**
   * The envelope is usually auto generated from `from()`, `to()`,
   * `cc()` and `bcc()` methods but if for some reason you want
   * to specify it yourself (custom envelopes are usually used
   * for VERP addresses), you can use this method:
   *
   * @example
   * ```ts
   * await Mail.from('support@athenna.io')
   *  .to('lenon@athenna.io')
   *  .envelope({
   *    from: 'Lenon <lenon@athenna.io>',
   *    to: 'mailer@athenna.io, Mailer <mailer2@athenna.io>'
   *    cc: 'mailer3@athenna.io',
   *    bcc: 'mailer4@athenna.io'
   *  })
   *  .send()
   * ```
   */
  public abstract envelope(envelope: Envelope): this

  /**
   * Define a date for the email. If not defined, current
   * UTC string will be used.
   *
   * @example
   * ```ts
   * await Mail.from('support@athenna.io')
   *  .to('lenon@athenna.io')
   *  .date(new Date())
   *  .send()
   * ```
   */
  public abstract date(date: string | Date): this

  /**
   * Identifies encoding for `text/html` strings
   * (defaults to ‘utf-8’, other values are ‘hex’ and
   * ‘base64’).
   *
   * @example
   * ```ts
   * await Mail.from('support@athenna.io')
   *  .to('lenon@athenna.io')
   *  .encoding('utf-8')
   *  .send()
   * ```
   */
  public abstract encoding(encoding: 'utf-8' | 'hex' | 'base64'): this

  /**
   * Force content-transfer-encoding for text values (either
   * `quoted-printable` or `base64`). By default the best option
   * is detected (for lots of ascii use `quoted-printable`,
   * otherwise `base64`).
   *
   * @example
   * ```ts
   * await Mail.from('support@athenna.io')
   *  .to('lenon@athenna.io')
   *  .textEncoding('base64')
   *  .send()
   * ```
   */
  public abstract textEncoding(value: 'quoted-printable' | 'base64'): this

  /**
   * If `true`, then does not allow to use files as content.
   * Use it when you want to use JSON data from untrusted
   * source as the email. If an attachment or message node
   * tries to fetch something from a file the sending returns
   * an error. If this field is also set in the transport
   * options, then the value in mail data is ignored.
   *
   * @example
   * ```ts
   * await Mail.from('support@athenna.io')
   *  .to('lenon@athenna.io')
   *  .disableFileAccess(true)
   *  .send()
   * ```
   */
  public abstract disableFileAccess(disableFileAccess: boolean): this

  /**
   * If `true`, then does not allow to use Urls as content.
   * If this field is also set in the transport options,
   * then the value in mail data is ignored
   *
   * @example
   * ```ts
   * await Mail.from('support@athenna.io')
   *  .to('lenon@athenna.io')
   *  .disableUrlAccess(true)
   *  .send()
   * ```
   */
  public abstract disableUrlAccess(disableUrlAccess: boolean): this

  /**
   * Sets the email importance headers, either `high`,
   * `normal` (default) or `low`.
   *
   * @example
   * ```ts
   * await Mail.from('support@athenna.io')
   *  .to('lenon@athenna.io')
   *  .priority('high')
   *  .send()
   * ```
   */
  public abstract priority(value: 'high' | 'normal' | 'low'): this

  /**
   * Define a header to your email.
   *
   * @example
   * ```ts
   * await Mail.from('support@athenna.io')
   *  .to('lenon@athenna.io')
   *  .header('x-my-key', 'header value')
   *  .send()
   * ```
   */
  public abstract header(key: string, value: any): this

  /**
   * Define a header to your email only if it's not already
   * defined.
   *
   * @example
   * ```ts
   * await Mail.from('support@athenna.io')
   *  .to('lenon@athenna.io')
   *  .safeHeader('x-my-key', 'header value')
   *  .send()
   * ```
   */
  public abstract safeHeader(key: string, value: any): this

  /**
   * Remove a header from your email.
   *
   * @example
   * ```ts
   * await Mail.from('support@athenna.io')
   *  .to('lenon@athenna.io')
   *  .removeHeader('x-my-key')
   *  .send()
   * ```
   */
  public abstract removeHeader(key: string): this

  /**
   * Set a file as attachment or a file path to be sent in
   * the email.
   *
   * @example
   * ```ts
   * await Mail.from('support@athenna.io')
   *  .to('lenon@athenna.io')
   *  .attachment({
   *    filename: 'file.txt',
   *    content: 'hello world!'
   *  })
   *  .attachment({
   *    filename: 'file.pdf',
   *    path: Path.storage('mail/file.pdf'),
   *    contentType: 'text/plain'
   *  })
   *  .attachment({
   *    filename: 'license.txt',
   *    path: 'https://raw.github.com/nodemailer/nodemailer/master/LICENSE'
   *   })
   *   .attachment({
   *      filename: 'text1.txt',
   *      content: 'aGVsbG8gd29ybGQh',
   *      encoding: 'base64'
   *   })
   *  .send()
   * ```
   */
  public abstract attachment(attachment: Attachment): this

  /**
   * Set the email content. You can choose between `text`
   * `html` or `markdown`.
   *
   * @example
   * ```ts
   * await Mail.from('support@athenna.io')
   *  .to('lenon@athenna.io')
   *  .content('<h1>Hello World!</h1>')
   *  .send()
   *
   * // Or choosing the email content type:
   *
   * await Mail.from('support@athenna.io')
   *  .to('lenon@athenna.io')
   *  .content('# Hello World!', { type: 'markdown' })
   *  .send()
   * ```
   */
  public abstract content(value: string, options?: ContentOptions): this

  /**
   * Define mail view to be rendered instead of a raw content.
   *
   * @example
   * ```ts
   * await Mail.from('support@athenna.io')
   *  .to('lenon@athenna.io')
   *  .view('mail.welcome', { title: 'Welcome to Athenna!' })
   *  .send()
   *
   * // Or choosing the view content type:
   *
   * await Mail.from('support@athenna.io')
   *  .to('lenon@athenna.io')
   *  .content('mail.markdown.welcome',
   *    { title: 'Welcome to Athenna!' },
   *    { type: 'markdown' }
   *  )
   *  .send()
   * ```
   */
  public abstract view(name: string, data?: any, options?: ContentOptions): this
}
