/**
 * @athenna/artisan
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { File } from '@athenna/common'
import { Artisan } from '@athenna/artisan'
import { BaseTest } from '#tests/Helpers/BaseTest'
import { Test, TestContext } from '@athenna/test'

export default class MailConfigurerTest extends BaseTest {
  @Test()
  public async shouldBeAbleToConfigureTheMailComponentInTheApplication({ assert }: TestContext) {
    await Artisan.call('configure ./src/Configurer/index.ts')

    const { athenna } = await new File(Path.pwd('package.json')).getContentAsJson()

    assert.isTrue(await File.exists(Path.config('mail.ts')))
    assert.isTrue(await File.exists(Path.pwd('.env')))
    assert.isTrue(await File.exists(Path.pwd('.env.test')))
    assert.isTrue(await File.exists(Path.pwd('.env.example')))
    assert.containsSubset(athenna.providers, ['@athenna/mail/providers/MailProvider'])
  }
}
