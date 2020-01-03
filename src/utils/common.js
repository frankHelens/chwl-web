import moment from 'moment'
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
