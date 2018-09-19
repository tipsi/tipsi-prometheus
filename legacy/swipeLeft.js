export default async function swipeLeft(elementId, xoffset = -130) {
  const element = await this.element(elementId)
  await this.touchPerform([{
    action: 'press',
    options: { element: element.value.ELEMENT },
  }, {
    action: 'moveTo',
    options: { x: xoffset * -1, y: 0 },
  }, {
    action: 'release',
  }])
}
