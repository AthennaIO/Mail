/**
 * @athenna/mail
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { MailImpl } from '#src/index'
import { ServiceProvider } from '@athenna/ioc'

export class MailProvider extends ServiceProvider {
  /**
   * Register any application services.
   *
   * @return {void}
   */
  register() {
    this.container.bind('Athenna/Core/Mail', new MailImpl())
  }
}
