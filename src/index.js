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
  send() {}

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
   * @return {Mail}
   */
  subject() {}

  /**
   * Define mail cc.
   *
   * @return {Mail}
   */
  cc() {}

  /**
   * Define mail bcc.
   *
   * @return {Mail}
   */
  bcc() {}

  /**
   * Define mail reply to.
   *
   * @return {Mail}
   */
  replyTo() {}

  /**
   * Define mail in reply to.
   *
   * @return {Mail}
   */
  inReplyTo() {}

  /**
   * Define mail references.
   *
   * @return {Mail}
   */
  references() {}

  /**
   * Define mail envelope.
   *
   * @return {Mail}
   */
  envelope() {}

  /**
   * Define mail attachment.
   *
   * @return {Mail}
   */
  attachment() {}

  /**
   * Define mail attachments.
   *
   * @return {Mail}
   */
  attachments() {}

  /**
   * Define mail plain text.
   *
   * @return {Mail}
   */
  text() {}

  /**
   * Define mail html.
   *
   * @return {Mail}
   */
  html() {}

  /**
   * Define mail markdown.
   *
   * @return {Mail}
   */
  markdown() {}

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
