/**
 * @athenna/mail
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

export default {
  default: 'smtp',

  mailers: {
    smtp: {
      driver: 'smtp',
      host: 'localhost',
      port: 5025,
      tls: {
        rejectUnauthorized: false
      }
    },
    nullDriver: {
      driver: 'not-found'
    }
  }
}
