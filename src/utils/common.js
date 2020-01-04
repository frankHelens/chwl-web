import moment from 'moment'
import { Toast } from 'antd-mobile'
export const postData = ({
  type,
  data,
  state,
  toClient
} = {
  type: 'init',
  data: {},
  state: 0,
  toClient: 'server'
}) => {
  const res = {
    header: {
      token: window.localStorage.getItem('token') || '',
      sign: '1',
      clientType: 'web',
      timestamp: moment().format('x'),
    },
    body: {
      type,
      state,
      toClient,
      code: 0,
      data,
      message: ''
    }
  }
  return encodeURIComponent(JSON.stringify(res))
}

export const getData = (msg) => {
  const res = msg ? JSON.parse(decodeURIComponent(msg.data)) : {}
  const { code, message } = res.body
  if (code === 0) {
    return res.body
  } else {
    Toast.fail(message)
  }
}
