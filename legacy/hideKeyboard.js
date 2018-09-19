export default async function hideKeyboard() {
  const defaultId = this.idFromXPath(`
    //XCUIElementTypeApplication/XCUIElementTypeWindow[5]/XCUIElementTypeOther/
    XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeKeyboard/
    XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeButton[3]
  `)
  const nextId = this.idFromXPath(`
    //XCUIElementTypeApplication/XCUIElementTypeWindow[5]/XCUIElementTypeOther/
    XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeKeyboard/
    XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeButton[2]
  `)

  let isFound = false

  try {
    await this.driver.click(defaultId)
    isFound = true
  } catch (e) {
    await this.driver.click(nextId)
    isFound = true
  }

  if (!isFound) {
    throw new Error('Done button not found')
  }
}
