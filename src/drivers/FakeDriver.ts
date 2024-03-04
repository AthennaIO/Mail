/**
 * @athenna/mail
 *
 * (c) Victor Tesoura Júnior <txsoura@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

export class FakeDriver {
  /**
   * Send a new mail message.
   */
  public async send(): Promise<void> {}

  /**
   * Define mail sender.
   */
  public from() {
    return this
  }

  /**
   * Define mail receiver.
   */
  public to() {
    return this
  }

  /**
   * Define mail subject.
   */
  public subject() {
    return this
  }

  /**
   * Define mail cc.
   */
  public cc() {
    return this
  }

  /**
   * Define mail bcc.
   */
  public bcc() {
    return this
  }

  /**
   * Define mail reply to.
   */
  public replyTo() {
    return this
  }

  /**
   * Define mail in reply to.
   */
  public inReplyTo() {
    return this
  }

  /**
   * Define mail references.
   */
  public references() {
    return this
  }

  /**
   * Define mail envelope.
   */
  public envelope() {
    return this
  }

  /**
   * Define attachments to the mail.
   */
  public attachment() {
    return this
  }

  /**
   * Define mail plain text.
   */
  public text() {
    return this
  }

  /**
   * Define mail html.
   */
  public html() {
    return this
  }

  /**
   * Define mail markdown.
   */
  public markdown() {
    return this
  }

  /**
   * Define mail view.
   */
  public view() {
    return this
  }
}
