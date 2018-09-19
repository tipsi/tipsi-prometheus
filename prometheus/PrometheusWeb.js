import { remote } from 'webdriverio'
import source from 'tipsi-appium-helper/src/plugins/source'
import screenshot from 'tipsi-appium-helper/src/plugins/screenshot'
import Prometheus from './Prometheus'

const {
  SELENIUM_SERVER_CHROME,
  WEB_SERVER_HOST,
  WEB_SERVER_PORT,
} = process.env

const chromeServer = SELENIUM_SERVER_CHROME || '127.0.0.1'
const host = WEB_SERVER_HOST || '0.0.0.0'
const port = WEB_SERVER_PORT || 3000

const DEFAULT_DELAY = 70000
const DEFAULT_POLLING_INTERVAL = 50

export default class PrometheusWeb extends Prometheus {
  config = {
    imgur: process.env.IMGUR_CLIENT_ID,
  }

  init = async (t) => {
    const options = {
      desiredCapabilities: {
        browserName: 'chrome',
      },
      host: chromeServer,
      baseUrl: `http://${host}:${port}/client/`,
      bail: 1,
    }

    this.t = t

    this.driver = remote(options)

    await this.driver.init()
    await this.driver.setViewportSize({ width: 1920, height: 1080 })

    return this
  }

  printHelpfulInfo = async () => {
    await screenshot.call(this)
    await source.call(this)
  }

  expectForVisible = (...args) => this.waitForVisible(...args)

  waitForVisible = (selector, shouldBeHidden = false, timeout = DEFAULT_DELAY) => (
    this.driver.waitForVisible(this.idFromQA(selector), timeout, shouldBeHidden)
  )

  isVisible = selector => (
    this.driver.isVisible(this.idFromQA(selector))
  )

  clickOonVisibleElement = () => {}

  waitForExist = (selector, timeout = DEFAULT_DELAY) => (
    this.driver.waitForExist(this.idFromQA(selector), timeout)
  )

  click = selector => this.driver.click(this.idFromQA(selector))

  waitForClick = async (selector, timeout = DEFAULT_DELAY) => {
    await this.waitForVisible(selector, timeout)
    await this.click(selector)
  }

  moveToObject = selector => this.driver.moveToObject(this.idFromQA(selector))

  url = url => this.driver.url(url)

  getUrl = () => this.driver.getUrl()

  toHaveText = async (selector, expectedValue, message) => {
    const text = await this.driver.getText(this.idFromQA(selector))
    return this.t.equal(text, expectedValue, message)
  }

  waitToHaveText = async (selector, expectedValue, timeout = DEFAULT_DELAY, message) => {
    const start = Date.now()
    while (Date.now() - start < timeout) {
      const text = await this.driver.getText(this.idFromQA(selector))
      if (text === expectedValue) {
        return message
      }

      await this.driver.pause(DEFAULT_POLLING_INTERVAL)
    }

    throw new Error(message)
  }

  setValue = (selector, value) => this.driver.setValue(this.idFromQA(selector), value)

  uploadFileToInput = async (selector, pathToFile) => (
    this.driver.chooseFile(this.idFromQA(selector), pathToFile)
  )

  waitForSelected = (selector, timeout = DEFAULT_DELAY) => (
    this.driver.waitForSelected(this.idFromQA(selector), timeout)
  )

  isSelected = async selector => this.driver.isSelected(this.idFromQA(selector))

  waitForText = (selector, timeout = DEFAULT_DELAY) => (
    this.driver.waitForText(this.idFromQA(selector), timeout)
  )

  selectByIndex = (selector, index) => this.driver.selectByIndex(this.idFromQA(selector), index)

  selectByValue = (selector, value) => this.driver.selectByValue(this.idFromQA(selector), value)

  selectByAttribute = (selector, value) => this.driver.selectByValue(this.idFromQA(selector), value)

  swipe = () => {}

  refreshLayoutIfNeeded = () => {}

  platform = () => true

  // DO NOT USE BELOW METHODS IN REAL TESTS (ONLY FOR DEBUG)

  pause = time => this.driver.pause(time)

  getText = selector => this.driver.getText(this.idFromQA(selector))
}
