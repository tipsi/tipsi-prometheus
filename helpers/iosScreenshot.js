import path from 'path'
import process from 'process'
import { execSync } from 'child_process'
import { readFileSync } from 'fs'
import imgur from 'imgur'

export default async function iosScreenshot() {
  execSync('xcrun simctl io booted screenshot screen.png')
  const screenshot = readFileSync(path.join(process.cwd(), 'screen.png'), 'base64')
  execSync('rm -rf screen.png')

  return imgur.uploadBase64(screenshot)
    /* eslint-disable no-console */
    .then((json) => {
      console.log('---------------------------------------------------')
      console.log('SCREEENSHOT URL:', json.data.link)
      console.log('---------------------------------------------------')
      return json.data
    })
    .catch((error) => {
      console.log('---------------------------------------------------')
      console.error('Failed to save screenshot:', error.message)
      console.log('---------------------------------------------------')
    })
    /* eslint-enable no-console */
}
