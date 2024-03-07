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
import { SmtpServer, SmtpServerProvider } from '#src'
import { Test, Mock, BeforeEach, AfterEach, type Context } from '@athenna/test'

export class SmtpServerProviderTest {
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
  public async shouldBeAbleToRegisterSmtpServerImplementationInTheContainer({ assert }: Context) {
    new SmtpServerProvider().register()

    assert.isTrue(ioc.has('Athenna/Core/SmtpServer'))
  }

  @Test()
  public async shouldBeAbleToUseSmtpServerImplementationFromFacade({ assert }: Context) {
    new SmtpServerProvider().register()

    assert.isDefined(SmtpServer.isListening)
  }

  @Test()
  public async shouldBeAbleToShutdownTheSmtpServerFromProvider({ assert }: Context) {
    new SmtpServerProvider().register()

    await SmtpServer.create().listen(3009)

    assert.isTrue(SmtpServer.isListening)

    new SmtpServerProvider().shutdown()

    assert.isFalse(SmtpServer.isListening)
  }
}
