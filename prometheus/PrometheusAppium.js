import helper from 'tipsi-appium-helper'
import Prometheus from './Prometheus'
import swipeUp from '../legacy/swipeUp'
import swipeRight from '../legacy/swipeRight'
import swipeDown from '../legacy/swipeDown'
import swipeLeft from '../legacy/swipeLeft'
import hideKeyboard from '../legacy/hideKeyboard'
import isAndroid4 from '../legacy/isAndroid4'

const { driver, idFromAccessId, idFromText, platform } = helper
const idFromLabel = label => `//*[@label = "${label}"]`

export default class PrometheusAppium extends Prometheus {
  expectForVisible = (selector, timeout, shouldBeHidden = false) => (
    this.waitForVisible(selector, timeout, shouldBeHidden)
  )

  expectForVisibleText = async (text, message, timeout) => {
    await driver.waitForVisible(idFromText(text), timeout)
    return this.t.pass(message)
  }

  waitForVisible = (selector, timeout, shouldBeHidden = false) => (
    driver.waitForVisible(idFromAccessId(selector), timeout, shouldBeHidden)
  )

  waitForClick = async (selector, timeout) => {
    await this.waitForVisible(selector, timeout)
    await this.click(selector)
  }

  waitForClickText = async (text, timeout) => {
    await driver.waitForVisible(idFromText(text), timeout)
    await driver.click(idFromText(text))
  }

  click = selector => (
    driver.click(idFromAccessId(selector))
  )

  toHaveText = async (selector, expectedValue, message) => {
    const text = await driver.getText(idFromAccessId(selector))
    return this.t.equal(text, `${expectedValue}`, message)
  }

  toHaveValue = async (selector, expectedValue, message) => {
    const text = await driver.getText(idFromAccessId(selector))
    return this.t.equal(text, `${expectedValue}`, message)
  }

  setValue = async (selector, value, clickDoneButton, typeSlow) => {
    if (typeSlow && platform('ios')) {
      await driver.click(idFromAccessId(selector))
      await driver.waitForVisible(idFromLabel('a'), 10000)
      for (const word of value.split('')) {
        await driver.keys(word)
      }
    } else {
      await driver.setValue(idFromAccessId(selector), value)
    }

    if (clickDoneButton) {
      if (platform('ios')) {
        await this.hideKeyboard()
      } else {
        await this.clickDoneButton()
      }
    }
  }

  clearText = selector => (
    driver.clearElement(idFromAccessId(selector))
  )

  swipe = async (selector, direction, speed) => {
    const swipe = {
      up: platform('ios') ? swipeUp.bind(driver) : driver.swipeUp,
      right: platform('ios') ? swipeRight.bind(driver) : driver.swipeRight,
      down: platform('ios') ? swipeDown.bind(driver) : driver.swipeDown,
      left: platform('ios') ? swipeLeft.bind(driver) : driver.swipeLeft,
    }

    return swipe[direction](idFromAccessId(selector), speed)
  }

  hideKeyboard = () => platform('ios') ? hideKeyboard.call(helper) : driver.back()

  launchApp = () => driver.reset()

  printHelpfulInfo = async () => {
    await helper.source()
    await helper.screenshot()
  }

  platform = name => platform(name)

  pressKeycode = keyCode => driver.pressKeycode(keyCode)

  isAndroid4 = () => isAndroid4()

  touchPerform = (action, coords) => driver.touchPerform([{ action, options: coords }])

  toggleAirplaneMode = () => {
    if (platform('ios')) {
      throw new Error('Not implemented')
    }

    return driver.toggleAirplaneMode()
  }

  framework = name => name === 'appium'
}
