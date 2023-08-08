/**
 * @athenna/mail
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { SmtpServerImpl } from '#src'
import { ServiceProvider } from '@athenna/ioc'

export class SmtpServerProvider extends ServiceProvider {
  public register() {
    this.container.singleton('Athenna/Core/SmtpServer', new SmtpServerImpl())
  }

  public async shutdown() {
    const SmtpServer = this.container.use<SmtpServerImpl>(
      'Athenna/Core/SmtpServer',
    )

    if (!SmtpServer) {
      return
    }

    if (!SmtpServer.isListening) {
      return
    }

    await SmtpServer.close()
  }
}
