
import { Toast, List, Card, WhiteSpace, WingBlank, Switch, Picker, SearchBar, Button, Tag } from 'antd-mobile';
import React, {Component} from 'react';
import axios from 'axios'
import { getDataList, updateStatus, cityData } from '@/utils/api'
import './common.scss'

Toast.config({ mask: false })

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      selected: '',
      dataList: [],
      cityList: [],
      city: [],
      searchValue: ''
    }
  }
  componentDidMount () {
    this.getRelation()
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
    const { city, searchValue } = this.state
    const data = await getDataList({
      city: city[0],
      value: searchValue
    })
    this.setState({
      dataList: data
    })
  }
  getRelation = async () => {
    const data = await cityData()
    this.setState({
      cityList: [{
        label: '全部',
        value: ''
      }, ...data],
      city: ['']
    }, () => {
      this.getData()
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
  onChangeCity = (value) => {
    this.setState({
      city: value
    }, () => {
      this.getData()
    })
  }
  // 搜索
  onSearch = (value) => {
    this.setState({
      searchValue: value
    }, () => {
      this.getData()
    })
  }
  render () {  
    const { cityList, city, dataList } = this.state
    console.log(dataList)
    return (
      <div className="container">
        <div className="tool-bar">
          <Picker
            data={cityList}
            value={city}
            cols={1}
            onChange={this.onChangeCity}>
            <List.Item arrow="horizontal">站点</List.Item>
          </Picker>
          <SearchBar placeholder="Search" maxLength={8} onSubmit={this.onSearch}/>
        </div>
        <WhiteSpace />
        <WingBlank>
          {
            dataList.length ? dataList.map((item) => (
              <Card style={{marginBottom: '15px'}} key={item.id}>
                <Card.Header
                  title={item.city}
                  extra={(
                    <>
                      {item.begin_time && <Tag className="warning">待开抢</Tag>}
                      {item.end_time && <Tag className="danger">快结束</Tag>}
                    </>
                    )}
                />
                <Card.Body>
                  <img style={{
                    width: '100%',
                  }} src={item.face_img} alt="xxx"/>
                  {item.title}
                </Card.Body>
                <Card.Footer content={
                  <div>
                    <List.Item
                      extra={
                        <Switch
                          checked={item.status === '1'}
                          onChange={(val) => this.handleChangeStatus(val, item)}
                        />}
                    >启动发送状态</List.Item>
                    <div style={{textAlign: 'right'}}>
                      <Button size="small" inline type='primary'
                      onClick={() => window.location.href = item.origin_image}>查看图片</Button>
                    </div>
                  </div>
                }>
                </Card.Footer>
              </Card>
            )) : <p>暂无数据</p>
          }
        </WingBlank>
      </div>
    )
  }
}
