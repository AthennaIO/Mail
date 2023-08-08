/**
 * @athenna/mail
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Rc } from '@athenna/config'
import { ViewProvider } from '@athenna/view'
import { File, Folder } from '@athenna/common'
import { LoggerProvider } from '@athenna/logger'
import { SmtpServer } from '#src/Facades/SmtpServer'
import { MailProvider, SmtpServerProvider } from '#src'
import { BeforeEach, AfterEach, ExitFaker } from '@athenna/test'
import { ArtisanProvider, CommanderHandler, ConsoleKernel } from '@athenna/artisan'

export class BaseTest {
  public originalPJson = new File(Path.pwd('package.json')).getContentAsStringSync()

  @BeforeEach()
  public async beforeEach() {
    ExitFaker.fake()

    process.env.IS_TS = 'true'

    await Config.loadAll(Path.stubs('config'))

    await new MailProvider().register()
    await new ViewProvider().register()
    await new LoggerProvider().register()
    await new ArtisanProvider().register()
    await new SmtpServerProvider().register()

    await SmtpServer.create({ disabledCommands: ['AUTH'] }).listen(5025)

    const kernel = new ConsoleKernel()

    await Rc.setFile(Path.pwd('package.json'))

    await kernel.registerExceptionHandler()
    await kernel.registerCommands()
  }

  @AfterEach()
  public async afterEach() {
    ExitFaker.release()

    await new MailProvider().shutdown()
    await new ViewProvider().shutdown()
    await new LoggerProvider().shutdown()
    await new ArtisanProvider().shutdown()
    await new SmtpServerProvider().shutdown()

    Config.clear()
    ioc.reconstruct()

    CommanderHandler.getCommander<any>()._events = {}
    CommanderHandler.getCommander<any>().commands = []
    CommanderHandler.getCommander<any>()._version = undefined

    await Folder.safeRemove(Path.config())
    await Folder.safeRemove(Path.stubs('storage'))

    await File.safeRemove(Path.pwd('.env'))
    await File.safeRemove(Path.pwd('.env.test'))
    await File.safeRemove(Path.pwd('.env.example'))

    await new File(Path.pwd('package.json')).setContent(this.originalPJson)
  }
}
