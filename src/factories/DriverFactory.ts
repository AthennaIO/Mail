/**
 * @athenna/mail
 *
 * (c) Victor Tesoura Júnior <txsoura@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Config } from '@athenna/config'
import { SmtpDriver } from '#src/drivers/SmtpDriver'
import { FakeDriver } from '#src/drivers/FakeDriver'
import { NotFoundDriverException } from '#src/exceptions/NotFoundDriverException'
import { NotImplementedConfigException } from '#src/exceptions/NotImplementedConfigException'

export class DriverFactory {
  /**
   * Driver of driver factory.
   */
  public static drivers: Map<string, { Driver: any }> = new Map()
    .set('fake', { Driver: FakeDriver })
    .set('smtp', { Driver: SmtpDriver })

  /**
   * Return an array of all available drivers.
   */
  public static availableDrivers(): string[] {
    return [...this.drivers.keys()]
  }

  /**
   * Fabricate a new instance of a driver based in mailer configurations.
   */
  public static fabricate(mailerName: string, runtimeConfig: any = {}): any {
    const mailerConfig = this.getMailerConfig(mailerName)

    const { Driver } = this.drivers.get(mailerConfig.driver)

    return new Driver({ ...mailerConfig, ...runtimeConfig })
  }

  /**
   * Get all mailer configuration.
   */
  private static getMailerConfig(mailerName: string): any {
    if (mailerName === 'default') {
      mailerName = Config.get('mail.default')
    }

    const mailerConfig = Config.get(`mail.mailers.${mailerName}`)

    if (!mailerConfig) {
      throw new NotImplementedConfigException(mailerName)
    }

    if (!this.drivers.has(mailerConfig.driver)) {
      throw new NotFoundDriverException(mailerConfig.driver)
    }

    return mailerConfig
  }
}
