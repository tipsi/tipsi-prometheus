import tape from 'tape'
import tapDiff from 'tap-diff'
import detox from 'detox'
import pkg from '../../../package.json'
import runTestSuites from '../suites'

function waitTapeFinish() {
  return new Promise(resolve => tape.onFinish(resolve))
}

export default async function runnerDetox() {
  await detox.init(pkg.detox)

  tape.createStream()
    .pipe(tapDiff())
    .pipe(process.stdout)

  runTestSuites()

  await waitTapeFinish()

  await detox.cleanup()

  process.exit(0)
}
