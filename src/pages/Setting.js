/*
 * @LastEditors: huangfengrui
 * @LastEditTime: 2019-12-02 16:16:56
 * @Author: huangfengrui
 * @Date: 2019-12-02 10:45:35
 * @Description: 
 */
import React, {Component} from 'react'

import { Button, NavBar, Icon, Toast, WingBlank, WhiteSpace, Picker, List } from 'antd-mobile';
import { updateData, cityData } from '@/utils/api'

// Toast.config({ mask: false })

export default class Setting extends Component {
  // constructor (props) {
  //   super(props)
  // }
  state = {
    value: 'GZ',
    cityList: [],
    files: [],
    multiple: true,
    city: []
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
      city: this.state.city[0]
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
  render() {
    // const { value, columns, files } = this.state;
    // const data = Object.keys(columns).map(item => ({
    //   value: item,
    //   label: columns[item]
    // }))
    const { cityList, city } = this.state
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.go(-1)}>
          Setting
        </NavBar>
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
          <WhiteSpace/>
          <WhiteSpace/>
          <Button type="primary" onClick={this.onSubmit}>更新</Button>
        </WingBlank>
        {/* <List renderHeader={() => '选择城市'}>
          {data.map(i => (
            <RadioItem key={i.value} checked={value === i.value} onChange={() => this.onChange(i.value)}>
              {i.label}
            </RadioItem>
          ))}
        </List>
        <List renderHeader={() => '上传图片'}>
          <ImagePicker
            files={files}
            onChange={this.onFileChange}
            onImageClick={(index, fs) => console.log(index, fs)}
            selectable={files.length < 4}
            multiple={this.state.multiple}
          />
        </List> */}
      </div>
    );
  }
}
