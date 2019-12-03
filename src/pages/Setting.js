/*
 * @LastEditors: huangfengrui
 * @LastEditTime: 2019-12-02 16:16:56
 * @Author: huangfengrui
 * @Date: 2019-12-02 10:45:35
 * @Description: 
 */
import React, {Component} from 'react'

import { Button, Toast, WingBlank, WhiteSpace, Picker, List } from 'antd-mobile';
import { updateData, cityData } from '@/utils/api'

// Toast.config({ mask: false })

export default class Setting extends Component {
  // constructor (props) {
  //   super(props)
  // }
  state = {
    value: 'GZ',
    cityList: [],
    numList: [{
      value: '1',
      label: '10条'
    }, {
      value: '2',
      label: '20条'
    }, {
      value: '3',
      label: '30条'
    }, {
      value: '4',
      label: '40条'
    }, {
      value: '5',
      label: '50条'
    }],
    files: [],
    multiple: true,
    city: [],
    pageNum: ['1']
  };
  componentDidMount () {
    this.getRelation()
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
    const { cityList, city, numList, pageNum } = this.state
    return (
      <div>
        <WhiteSpace/>
        <WhiteSpace/>
        <WingBlank>
          <p>{city}</p>
          <Picker
            data={cityList}
            value={city}
            cols={1}
            onChange={this.onChangeCity}
          >
            <List.Item arrow="horizontal">站点</List.Item>
          </Picker>
          <WhiteSpace/>
          <WhiteSpace/>
          <Picker
            data={numList}
            value={pageNum}
            cols={1}
            onChange={this.onChangePageNum}
          >
            <List.Item arrow="horizontal">更新数量</List.Item>
          </Picker>
          <WhiteSpace/>
          <WhiteSpace/>
          <WhiteSpace/>
          <WhiteSpace/>
          <Button type="primary" onClick={this.onSubmit}>更新</Button>
        </WingBlank>
      </div>
    );
  }
}
