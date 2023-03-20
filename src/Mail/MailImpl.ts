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
import { Envelope } from 'nodemailer/lib/mailer/index.js'

export class MailImpl {
  /**
   * The mailer name used for this instance.
   */
  public mailerName: string = Config.get('mail.default')

  /**
   * The driver responsible for mailering the mails.
   */
  private driver: any = null

  /**
   * Runtime configurations to be used inside the Drivers.
   */
  private runtimeConfig: any = {}

  /**
   * Creates a new instance of Mail.
   */
  public constructor() {
    this.driver = DriverFactory.fabricate(this.mailerName, this.runtimeConfig)
  }

  /**
   * Set runtime configuration for driver.
   */
  public config(runtimeConfig: any = {}): MailImpl {
    this.runtimeConfig = runtimeConfig

    return this
  }

  /**
   * Change the mail mailer.
   */
  public mailer(mailer: string): MailImpl {
    this.runtimeConfig = {}

    this.driver = DriverFactory.fabricate(mailer, this.runtimeConfig)

    return this
  }

  /**
   * Send a new mail message.
   */
  public async send(): Promise<any> {
    return this.driver.send()
  }

  /**
   * Define mail sender.
   */
  public from(from: string): MailImpl {
    this.driver.from(from)

    return this
  }

  /**
   * Define mail receiver.
   */
  public to(...to: string[]): MailImpl {
    this.driver.to(...to)

    return this
  }

  /**
   * Define mail subject.
   */
  public subject(subject: string): MailImpl {
    this.driver.subject(subject)

    return this
  }

  /**
   * Define mail cc.
   */
  public cc(...cc: string[]): MailImpl {
    this.driver.cc(...cc)

    return this
  }

  /**
   * Define mail bcc.
   */
  public bcc(...bcc: string[]): MailImpl {
    this.driver.bcc(...bcc)

    return this
  }

  /**
   * Define mail reply to.
   */
  public replyTo(replyTo: string): MailImpl {
    this.driver.replyTo(replyTo)

    return this
  }

  /**
   * Define mail in reply to.
   */
  public inReplyTo(inReplyTo: string): MailImpl {
    this.driver.inReplyTo(inReplyTo)

    return this
  }

  /**
   * Define mail references.
   */
  public references(references: string): MailImpl {
    this.driver.references(references)

    return this
  }

  /**
   * Define mail envelope.
   */
  public envelope(envelope: Envelope): MailImpl {
    this.driver.envelope(envelope)

    return this
  }

  /**
   * Define mail attachment.
   */
  public attachment(path: string, content?: any, encoding?: string): MailImpl {
    this.driver.attachment(path, content, encoding)

    return this
  }

  /**
   * Define mail attachments.
   */
  public attachments(folderPath: string): MailImpl {
    this.driver.attachments(folderPath)

    return this
  }

  /**
   * Define mail plain text.
   */
  public text(text: string): MailImpl {
    this.driver.text(text)

    return this
  }

  /**
   * Define mail html.
   */
  public html(html: string): MailImpl {
    this.driver.html(html)

    return this
  }

  /**
   * Define mail markdown.
   */
  public markdown(markdown: string): MailImpl {
    this.driver.markdown(markdown)

    return this
  }

  /**
   * Define mail view.
   */
  public view(
    name: string,
    data?: any,
    renderType?: 'markdown' | 'html' | 'text',
  ): MailImpl {
    this.driver.view(name, data, renderType)

    return this
  }
}
