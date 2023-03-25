/**
 * @athenna/mail
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { SmtpServerImpl } from '#src'
import { Facade } from '@athenna/ioc'

export const SmtpServer: SmtpServerImpl = Facade.createFor(
  'Athenna/Core/SmtpServer',
)
