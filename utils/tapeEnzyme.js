import test from 'ava'
import prometheus from '../prometheus'
// import App from '../../web/scenes/Root'

export default function tape(name, callback) {
  return test.serial(name, async (t) => {
    try {
      // See packages/shared/store/store.js
      process.env.TEST_NAME = name
      const driver = prometheus.init(t, App)

      await callback(t, driver)
    } catch (error) {
      await prometheus.printHelpfulInfo()

      const errorString = error.api ? JSON.stringify(error, null, 2) : error
      console.error(errorString) // eslint-disable-line no-console

      process.exit(1)
    }
  })
}
