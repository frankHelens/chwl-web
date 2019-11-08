import React, {Component} from 'react'

import { Button, List, Radio, NavBar, Icon, ImagePicker, Toast } from 'antd-mobile';

import axios from 'axios'

const RadioItem = Radio.RadioItem;

Toast.config({ mask: false })

export default class CreateForms extends Component {
  // constructor (props) {
  //   super(props)
  // }
  state = {
    value: 'GZ',
    columns: {
      GZ: '广州',
      SZ: '深圳',
      ST: '汕头'
    },
    files: [],
    multiple: true
  };
  onFileChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
    });
  }
  onChange = (value) => {
    this.setState({
      value,
    });
  }
  onSubmit = () => {
    this.state.files.forEach(item => {
      let formData = new FormData();
      formData.append("file", item.file)
      formData.append("name", this.state.value)
      axios.post('/upload', formData).then(res => {
        const { code, message } = res.data
        if (code === '0') {
          Toast.success(message)
        } else {
          Toast.info(message)
        }
        this.props.history.go(-1)
      })
    })
  }
  render() {
    const { value, columns, files } = this.state;
    const data = Object.keys(columns).map(item => ({
      value: item,
      label: columns[item]
    }))
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.go(-1)}>
          添加图片
        </NavBar>
        <List renderHeader={() => '选择城市'}>
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
        </List>
        <Button type="primary" onClick={this.onSubmit}>提交</Button>
      </div>
    );
  }
}
