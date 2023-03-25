/**
 * @athenna/mail
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { File } from '@athenna/common'
import { BaseConfigurer } from '@athenna/artisan'

export default class MailConfigurer extends BaseConfigurer {
  private configPath = null

  public async configure() {
    const relativePath =
      (await this.prompt.input(
        `Where do you want to save the config files? Pressing enter will set the path to ${this.paint.cyan(
          './config',
        )}`,
      )) || './config'

    this.configPath = Path.pwd(relativePath)

    await this.logger
      .task()
      .add(`Create mail.${Path.ext()} config file`, t =>
        this.setTask(t, () => this.taskOne()),
      )
      .add('Update providers of .athennarc.json', t =>
        this.setTask(t, () => this.taskTwo()),
      )
      .add('Update .env, .env.test and .env.example', t =>
        this.setTask(t, () => this.taskThree()),
      )
      .run()
  }

  private async taskOne() {
    let path = './config/mail.js'

    if (Env('IS_TS', false) === true) {
      path = './config/mail.ts'
    }

    await new File(path).copy(this.configPath.concat(`/mail.${Path.ext()}`))
  }

  private async taskTwo() {
    return this.rc
      .pushTo('providers', '@athenna/mail/providers/MailProvider')
      .pushTo('providers', '@athenna/mail/providers/SmtpServerProvider')
      .save()
  }

  private async taskThree() {
    const envs =
      '\nMAIL_MAILER=smtp\n' +
      'MAIL_HOST=localhost\n' +
      'MAIL_PORT=5025\n' +
      'MAIL_USERNAME=\n' +
      'MAIL_PASSWORD=\n'

    return new File(Path.pwd('.env'), '')
      .append(envs)
      .then(() => new File(Path.pwd('.env.test'), '').append(envs))
      .then(() => new File(Path.pwd('.env.example'), '').append(envs))
  }

  private async setTask(task: any, callback: any) {
    try {
      await callback()
      await task.complete()
    } catch (err) {
      await task.fail(err)
    }
  }
}
