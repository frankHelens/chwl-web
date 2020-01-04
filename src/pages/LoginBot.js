import React, {Component} from 'react'

import { Button, Toast, WingBlank, WhiteSpace, Card } from 'antd-mobile';
import { postData, getData } from '@/utils/common'
import moment from 'moment'

Toast.config({ mask: false, duration: 0 })

export default class LoginBot extends Component {
  state = {
    ws: undefined,
    info: '',
    isQrcode: false,
    qrcode: ''
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
  onopen = () => {
    Toast.loading('连接中')
    const init = postData()
    this.state.ws.send(init)
  }

  onmessage = (msg) => {
    const res = getData(msg)
    this[res.type](res)
  }
  init = () => {
    Toast.success('连接成功')
  }

  loginBot = ({state, data, message}) => {
    this.setState({
      info: message
    })
    Toast.info(message)
    if (state === 0) {
      console.log(data.url)
      this.setState({
        isQrcode: true,
        qrcode: data.url
      })
    }
    if (state === 2) {
      this.setState({ 
        isQrcode: false,
        qrcode: ''
      }, () => {
        this.props.history.push('/')
      })
    }
  }

  handleLoginBot = () => {
    Toast.loading('请求登录中')
    const loginData = postData({
      type: 'loginBot',
      data: {},
      state: 0,
      toClient: 'wechat'
    })
    this.state.ws.send(loginData)
  }
  handleRefreshQrcode = () => {
    this.setState({
      qrcode: this.state.qrcode + moment().format('x')
    })
  }
  render() {
    const { info, isQrcode, qrcode } = this.state
    return (
      <div>
        <WhiteSpace/>
        <WingBlank>
          <WhiteSpace/>
          <WhiteSpace/>
          <Button type="primary" onClick={this.handleLoginBot}>login</Button>
          <WhiteSpace/>
          <p>{info}</p>
          <WhiteSpace/>
          {
            isQrcode && <Card>
            <Card.Header
                extra={<span className="iconfont iconrefresh" onClick={this.handleRefreshQrcode}></span>}
              />
              <Card.Body>
                <img className="qrcode" src={qrcode} alt="二维码"></img>
              </Card.Body>
            </Card>
          }
          <WhiteSpace/>
          <WhiteSpace/>
        </WingBlank>
      </div>
    );
  }
}
