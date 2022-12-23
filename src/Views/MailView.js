/**
 * @athenna/mail
 *
 * (c) Victor Tesoura Júnior <txsoura@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Edge } from 'edge.js'
import { Path } from '@athenna/common'

export class MailView {
  static edge = new Edge({ cache: Env('CACHE_VIEWS', false) })

  static load(path = Path.views('mail')) {
    this.edge.mount('mail', path)
  }

  static render(name, data) {
    return this.edge.renderSync(`mail::${name}`, data)
  }
}
