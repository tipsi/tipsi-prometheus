/**
 * This helper click on `selector` if `waitFor` element is visible.
 * @param  {String}  selector                       Element that need to be clicked
 * @param  {Number}  options.attempts               How many times to try before fail
 * @param  {Number}  options.timeout                Wait For Visibility timeout
 * @param  {Boolean} options.allowToFailBeforeClick Stop helper after first click fail
 * @param  {String}  options.waitFor                Element that need to be visible
 */
export default async function clickUntilVisible(selector, props = {}) {
  const {
    attempts = 4,
    timeout = 10000,
    allowToFailBeforeClick = false,
    waitFor = selector,
  } = props

  try {
    await this.waitForVisible(waitFor, timeout)
    await this.click(selector)
  } catch (error) {
    if (allowToFailBeforeClick) {
      return
    }

    throw error
  }

  try {
    await this.expectForVisible(waitFor, timeout, true)
  } catch (error) {
    if (attempts) {
      await this.clickUntilVisible(selector, { ...props, attempts: attempts - 1 })
    } else {
      throw error
    }
  }
}
