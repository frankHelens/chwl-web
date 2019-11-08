import React, {Component} from 'react'

import { List, Radio, NavBar, Icon } from 'antd-mobile';

const RadioItem = Radio.RadioItem;

export default class CreateForms extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    value: 'GZ',
    columns: {
      GZ: '广州',
      SZ: '深圳',
      ST: '汕头'
    }
  };
  onChange = (value) => {
    this.setState({
      value,
    });
  }
  render() {
    const { value, columns } = this.state;
    const data = Object.keys(columns).map(item => ({
      value: item,
      label: columns[item]
    }))
    return (<div>
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
    </div>);
  }
}
