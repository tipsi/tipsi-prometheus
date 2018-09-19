import helper from 'tipsi-appium-helper'

export default function isAndroid4() {
  return helper.platform('android') && helper.config.platformVersion.startsWith('4')
}
