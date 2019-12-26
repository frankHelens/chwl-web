import React, { Component } from 'react'

import { Button, Toast, WingBlank, WhiteSpace } from 'antd-mobile';
import { updateData, cityData } from '@/utils/api'

export default class Setting extends Component {
  componentDidMount() {
    const login = {
      type: 'login'
    }
    const url = 'ws://localhost:8888/websocket'
    const client = new WebSocket(url)
    client.onopen = () => {
      console.log('WebSocket Client Connected');
      client.send(JSON.stringify(login))
    }
    client.onmessage = (message) => {
      console.log(message);
    };
  }
  getRelation = async () => {
    const data = await cityData()
    this.setState({
      cityList: [{
        label: '全部',
        value: ''
      }, ...data],
      city: ['']
    })
  }
  onFileChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files
    });
  }
  onChange = (value) => {
    this.setState({
      value,
    });
  }
  onSubmit = () => {
    Toast.loading('正在更新', 0)
    updateData({
      city: this.state.city[0],
      pageNum: this.state.pageNum[0]
    }).then(() => {
      Toast.hide()
      Toast.success('更新成功')
    })
  }
  onChangeCity = (value) => {
    this.setState({
      city: value
    })
  }
  onChangePageNum = (value) => {
    this.setState({
      pageNum: value
    })
  }
  render() {
    // const { value, columns, files } = this.state;
    // const data = Object.keys(columns).map(item => ({
    //   value: item,
    //   label: columns[item]
    // }))
    return (
      <div>
        <WhiteSpace />
        <WhiteSpace />
        <WingBlank>
          <WhiteSpace />
          <WhiteSpace />
          <WhiteSpace />
          <WhiteSpace />
          <Button type="primary" onClick={this.onSubmit}>更新</Button>
        </WingBlank>
      </div>
    );
  }
}
