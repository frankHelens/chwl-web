import React, {Component} from 'react'

import { Button, Toast, WingBlank, WhiteSpace } from 'antd-mobile';

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
  postData = (type = 'init', data = {}) => {
    const res = {
      header: {
        client: 1,
        sign: 1
      },
      body: {
        type,
        data
      }
    }
    return encodeURIComponent(JSON.stringify(res))
  }
  getData = (msg) => {
    const res = msg ? JSON.parse(decodeURIComponent(msg.data)) : {}
    const { code, data } = res.body.data
    if (code === 0) {
      return {
        type: res.body.type,
        data
      }
    } else {
      Toast.fail(data.message)
    }
  }
  onopen = () => {
    Toast.loading('连接中')
    const init = this.postData()
    this.state.ws.send(init)
  }

  onmessage = (msg) => {
    const res = this.getData(msg)
    if (res.type === 'init') {
      Toast.success('连接成功')
    }
    if (res.type === 'loginBot') {
      console.log('登录机器人')
    }
  }
  loginBot = () => {
    const loginData = this.postData('loginBot', {})
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
