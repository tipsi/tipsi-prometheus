import Prometheus from './Prometheus'

export default class PrometheusDetox extends Prometheus {
  expectForVisible = (selector, timeout, shouldBeHidden = false) => (
    shouldBeHidden
      ? expect(element(by.id(selector)).atIndex(1)).toBeNotVisible()
      : expect(element(by.id(selector)).atIndex(1)).toBeVisible()
  )

  expectForVisibleText = async (text, message) => {
    await expect(element(by.text(text))).toBeVisible()
    return this.t.pass(message)
  }

  waitForVisible = (selector, timeout, shouldBeHidden = false) => (
    shouldBeHidden
      ? waitFor(element(by.id(selector)).atIndex(1)).toBeNotVisible().withTimeout(timeout)
      : waitFor(element(by.id(selector)).atIndex(1)).toBeVisible().withTimeout(timeout)
  )

  waitForClick = async (selector, timeout) => {
    await this.waitForVisible(selector, timeout)
    await this.click(selector)
  }

  waitForClickText = async (text, timeout) => {
    await waitFor(element(by.text(text))).toBeVisible().withTimeout(timeout)
    await element(by.text(text)).tap()
  }

  waitForClickLabel = async (label, timeout) => {
    await waitFor(element(by.label(label))).toBeVisible().withTimeout(timeout)
    await element(by.label(label)).tap()
  }

  click = async (selector) => {
    try {
      await element(by.id(selector)).atIndex(1).tap()
    } catch (error) {
      await element(by.id(selector)).atIndex(0).tap()
    }
  }

  toHaveText = async (selector, expectedValue, message) => {
    await expect(element(by.id(selector))).toHaveText(`${expectedValue}`)
    return this.t.pass(message)
  }

  toHaveValue = async (selector, expectedValue, message) => {
    await expect(element(by.id(selector))).toHaveValue(expectedValue)
    return this.t.pass(message)
  }

  setValue = async (selector, value, clickDoneButton, typeSlow) => {
    const isNotASimpleInput = clickDoneButton === 'numeric' || clickDoneButton === 'textarea'
    const typeText = text => element(by.id(selector)).typeText(text)
    const lineBreak = clickDoneButton && !isNotASimpleInput ? '\n' : ''

    if (typeSlow) {
      const inputValue = value.split('').concat(lineBreak)

      for (const word of inputValue) {
        await typeText(word)
      }
    } else {
      await typeText(`${value}${lineBreak}`)
    }

    if (isNotASimpleInput) {
      await this.clickDoneButton('numericKeyboard')
    }
  }

  clearText = selector => (
    element(by.id(selector)).clearText()
  )

  swipe = async (selector, direction, speed, percentage) => {
    const detoxSpeed = speed <= 1000 ? 'fast' : 'slow'
    return element(by.id(selector)).swipe(direction, detoxSpeed, percentage)
  }

  hideKeyboard = () => { /* Mock method */ }

  launchApp = params => device.launchApp(params)

  printHelpfulInfo = async () => {
    try {
      await this.iosScreenshot()
    } catch (error) {
      console.log('Could not create a screenshot') // eslint-disable-line no-console
    }
  }

  pressKeycode = () => { /* Mock method */ }

  platform = name => name === 'ios'

  isAndroid4 = () => false

  framework = name => name === 'detox'

  touchPerform = () => { /* Mock method */ }

  toggleAirplaneMode = () => { /* Mock method */ }
}
