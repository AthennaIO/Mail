/**
 * @athenna/mail
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Test } from '@athenna/test'
import { DriverFactory } from '#src'
import { BaseTest } from '#tests/helpers/BaseTest'
import type { Context } from '@athenna/test/types'
import { NotFoundDriverException } from '#src/exceptions/NotFoundDriverException'
import { NotImplementedConfigException } from '#src/exceptions/NotImplementedConfigException'

export default class DriverFactoryTest extends BaseTest {
  @Test()
  public shouldBeAbleToGetTheAvailableDriversOfDriverFactory({ assert }: Context) {
    const drivers = DriverFactory.availableDrivers()

    assert.deepEqual(drivers, ['fake', 'smtp'])
  }

  @Test()
  public shouldThrowANotImplementedConfigException({ assert }: Context) {
    assert.throws(() => DriverFactory.fabricate('notImplemented'), NotImplementedConfigException)
  }

  @Test()
  public shouldThrowANotImplementedConfigExceptionWithDifferentHelpMessage({ assert }: Context) {
    Config.delete('mail')

    assert.throws(() => DriverFactory.fabricate('notImplemented'), NotImplementedConfigException)
  }

  @Test()
  public shouldThrowANotFoundDriverException({ assert }: Context) {
    assert.throws(() => DriverFactory.fabricate('nullDriver'), NotFoundDriverException)
  }
}
