/**
 * @athenna/mail
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Macroable } from '@athenna/common'
import { SMTPServer, type SMTPServerOptions } from 'smtp-server'

export class SmtpServerImpl extends Macroable {
  /**
   * The SMTP server instance.
   */
  public server: SMTPServer

  /**
   * Set if the SMTP server is listening.
   */
  public isListening = false

  /**
   * Create the SMTP server instance.
   */
  public create(options?: SMTPServerOptions): SmtpServerImpl {
    this.server = new SMTPServer(options)

    return this
  }

  /**
   * Start the SMTP server.
   */
  public async listen(
    port = 5025,
    host?: string,
    backlog?: number
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.server.listen(port, host, backlog)

        resolve()

        this.isListening = true
      } catch (err) {
        reject(err)
      }
    })
  }

  /**
   * Close the SMTP Server.
   */
  public async close(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.server.close()

        resolve()

        this.isListening = false
      } catch (err) {
        reject(err)
      }
    })
  }
}
