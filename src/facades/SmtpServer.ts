/**
 * @athenna/mail
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Facade } from '@athenna/ioc'
import type { SmtpServerImpl } from '#src'

export const SmtpServer = Facade.createFor<SmtpServerImpl>(
  'Athenna/Core/SmtpServer'
)
