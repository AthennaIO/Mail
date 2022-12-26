/**
 * @athenna/mail
 *
 * (c) Victor Tesoura Júnior <txsoura@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import * as nodemailerMd from 'nodemailer-markdown'

import { createTransport } from 'nodemailer'
import { File, Folder } from '@athenna/common'
import { MailView } from '#src/Views/MailView'

const markdown = nodemailerMd.markdown

export class SmtpDriver {
  /**
   * The nodemailer transporter.
   *
   * @type {import('nodemailer').Transporter}
   */
  #transport

  /**
   * The message that will be delivered.
   *
   * @type {import('nodemailer').SendMailOptions}
   */
  #message

  /**
   * Creates a new instance of Mail.
   *
   * @param options {any}
   */
  constructor(options) {
    this.#message = {}
    this.#transport = createTransport(options)
    this.#transport.use('compile', markdown())
  }

  /**
   * Send a new mail message.
   *
   * @return {Promise<void>}
   */
  async send() {
    return this.#transport.sendMail(this.#message)
  }

  /**
   * Define mail sender.
   *
   * @param {string} from
   * @return {SmtpDriver}
   */
  from(from) {
    this.#message.from = from

    return this
  }

  /**
   * Define mail receiver.
   *
   * @param {string} to
   * @return {SmtpDriver}
   */
  to(...to) {
    this.#message.to = to

    return this
  }

  /**
   * Define mail subject.
   *
   * @param {string} subject
   * @return {SmtpDriver}
   */
  subject(subject) {
    this.#message.subject = subject

    return this
  }

  /**
   * Define mail cc.
   *
   * @param {string} cc
   * @return {SmtpDriver}
   */
  cc(...cc) {
    this.#message.cc = cc

    return this
  }

  /**
   * Define mail bcc.
   *
   * @param {string} bcc
   * @return {SmtpDriver}
   */
  bcc(...bcc) {
    this.#message.bcc = bcc

    return this
  }

  /**
   * Define mail reply to.
   *
   * @param {string} replyTo
   * @return {SmtpDriver}
   */
  replyTo(replyTo) {
    this.#message.replyTo = replyTo

    return this
  }

  /**
   * Define mail in reply to.
   *
   * @param {string} inReplyTo
   * @return {SmtpDriver}
   */
  inReplyTo(inReplyTo) {
    this.#message.inReplyTo = inReplyTo

    return this
  }

  /**
   * Define mail references.
   *
   * @param {string} references
   * @return {SmtpDriver}
   */
  references(references) {
    this.#message.references = references

    return this
  }

  /**
   * Define mail envelope.
   *
   * @param {{ from?: string, to?: string, cc?: string, bcc?: string }} envelope
   * @return {SmtpDriver}
   */
  envelope(envelope) {
    this.#message.envelope = envelope

    return this
  }

  /**
   * Define mail attachment.
   *
   * @param pathOrFileName {string}
   * @param [content] {any}
   * @param [encoding] {string}
   * @return {SmtpDriver}
   */
  attachment(pathOrFileName, content, encoding) {
    if (!this.#message.attachments) {
      this.#message.attachments = []
    }

    if (!content) {
      const file = new File(pathOrFileName).loadSync()

      this.#message.attachments.push({
        filename: file.base,
        content: file.getContentSync(),
      })

      return this
    }

    const attachment = {}

    attachment.filename = pathOrFileName
    attachment.content = content

    if (encoding) {
      attachment.encoding = encoding
    }

    this.#message.attachments.push(attachment)

    return this
  }

  /**
   * Define mail attachments.
   *
   * @param {string} folderPath
   * @return {SmtpDriver}
   */
  attachments(folderPath) {
    const folder = new Folder(folderPath).loadSync()
    const files = folder.getFilesByPattern('*/**/*', true)

    files.forEach(file => this.attachment(file.path))

    return this
  }

  /**
   * Define mail plain text.
   *
   * @param {string} text
   * @return {SmtpDriver}
   */
  text(text) {
    this.#message.text = text

    return this
  }

  /**
   * Define mail html.
   *
   * @param {string} html
   * @return {SmtpDriver}
   */
  html(html) {
    this.#message.html = html

    return this
  }

  /**
   * Define mail markdown.
   *
   * @param {string} markdown
   * @return {SmtpDriver}
   */
  markdown(markdown) {
    this.#message.markdown = markdown

    return this
  }

  /**
   * Define mail view.
   *
   * @param {string} name
   * @param {any} [data]
   * @param {'markdown' | 'html' | 'text'} [renderType]
   * @return {SmtpDriver}
   */
  view(name, data, renderType = 'html') {
    this.#message[renderType] = MailView.render(name, data)

    return this
  }
}
