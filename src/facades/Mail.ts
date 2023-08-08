/**
 * @athenna/mail
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import type { MailImpl } from '#src'
import { Facade } from '@athenna/ioc'

export const Mail = Facade.createFor<MailImpl>('Athenna/Core/Mail')
