/* eslint-disable import/prefer-default-export */
const interval = 10

export const createWaitForElement = (selector, timeout = 2000, shouldBeHidden) => (component) => {
  if (!selector) {
    return Promise.reject('No selector specified in createWaitForElement')
  }

  if (!component) {
    return Promise.reject('No root component specified createWaitForElement')
  }

  if (!component.length) {
    return Promise.reject('Specified root component in createWaitForElement not found.')
  }

  return new Promise((resolve, reject) => {
    let remainingTime = timeout
    const intervalId = setInterval(() => {
      if (remainingTime < 0) {
        clearInterval(intervalId)

        const targetComponent = component.update().find(selector)
        if (!targetComponent.length) {
          if (shouldBeHidden) {
            resolve()
          } else {
            reject(`Expected to find ${selector} within ${timeout}ms, but it was never found.`)
          }
        }

        reject(`${selector} still visible after ${timeout}ms`)
      }

      const targetComponent = component.update().find(selector)
      if (!targetComponent.length && shouldBeHidden) {
        clearInterval(intervalId)
        resolve()
      }

      if (targetComponent.length && !shouldBeHidden) {
        clearInterval(intervalId)
        resolve(component)
      }

      remainingTime -= interval
    }, interval)
  })
}
