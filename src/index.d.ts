import { Facade } from '@athenna/ioc'

export const Mail: typeof Facade & MailImpl

export class MailImpl {
  /**
   * Set runtime configuration for driver.
   *
   * @param {any} runtimeConfig
   * @return {MailImpl}
   */
  config(runtimeConfig?: any): MailImpl

  /**
   * Change the mail mailer.
   *
   * @param {string} mailer
   * @return {MailImpl}
   */
  mailer(mailer: string): MailImpl

  /**
   * Send a new mail message.
   *
   * @return {Promise<any>}
   */
  send(): Promise<any>

  /**
   * Define mail sender.
   *
   * @param {string} from
   * @return {MailImpl}
   */
  from(from: string): MailImpl

  /**
   * Define mail receiver.
   *
   * @param {string} to
   * @return {MailImpl}
   */
  to(to: string): MailImpl
  to(to: string[]): MailImpl
  to(...to: string[]): MailImpl

  /**
   * Define mail subject.
   *
   * @param {string} subject
   * @return {MailImpl}
   */
  subject(subject: string): MailImpl

  /**
   * Define mail cc.
   *
   * @param {string} cc
   * @return {MailImpl}
   */
  cc(cc: string): MailImpl
  cc(cc: string[]): MailImpl
  cc(...cc: string[]): MailImpl

  /**
   * Define mail bcc.
   *
   * @param {string} bcc
   * @return {MailImpl}
   */
  bcc(bcc: string): MailImpl
  bcc(bcc: string[]): MailImpl
  bcc(...bcc: string[]): MailImpl

  /**
   * Define mail reply to.
   *
   * @param {string} replyTo
   * @return {MailImpl}
   */
  replyTo(replyTo: string): MailImpl

  /**
   * Define mail in reply to.
   *
   * @param {string} inReplyTo
   * @return {MailImpl}
   */
  inReplyTo(inReplyTo): MailImpl

  /**
   * Define mail references.
   *
   * @param {string} references
   * @return {MailImpl}
   */
  references(references: string): MailImpl

  /**
   * Define mail envelope.
   *
   * @param {{ from?: string, to?: string, cc?: string, bcc?: string }} envelope
   * @return {MailImpl}
   */
  envelope(envelope: {
    from?: string
    to?: string
    cc?: string
    bcc?: string
  }): MailImpl

  /**
   * Define mail attachment.
   *
   * @param {string} path
   * @param {any} [content]
   * @param {string} [encoding]
   * @return {MailImpl}
   */
  attachment(path: string): MailImpl
  attachment(name: string, content: any): MailImpl
  attachment(name: string, content: any, encoding: string): MailImpl

  /**
   * Define mail attachments.
   *
   * @param {string} folderPath
   * @return {MailImpl}
   */
  attachments(folderPath: string): MailImpl

  /**
   * Define mail plain text.
   *
   * @param {string} text
   * @return {MailImpl}
   */
  text(text: string): MailImpl

  /**
   * Define mail html.
   *
   * @param {string} html
   * @return {MailImpl}
   */
  html(html: string): MailImpl

  /**
   * Define mail markdown.
   *
   * @param {string} markdown
   * @return {MailImpl}
   */
  markdown(markdown: string): MailImpl

  /**
   * Define mail view.
   *
   * @param {string} name
   * @param {any} [data]
   * @param {'markdown' | 'html' | 'text'} [renderType]
   * @return {MailImpl}
   */
  view(
    name: string,
    data?: any,
    renderType?: 'markdown' | 'html' | 'text',
  ): MailImpl
}
