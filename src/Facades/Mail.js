/**
 * @athenna/mail
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Facade } from '@athenna/ioc'

/**
 * @type {typeof Facade & import('../index.js').Mail}
 */
export const Mail = Facade.createFor('Athenna/Core/Mail')
