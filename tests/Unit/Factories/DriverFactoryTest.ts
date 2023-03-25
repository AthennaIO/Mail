/**
 * @athenna/mail
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { DriverFactory } from '#src'
import { Test, TestContext } from '@athenna/test'
import { BaseTest } from '#tests/Helpers/BaseTest'
import { NotFoundDriverException } from '#src/Exceptions/NotFoundDriverException'
import { NotImplementedConfigException } from '#src/Exceptions/NotImplementedConfigException'

export default class DriverFactoryTest extends BaseTest {
  @Test()
  public shouldBeAbleToGetTheAvailableDriversOfDriverFactory({ assert }: TestContext) {
    const drivers = DriverFactory.availableDrivers()

    assert.deepEqual(drivers, ['smtp'])
  }

  @Test()
  public shouldThrowANotImplementedConfigException({ assert }: TestContext) {
    assert.throws(() => DriverFactory.fabricate('notImplemented'), NotImplementedConfigException)
  }

  @Test()
  public shouldThrowANotImplementedConfigExceptionWithDifferentHelpMessage({ assert }: TestContext) {
    Config.delete('mail')

    assert.throws(() => DriverFactory.fabricate('notImplemented'), NotImplementedConfigException)
  }

  @Test()
  public shouldThrowANotFoundDriverException({ assert }: TestContext) {
    assert.throws(() => DriverFactory.fabricate('nullDriver'), NotFoundDriverException)
  }
}
