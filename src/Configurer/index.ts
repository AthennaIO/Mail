/**
 * @athenna/mail
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import yaml from 'js-yaml'

import { File } from '@athenna/common'
import { BaseConfigurer } from '@athenna/artisan'

export default class MailConfigurer extends BaseConfigurer {
  public async configure() {
    await this.logger
      .task()
      .add(`Create config/mail.${Path.ext()} file`, t =>
        this.setTask(t, () => this.taskOne()),
      )
      .add('Update providers of .athennarc.json', t =>
        this.setTask(t, () => this.taskTwo()),
      )
      .add('Update .env, .env.test and .env.example', t =>
        this.setTask(t, () => this.taskThree()),
      )
      .add('Update docker-compose.yml file', t =>
        this.setTask(t, () => this.taskFour()),
      )
      .run()
  }

  private async taskOne() {
    let path = './config/mail.js'

    if (Env('IS_TS', false) === true) {
      path = './config/mail.ts'
    }

    await new File(path).copy(Path.config(`mail.${Path.ext()}`))
  }

  private async taskTwo() {
    return this.rc
      .pushTo('providers', '@athenna/mail/providers/MailProvider')
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

  private async taskFour() {
    const service = {
      container_name: 'athenna_smtp',
      image: 'kurzdigital/fake-smtp',
      ports: ['5025:5025', '5080:5080'],
    }

    const baseDockerCompose = await new File(
      './docker-compose.yml',
    ).getContent()
    const file = await new File(
      Path.pwd('docker-compose.yml'),
      baseDockerCompose,
    ).load()
    const dockerCompose = yaml.load(file.content)

    if (!dockerCompose.services) {
      dockerCompose.services = {}
    }

    dockerCompose.services.smtp = service

    return file.setContent(yaml.dump(dockerCompose).concat('\n'))
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
