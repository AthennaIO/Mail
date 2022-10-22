/**
 * @athenna/mail
 *
 * (c) Victor Tesoura Júnior <txsoura@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Config } from '@athenna/config'
import { SmtpDriver } from '#src/Drivers/SmtpDriver'
import { NotImplementedConfigException } from '#src/Exceptions/NotImplementedConfigException'
import { NotFoundDriverException } from '#src/Exceptions/NotFoundDriverException'

export class DriverFactory {
  /**
   * Driver of driver factory.
   *
   * @type {Map<string, { Driver: any }>}
   */
  static #drivers = new Map().set('smtp', { Driver: SmtpDriver })

  /**
   * Return an array of all available drivers.
   *
   * @return {string[]}
   */
  static availableDrivers() {
    return [...this.#drivers.keys()]
  }

  /**
   * Fabricate a new instance of a driver based in mailer configurations.
   *
   * @param {string} mailerName
   * @param {any} runtimeConfig
   * @return {any}
   */
  static fabricate(mailerName, runtimeConfig = {}) {
    const mailerConfig = this.#getMailerConfig(mailerName)

    const { Driver } = this.#drivers.get(mailerConfig.driver)

    return new Driver({ ...mailerConfig, ...runtimeConfig })
  }

  /**
   * Get all mailer configuration.
   *
   * @param {string} mailerName
   * @return {any}
   */
  static #getMailerConfig(mailerName) {
    if (mailerName === 'default') {
      mailerName = Config.get('mail.default')
    }

    const mailerConfig = Config.get(`mail.mailers.${mailerName}`)

    if (!mailerConfig) {
      throw new NotImplementedConfigException(mailerName)
    }

    if (!this.#drivers.has(mailerConfig.driver)) {
      throw new NotFoundDriverException(mailerConfig.driver)
    }

    return mailerConfig
  }
}
