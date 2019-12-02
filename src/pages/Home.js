
import { Popover, NavBar, Toast, List, Card, Icon, SearchBar, WhiteSpace } from 'antd-mobile';
import React, {Component} from 'react';
import axios from 'axios'
import { getDataList } from '@/utils/api'
import plus from '../plus.svg'
import './common.scss'

const Item = Popover.Item;
const myImg = () => <img src={plus} className="am-icon am-icon-xs" alt="xxx" />;
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
  render () {  
    const { dataList } = this.state
    return (
      <div className="container">
        <NavBar
          mode="light"
          rightContent={
            <Popover mask
              overlayClassName="fortest"
              overlayStyle={{ color: 'currentColor' }}
              visible={this.state.visible}
              overlay={[
                (<Item key="4" value="setting" icon={myImg()} data-seed="logId">设置</Item>)
              ]}
              align={{
                overflow: { adjustY: 0, adjustX: 0 },
                offset: [-10, 0],
              }}
              onVisibleChange={this.handleVisibleChange}
              onSelect={this.onSelect}
            >
              <div style={{
                height: '100%',
                padding: '0 15px',
                marginRight: '-15px',
                display: 'flex',
                alignItems: 'center',
              }}
              >
                <Icon type="ellipsis" />
              </div>
            </Popover>
          }
        >CHWL
        </NavBar>
        <SearchBar placeholder="Search" maxLength={8} />
        <WhiteSpace />
        <List>
          {
            dataList.map((item) => (
              <Card key={item.id}>
                <Card.Header
                  title={item.city}
                  extra={
                    <Icon onClick={() => this.handleDelete(item.id)} color="#03a9f4" type="cross-circle"/>
                  }
                />
                <Card.Body>
                  <img style={{
                    width: '100%',
                  }} src={item.face_img} alt="xxx"/>
                  {item.title}
                </Card.Body>
              </Card>
            ))
          }
        </List>
      </div>
    )
  }
}
