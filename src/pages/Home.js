
import { Toast, List, Card, WhiteSpace, WingBlank, Switch, Picker, SearchBar, Button, Tag } from 'antd-mobile';
import React, {Component} from 'react';
import axios from 'axios'
import { getDataList, updateStatus, cityData } from '@/utils/api'
import moment from 'moment'
import './common.scss'

Toast.config({ mask: false })

// 时间倒计时组件
class CountDown extends Component {
  constructor (props) {
    super(props)
    this.state = {
      time: props.time
    }
  }
  componentDidMount () {
    this.countDown(this.state.time)
  }
  countDown = () => {
    let { time } = this.state
    time--
    this.setState({
      time
    }, () => {
      if (time) {
        setTimeout(() => {
          this.countDown()
        }, 1000)
      }
    })
  }
  formatTime = (time) => {
    const t = moment.duration(time, 's')
    const hours = t.get('hours')
    const minutes = t.get('minutes')
    const seconds = t.get('seconds');
    return `${hours}时${minutes}分${seconds}秒`
  }
  render () {
    const { time } = this.state
    const { name, text } = this.props
    const value = time > 86400 ? text : this.formatTime(time)
    return <Tag className={name}>{value}</Tag>
  }
}

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
                      {
                        item.end_time ? <CountDown
                          text="快结束"
                          name="danger"
                          time={item.end_time}/> : ''
                      }
                      {
                        item.begin_time ? <CountDown
                          text="待开抢"
                          name="warning"
                          time={item.begin_time} /> : ''
                      }
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
