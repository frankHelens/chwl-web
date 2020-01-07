import moment from 'moment'
import { Toast } from 'antd-mobile'
export const postData = ({
  type,
  data,
  step,
  toClientType,
  toClientId,
} = {
  type: 'init',
  data: {},
  step: 0,
  toClientType: 'server',
  toClientId: 1,
}) => {
  const res = {
    header: {
      token: window.localStorage.getItem('token') || '',
      sign: '1',
      clientType: 'web',
      clientId: 1,
      timestamp: moment().format('x'),
    },
    body: {
      type,
      step,
      toClientType,
      toClientId,
      code: 0,
      data,
      message: ''
    }
  }
  // return encodeURIComponent(JSON.stringify(res))
  return JSON.stringify(res)
}

export const getData = (msg) => {
  const res = msg ? JSON.parse(msg.data) : {}
  const { code, message } = res.body
  if (code === 0) {
    return res.body
  } else {
    Toast.fail(message)
  }
}
