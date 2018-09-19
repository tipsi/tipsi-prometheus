export default async function swipeUp(selector, yoffset = 0) {
  const element = await this.element(selector)
  await this.touchPerform([{
    action: 'press',
    options: { element: element.value.ELEMENT },
  }, {
    action: 'moveTo',
    options: { x: 0, y: yoffset * -1 },
  }, {
    action: 'release',
  }])
}
