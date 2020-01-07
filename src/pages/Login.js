import React, { Component } from 'react'

import { List, InputItem, Switch, Stepper, Range, Button, Toast } from 'antd-mobile';
import { postData, getData } from '@/utils/common'
import { createForm } from 'rc-form';

const Item = List.Item;
// import moment from 'moment'

Toast.config({ mask: false, duration: 0 })

class Login extends Component {
  state = {
    ws: undefined,
    info: '',
    isQrcode: false,
    qrcode: ''
  }
  componentWillMount() {
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
    console.log(res)
    this[res.type](res)
  }
  init = () => {
    Toast.success('连接成功')
  }

  login = (res) => {
    Toast.success('token: ' + res['data']['token'])
  }
  onSubmit = () => {
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        const { loginName, loginPassword } = this.props.form.getFieldsValue()
        this.state.ws.send(postData({
          toClient: 'server',
          type: 'login',
          state: 0,
          data: {
            loginName,
            loginPassword
          }
        }))
      } else {
        alert('Validation failed');
      }
    });
  }
  onReset = () => {
    this.props.form.resetFields();
  }
  validateloginName = (rule, value, callback) => {
    if (value && value.length > 4) {
      callback();
    } else {
      callback(new Error('At least four characters for loginName'));
    }
  }
  render() {
    const { getFieldProps, getFieldError } = this.props.form;

    return (<form>
      <List
        renderHeader={() => 'Form Validation'}
        renderFooter={() => getFieldError('loginName') && getFieldError('loginName').join(',')}
      >
        <InputItem
          {...getFieldProps('loginName', {
            // initialValue: 'little ant',
            rules: [
              { required: true, message: 'Please input loginName' },
              { validator: this.validateloginName },
            ],
          })}
          clear
          error={!!getFieldError('loginName')}
          onErrorClick={() => {
            alert(getFieldError('loginName').join('、'));
          }}
          placeholder="please input loginName"
        >loginName</InputItem>
        <InputItem {...getFieldProps('loginPassword')} placeholder="please input password" type="password">
          Password
        </InputItem>
        <Item>
          <Button type="primary" size="small" inline onClick={this.onSubmit}>Submit</Button>
          <Button size="small" inline style={{ marginLeft: '2.5px' }} onClick={this.onReset}>Reset</Button>
        </Item>
      </List>
    </form>);
  }
}
export default createForm()(Login);
