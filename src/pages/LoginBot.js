import React, {Component} from 'react'

import { Button, Toast, WingBlank, WhiteSpace } from 'antd-mobile';
import { postData } from '@/utils/common'

Toast.config({ mask: false, duration: 0 })

export default class LoginBot extends Component {
  state = {
    ws: undefined
  }
  componentWillMount () {
    const url = 'ws://localhost:8888'
    const ws = new WebSocket(url)
    console.log('ws', ws)
    ws.onopen = this.onopen
    ws.onmessage = this.onmessage
    ws.onclose = this.onclose
    this.setState({
      ws
    })
  }
  getData = (msg) => {
    const res = msg ? JSON.parse(decodeURIComponent(msg.data)) : {}
    const { code, message } = res.body
    if (code === 0) {
      return res.body
    } else {
      Toast.fail(message)
    }
  }
  onopen = () => {
    Toast.loading('连接中')
    const init = postData()
    this.state.ws.send(init)
  }

  onmessage = (msg) => {
    const res = this.getData(msg)
    console.log('res', res)
    if (res.type === 'init') {
      Toast.success('连接成功')
    }
    if (res.type === 'loginBot') {
      console.log('登录机器人')
    }
  }
  loginBot = () => {
    const loginData = postData('loginBot', {})
    this.state.ws.send(loginData)
  }
  render() {
    return (
      <div>
        <WhiteSpace/>
        <WingBlank>
          <WhiteSpace/>
          <WhiteSpace/>
          <Button type="primary" onClick={this.loginBot}>登录小瑞</Button>
          <WhiteSpace/>
          <WhiteSpace/>
          <WhiteSpace/>
          <WhiteSpace/>
        </WingBlank>
      </div>
    );
  }
}
