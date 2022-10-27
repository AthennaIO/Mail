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

export class Mail {
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
   * @return {Mail}
   */
  constructor() {
    this.#driver = DriverFactory.fabricate(this.#mailer, this.#runtimeConfig)
  }

  /**
   * Set runtime configuration for driver.
   *
   * @param {any} runtimeConfig
   * @return {Mail}
   */
  config(runtimeConfig = {}) {
    this.#runtimeConfig = runtimeConfig

    return this
  }

  /**
   * Change the mail mailer.
   *
   * @param {string} mailer
   * @return {Mail}
   */
  mailer(mailer) {
    this.#runtimeConfig = {}

    this.#driver = DriverFactory.fabricate(mailer, this.#runtimeConfig)

    return this
  }

  /**
   * Send a new mail message.
   *
   * @return {Promise<void>}
   */
  async send() {
    return this.#driver.send()
  }

  /**
   * Define mail sender.
   *
   * @param {string} from
   * @return {Mail}
   */
  from(from) {
    this.#driver.from(from)

    return this
  }

  /**
   * Define mail receiver.
   *
   * @param {string} to
   * @return {Mail}
   */
  to(...to) {
    this.#driver.to(...to)

    return this
  }

  /**
   * Define mail subject.
   *
   * @param {string} subject
   * @return {Mail}
   */
  subject(subject) {
    this.#driver.subject(subject)

    return this
  }

  /**
   * Define mail cc.
   *
   * @param {string} cc
   * @return {Mail}
   */
  cc(...cc) {
    this.#driver.cc(...cc)

    return this
  }

  /**
   * Define mail bcc.
   *
   * @param {string} bcc
   * @return {Mail}
   */
  bcc(...bcc) {
    this.#driver.bcc(...bcc)

    return this
  }

  /**
   * Define mail reply to.
   *
   * @param {string} replyTo
   * @return {Mail}
   */
  replyTo(replyTo) {
    this.#driver.replyTo(replyTo)

    return this
  }

  /**
   * Define mail in reply to.
   *
   * @param {string} inReplyTo
   * @return {Mail}
   */
  inReplyTo(inReplyTo) {
    this.#driver.inReplyTo(inReplyTo)

    return this
  }

  /**
   * Define mail references.
   *
   * @param {string} references
   * @return {Mail}
   */
  references(references) {
    this.#driver.references(references)

    return this
  }

  /**
   * Define mail envelope.
   *
   * @param {string} envelope
   * @return {Mail}
   */
  envelope(envelope) {
    this.#driver.envelope(envelope)

    return this
  }

  /**
   * Define mail attachment.
   *
   * @param {string} path
   * @return {Mail}
   */
  attachment(path) {
    this.#driver.attachment(path)

    return this
  }

  /**
   * Define mail attachments.
   *
   * @param {string} folderPath
   * @return {Mail}
   */
  attachments(folderPath) {
    this.#driver.attachments(folderPath)

    return this
  }

  /**
   * Define mail plain text.
   *
   * @param {string} text
   * @return {Mail}
   */
  text(text) {
    this.#driver.text(text)

    return this
  }

  /**
   * Define mail html.
   *
   * @param {string} html
   * @return {Mail}
   */
  html(html) {
    this.#driver.html(html)

    return this
  }

  /**
   * Define mail markdown.
   *
   * @param {string} markdown
   * @return {Mail}
   */
  markdown(markdown) {
    this.#driver.markdown(markdown)

    return this
  }

  /**
   * Define mail view.
   *
   * @param {string} viewName
   * @param {any} [data]
   * @return {Mail}
   */
  view(viewName, data) {
    this.#driver.view(viewName, data)

    return this
  }
}
