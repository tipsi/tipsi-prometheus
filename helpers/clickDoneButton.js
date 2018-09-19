const ANDROID_DONE_BUTTON_KEYCODE = 66

export default async function clickDoneButton(onIOSOnlyForNumericTypeKeyboard) {
  if (this.platform('android')) {
    return this.pressKeycode(ANDROID_DONE_BUTTON_KEYCODE)
  }

  if (onIOSOnlyForNumericTypeKeyboard) {
    return element(by.label('Done')).atIndex(0).tap()
  }

  return false
}
