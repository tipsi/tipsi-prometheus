import 'isomorphic-fetch'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

// Tests should be exit with non-zero code on unhandled promise rejection error
// https://github.com/facebook/jest/issues/3251#issuecomment-299183885
// if (!process.env.LISTENING_TO_UNHANDLED_REJECTION) {
//   process.on('unhandledRejection', (reason) => {
//     throw new Error(reason)
//   })

//   // Avoid memory leak by adding too many listeners
//   process.env.LISTENING_TO_UNHANDLED_REJECTION = true
// }
