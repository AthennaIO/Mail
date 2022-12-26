/**
 * @athenna/mail
 *
 * (c) Victor Tesoura Júnior <txsoura@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Config } from '@athenna/config'
import { DriverFactory } from '#src/Factories/DriverFactory'

export * from './Facades/Mail.js'
export * from './Factories/DriverFactory.js'

export class MailImpl {
  /**
   * The mailer name used for this instance.
   *
   * @type {string|null}
   */
  #mailer = Config.get('mail.default')

  /**
   * The driver responsible for mailering the mails.
   *
   * @type {any}
   */
  #driver = null

  /**
   * Runtime configurations to be used inside the Drivers.
   *
   * @type {any}
   */
  #runtimeConfig = {}

  /**
   * Creates a new instance of Mail.
   *
   * @return {MailImpl}
   */
  constructor() {
    this.#driver = DriverFactory.fabricate(this.#mailer, this.#runtimeConfig)
  }

  /**
   * Set runtime configuration for driver.
   *
   * @param {any} runtimeConfig
   * @return {MailImpl}
   */
  config(runtimeConfig = {}) {
    this.#runtimeConfig = runtimeConfig

    return this
  }

  /**
   * Change the mail mailer.
   *
   * @param {string} mailer
   * @return {MailImpl}
   */
  mailer(mailer) {
    this.#runtimeConfig = {}

    this.#driver = DriverFactory.fabricate(mailer, this.#runtimeConfig)

    return this
  }

  /**
   * Send a new mail message.
   *
   * @return {Promise<any>}
   */
  async send() {
    return this.#driver.send()
  }

  /**
   * Define mail sender.
   *
   * @param {string} from
   * @return {MailImpl}
   */
  from(from) {
    this.#driver.from(from)

    return this
  }

  /**
   * Define mail receiver.
   *
   * @param {string} to
   * @return {MailImpl}
   */
  to(...to) {
    this.#driver.to(...to)

    return this
  }

  /**
   * Define mail subject.
   *
   * @param {string} subject
   * @return {MailImpl}
   */
  subject(subject) {
    this.#driver.subject(subject)

    return this
  }

  /**
   * Define mail cc.
   *
   * @param {string} cc
   * @return {MailImpl}
   */
  cc(...cc) {
    this.#driver.cc(...cc)

    return this
  }

  /**
   * Define mail bcc.
   *
   * @param {string} bcc
   * @return {MailImpl}
   */
  bcc(...bcc) {
    this.#driver.bcc(...bcc)

    return this
  }

  /**
   * Define mail reply to.
   *
   * @param {string} replyTo
   * @return {MailImpl}
   */
  replyTo(replyTo) {
    this.#driver.replyTo(replyTo)

    return this
  }

  /**
   * Define mail in reply to.
   *
   * @param {string} inReplyTo
   * @return {MailImpl}
   */
  inReplyTo(inReplyTo) {
    this.#driver.inReplyTo(inReplyTo)

    return this
  }

  /**
   * Define mail references.
   *
   * @param {string} references
   * @return {MailImpl}
   */
  references(references) {
    this.#driver.references(references)

    return this
  }

  /**
   * Define mail envelope.
   *
   * @param {{ from?: string, to?: string, cc?: string, bcc?: string }} envelope
   * @return {MailImpl}
   */
  envelope(envelope) {
    this.#driver.envelope(envelope)

    return this
  }

  /**
   * Define mail attachment.
   *
   * @param {string} path
   * @param {any} content
   * @param {string} encoding
   * @return {MailImpl}
   */
  attachment(path, content, encoding) {
    this.#driver.attachment(path, content, encoding)

    return this
  }

  /**
   * Define mail attachments.
   *
   * @param {string} folderPath
   * @return {MailImpl}
   */
  attachments(folderPath) {
    this.#driver.attachments(folderPath)

    return this
  }

  /**
   * Define mail plain text.
   *
   * @param {string} text
   * @return {MailImpl}
   */
  text(text) {
    this.#driver.text(text)

    return this
  }

  /**
   * Define mail html.
   *
   * @param {string} html
   * @return {MailImpl}
   */
  html(html) {
    this.#driver.html(html)

    return this
  }

  /**
   * Define mail markdown.
   *
   * @param {string} markdown
   * @return {MailImpl}
   */
  markdown(markdown) {
    this.#driver.markdown(markdown)

    return this
  }

  /**
   * Define mail view.
   *
   * @param {string} name
   * @param {any} [data]
   * @param {'markdown' | 'html' | 'text'} [renderType]
   * @return {MailImpl}
   */
  view(name, data, renderType) {
    this.#driver.view(name, data, renderType)

    return this
  }
}
