export default async function back(selector) {
  const backButtonId = 'backButton'
  const finalSelector = selector || backButtonId

  try {
    await this.waitForClick(finalSelector, 5000)
  } catch (e) {
    // Do nothing
  }
}
