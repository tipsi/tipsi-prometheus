/**
 * This helper tap on `coords` while `waitFor` element is hidden.
 * @param  {String}  coords            Object {x: INT, y: INT } with coords to tap
 * @param  {String}  waitFor           Element that need to be hidden
 * @param  {Number}  options.attempts  How many times to try before fail
 * @param  {Number}  options.timeout   Wait For Visibility timeout
 */
export default async function tapAtPointUntilNotVisible(coords, waitFor, props = {}) {
  const { attempts = 4, timeout = 10000 } = props

  try {
    await this.expectForVisible(waitFor, timeout)
    return
  } catch (e) {
    // Do nothing
  }

  try {
    await this.waitForVisible(waitFor, timeout, true)
    await this.touchPerform('tap', coords)
    await this.expectForVisible(waitFor, timeout)
  } catch (error) {
    if (attempts) {
      await this.tapAtPointUntilNotVisible(coords, waitFor, { attempts: attempts - 1, timeout })
    } else {
      throw error
    }
  }
}
