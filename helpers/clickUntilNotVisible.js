/**
 * This helper click on `selector` while `waitFor` element is hidden.
 * @param  {String}  selector          Element that need to be clicked
 * @param  {String}  waitFor           Element that need to be hidden
 * @param  {Number}  options.attempts  How many times to try before fail
 * @param  {Number}  options.timeout   Wait For Visibility timeout
 */
export default async function clickUntilNotVisible(selector, waitFor, props = {}) {
  const { attempts = 4, timeout = 10000 } = props

  try {
    await this.expectForVisible(waitFor, timeout)
    return
  } catch (e) {
    // Do nothing
  }

  try {
    await this.waitForVisible(waitFor, timeout, true)
    await this.click(selector)
    await this.expectForVisible(waitFor, timeout)
  } catch (error) {
    if (attempts) {
      await this.clickUntilNotVisible(selector, waitFor, { attempts: attempts - 1, timeout })
    } else {
      throw error
    }
  }
}
