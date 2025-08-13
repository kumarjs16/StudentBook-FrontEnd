// import axios from 'axios'
// import MockAdapter from 'axios-mock-adapter'

// const mock = new MockAdapter(axios)

// export default mock
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

let mock = null

// Enable mocks only in development or test, disable in production
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  mock = new MockAdapter(axios)

//   mock.onPost("http://192.168.0.13:8001/api/student/register/").reply(201, {
//     message: "Mock registration successful"
//   })
}

export default mock
