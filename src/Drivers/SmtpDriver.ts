/**
 * @athenna/mail
 *
 * (c) Victor Tesoura Júnior <txsoura@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import * as nodemailerMd from 'nodemailer-markdown'

import SMTPTransport from 'nodemailer/lib/smtp-transport/index.js'

import { View } from '@athenna/view'
import { File, Folder } from '@athenna/common'
import { Envelope } from 'nodemailer/lib/mailer/index.js'
import { createTransport, Transporter, SendMailOptions } from 'nodemailer'

const markdown = nodemailerMd.markdown

export class SmtpDriver {
  /**
   * The nodemailer transporter.
   */
  private transport: Transporter

  /**
   * The message that will be delivered.
   */
  private message: SendMailOptions

  /**
   * Creates a new instance of Mail.
   *
   * @param options {any}
   */
  public constructor(options: SMTPTransport.Options) {
    this.message = {}
    this.transport = createTransport(options)
    this.transport.use('compile', markdown())
  }

  /**
   * Send a new mail message.
   */
  public async send(): Promise<void> {
    return this.transport.sendMail(this.message)
  }

  /**
   * Define mail sender.
   */
  public from(from: string): SmtpDriver {
    this.message.from = from

    return this
  }

  /**
   * Define mail receiver.
   */
  public to(...to: string[]): SmtpDriver {
    this.message.to = to

    return this
  }

  /**
   * Define mail subject.
   */
  public subject(subject: string): SmtpDriver {
    this.message.subject = subject

    return this
  }

  /**
   * Define mail cc.
   *
   * @param {string} cc
   * @return {SmtpDriver}
   */
  public cc(...cc: string[]): SmtpDriver {
    this.message.cc = cc

    return this
  }

  /**
   * Define mail bcc.
   */
  public bcc(...bcc: string[]): SmtpDriver {
    this.message.bcc = bcc

    return this
  }

  /**
   * Define mail reply to.
   */
  public replyTo(replyTo: string): SmtpDriver {
    this.message.replyTo = replyTo

    return this
  }

  /**
   * Define mail in reply to.
   */
  public inReplyTo(inReplyTo: string): SmtpDriver {
    this.message.inReplyTo = inReplyTo

    return this
  }

  /**
   * Define mail references.
   */
  public references(references: string): SmtpDriver {
    this.message.references = references

    return this
  }

  /**
   * Define mail envelope.
   */
  public envelope(envelope: Envelope): SmtpDriver {
    this.message.envelope = envelope

    return this
  }

  /**
   * Define mail attachment.
   */
  public attachment(
    pathOrFileName: string,
    content?: any,
    encoding?: string,
  ): SmtpDriver {
    if (!this.message.attachments) {
      this.message.attachments = []
    }

    if (!content) {
      const file = new File(pathOrFileName)

      this.message.attachments.push({
        filename: file.base,
        content: file.getContentSync(),
      })

      return this
    }

    const attachment: any = {}

    attachment.filename = pathOrFileName
    attachment.content = content

    if (encoding) {
      attachment.encoding = encoding
    }

    this.message.attachments.push(attachment)

    return this
  }

  /**
   * Define mail attachments.
   */
  public attachments(folderPath: string): SmtpDriver {
    const files = new Folder(folderPath).getFilesByPattern('*/**/*')

    files.forEach(file => this.attachment(file.path))

    return this
  }

  /**
   * Define mail plain text.
   */
  public text(text: string): SmtpDriver {
    this.message.text = text

    return this
  }

  /**
   * Define mail html.
   */
  public html(html: string): SmtpDriver {
    this.message.html = html

    return this
  }

  /**
   * Define mail markdown.
   */
  public markdown(markdown: string): SmtpDriver {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.message.markdown = markdown

    return this
  }

  /**
   * Define mail view.
   */
  public view(
    name: string,
    data?: any,
    renderType: 'markdown' | 'html' | 'text' = 'html',
  ): SmtpDriver {
    this.message[renderType] = View.renderSync(name, data)

    return this
  }
}
