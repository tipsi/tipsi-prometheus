import 'jsdom-global/register'
import path from 'path'
import fs from 'fs'
import React from 'react'
import { mount } from 'enzyme'
import { createWaitForElement } from '../utils/enzyme'
import Prometheus from './Prometheus'
import '../setup/enzymeConfig'

const keys = {
  Enter: { key: 'Enter', keyCode: 13, which: 13 },
  ArrowLeft: { key: 'ArrowLeft', keyCode: 37, which: 37 },
  ArrowUp: { key: 'ArrowUp', keyCode: 38, which: 38 },
  ArrowRight: { key: 'ArrowRight', keyCode: 39, which: 39 },
  ArrowDown: { key: 'ArrowDown', keyCode: 40, which: 40 },
}

export default class PrometheusEnzyme extends Prometheus {
  init(test, Component) {
    this.t = test
    this.wrapper = mount(<Component />)
    return this
  }

  // If id starting from any speacial character use it "as is"
  selectorFromID = id => id.includes('#') || id.includes('aria-label') ? id : `[data-qa="${id}"]`

  expectForVisible = (...args) => this.waitForVisible(...args)

  waitForVisible = (selector, timeout = 2000, shouldBeHidden = false) => (
    createWaitForElement(this.selectorFromID(selector), timeout, shouldBeHidden)(this.wrapper)
  )

  click = (selector) => {
    this.wrapper.find(this.selectorFromID(selector)).simulate('click', { button: 0 })
  }

  waitForClick = async (selector, timeout) => {
    await this.waitForVisible(selector, timeout)
    await this.click(selector)
  }

  // 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp', etc.
  keyPress = (selector, key) => {
    this.wrapper.find(this.selectorFromID(selector)).simulate('keyPress', key)
  }

  toHaveText = (selector, expectedValue, message) => {
    const text = this.wrapper.find(this.selectorFromID(selector)).text()
    return this.t.is(text, expectedValue, message)
  }

  toHaveValue = (selector, expectedValue, message) => {
    const { value, placeholder } = this.wrapper.find(this.selectorFromID(selector)).instance()
    return this.t.is(value || placeholder, expectedValue, message)
  }

  setValue = (selector, value) => {
    this.wrapper.find(this.selectorFromID(selector)).instance().value = value
    this.wrapper.find(this.selectorFromID(selector)).simulate('change')
  }

  clearText = (selector) => {
    this.wrapper.find(this.selectorFromID(selector)).instance().value = ''
    this.wrapper.find(this.selectorFromID(selector)).simulate('change')
  }

  handleKey = (selector, event, key) => {
    this.wrapper.find(this.selectorFromID(selector)).simulate(event, keys[key])
  }

  // Arrows
  keyDown = (selector, key) => this.handleKey(selector, 'keyDown', key)

  // Enter
  keyPress = (selector, key) => this.handleKey(selector, 'keyPress', key)

  pressEnter = selector => this.keyPress(selector, 'Enter')

  handleBlur = (selector) => {
    this.wrapper.find(this.selectorFromID(selector)).simulate('blur')
  }

  // eslint-disable-next-line no-console
  printHelpfulInfo = () => {
    const pathToConfig = path.resolve(__dirname, '..', '..', 'enzyme-log.xml')
    fs.writeFileSync(pathToConfig, this.wrapper.debug(), 'utf8')
  }

  back = () => this.waitForClick('backButton', 5000)

  swipe = () => {}

  refreshLayoutIfNeeded = () => {}

  platform = () => true
}
