/**
 * @athenna/mail
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Path } from '@athenna/common'
import { Config } from '@athenna/config'
import { Mail, MailProvider } from '#src'
import { Test, Mock, BeforeEach, AfterEach, type Context } from '@athenna/test'

export class MailProviderTest {
  @BeforeEach()
  public async beforeEach() {
    await Config.loadAll(Path.fixtures('config'))
  }

  @AfterEach()
  public async afterEach() {
    Mock.restoreAll()
    ioc.reconstruct()
    Config.clear()
  }

  @Test()
  public async shouldBeAbleToRegisterMailImplementationInTheContainer({ assert }: Context) {
    new MailProvider().register()

    assert.isTrue(ioc.has('Athenna/Core/Mail'))
  }

  @Test()
  public async shouldBeAbleToUseMailImplementationFromFacade({ assert }: Context) {
    new MailProvider().register()

    assert.isDefined(Mail.mailerName)
  }
}
