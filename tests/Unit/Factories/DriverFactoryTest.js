/**
 * @athenna/mail
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { Config } from '@athenna/config'
import { Folder, Path } from '@athenna/common'
import { DriverFactory } from '#src/Factories/DriverFactory'
import { NotFoundDriverException } from '#src/Exceptions/NotFoundDriverException'
import { NotImplementedConfigException } from '#src/Exceptions/NotImplementedConfigException'

test.group('DriverFactoryTest', group => {
  group.setup(async () => {
    await new Folder(Path.stubs('views')).copy(Path.views())
    await new Folder(Path.stubs('configs')).copy(Path.config())
    await Config.safeLoad(Path.config('mail.js'))
  })

  group.teardown(async () => {
    await Folder.safeRemove(Path.views())
    await Folder.safeRemove(Path.config())
  })

  test('should be able to get the available drivers of DriverFactory', async ({ assert }) => {
    const drivers = DriverFactory.availableDrivers()

    assert.deepEqual(drivers, ['smtp'])
  })

  test('should throw a not implemented config exception', async ({ assert }) => {
    assert.throws(() => DriverFactory.fabricate('notImplemented'), NotImplementedConfigException)
  })

  test('should throw a not found driver exception', async ({ assert }) => {
    assert.throws(() => DriverFactory.fabricate('nullDriver'), NotFoundDriverException)
  })
})
