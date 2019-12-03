
import { Toast, List, Card, WhiteSpace, WingBlank, Switch } from 'antd-mobile';
import React, {Component} from 'react';
import axios from 'axios'
import { getDataList, updateStatus } from '@/utils/api'
import './common.scss'

Toast.config({ mask: false })

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      selected: '',
      dataList: [],
      city: ''
    }
  }
  componentDidMount () {
    this.getData()
  }
  onSelect = (opt) => {
    const { value } = opt.props
    if (value === 'setting') {
      this.props.history.push('setting')
    }
    this.setState({
      visible: false,
      selected: opt.props.value
    });
  };
  handleVisibleChange = (visible) => {
    this.setState({
      visible,
    });
  };
  async getData () {
    const data = await getDataList({
      city: this.state.city
    })
    this.setState({
      dataList: data
    })
  }
  handleDelete (id) {
    axios.post('/deleteImages', {
      id
    }).then(res => {
      const { code, message } = res.data
      if (code === '0') {
        Toast.success(message)
      } else {
        Toast.info(message)
      }
      this.getData()
    })
  }
  handleChangeStatus = (val, item) => {
    const status = val ? '1' : '0'
    updateStatus(item.id, {
      status
    }).then(data => {
      Toast.success('修改成功')
      this.getData()
    })
  }
  render () {  
    const { dataList } = this.state
    return (
      <div className="container">
        {/* <SearchBar placeholder="Search" maxLength={8} /> */}
        <WhiteSpace />
        <WingBlank>
          {
            dataList.map((item) => (
              <Card style={{marginBottom: '15px'}} key={item.id}>
                <Card.Header
                  title={item.city}
                />
                <Card.Body>
                  <img style={{
                    width: '100%',
                  }} src={item.face_img} alt="xxx"/>
                  {item.title}
                </Card.Body>
                <Card.Footer content={
                  <List.Item
                    extra={
                      <Switch
                        checked={item.status === '1'}
                        onChange={(val) => this.handleChangeStatus(val, item)}
                      />}
                  >启动发送状态</List.Item>
                }>
                </Card.Footer>
              </Card>
            ))
          }
        </WingBlank>
      </div>
    )
  }
}
