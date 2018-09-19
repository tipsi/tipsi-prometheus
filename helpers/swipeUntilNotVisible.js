/**
 * Make swipe until waitFor element not visible
 * @param  {String} selector           Element to swipe
 * @param  {String} waitFor            Element to wait for visible
 * @param  {String} direction          Swipe direction
 * @param  {Number} speed              Swipe transition in pixels
 * @param  {Number} options.percentage iOS Only value to scale
 * @param  {Number} options.attempts   How many times to swipe before fail
 * @param  {Number} options.timeout    Wait for visible timeout
 */
async function swipeUntilNotVisible(selector, waitFor, direction, speed, props = {}) {
  const { percentage, attempts = 4, timeout = 10000 } = props

  try {
    await this.expectForVisible(waitFor, timeout)
    return
  } catch (e) {
    // Do nothing
  }

  try {
    await this.waitForVisible(waitFor, timeout, true)
    await this.swipe(selector, direction, speed, percentage)
    await this.expectForVisible(waitFor, timeout)
  } catch (error) {
    if (attempts) {
      const nextProps = { attempts: attempts - 1, timeout, percentage }
      await this.swipeUntilNotVisible(selector, waitFor, direction, speed, nextProps)
    } else {
      throw error
    }
  }
}

export default swipeUntilNotVisible
