
import { Popover, NavBar, Toast, Tabs, List, Card, Icon } from 'antd-mobile';
import React, {Component} from 'react';
import axios from 'axios'
import plus from '../plus.svg'


const Item = Popover.Item;

const myImg = () => <img src={plus} className="am-icon am-icon-xs" alt="" />;

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: {
        SZ: '深圳',
        GZ: '广州',
        ST: '汕头'
      },
      tabList: [],
      visible: false,
      selected: '',
    }
  }
  componentDidMount () {
    this.getData()
  }
  onSelect = (opt) => {
    const { value } = opt.props
    if (value === 'createImage') {
      // console.log(HashRouter, Route)
      this.props.history.push('createForm')
    }
    this.setState({
      visible: false,
      selected: opt.props.value,
    });
  };
  handleVisibleChange = (visible) => {
    this.setState({
      visible,
    });
  };
  getData () {
    axios.get('/getImageList').then(res => {
      const data = res.data
      this.setState({
        tabList: Object.keys(data).map((item, i) => ({
          title: this.state.columns[item],
          sub: i,
          subList: data[item]
        }))
      })
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
    return (
      <div>
        <NavBar
          mode="light"
          rightContent={
            <Popover mask
              overlayClassName="fortest"
              overlayStyle={{ color: 'currentColor' }}
              visible={this.state.visible}
              overlay={[
                (<Item key="4" value="createImage" icon={myImg()} data-seed="logId">添加图片</Item>)
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
        <Tabs
          tabs={this.state.tabList}
          initialPage={0}
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}>
          {
            this.state.tabList.map(item => (
              <List key={item.sub}>
                {
                  item.subList.map((subItem) => (
                    <Card key={subItem.id}>
                      <Card.Header
                        title={subItem.id}
                        extra={
                          <Icon onClick={() => this.handleDelete(subItem.id)} color="#03a9f4" type="cross-circle"/>
                        }
                      />
                      <Card.Body>
                        <img style={{
                          width: '100%',
                          height: '200px'
                        }} src={subItem.url}/>
                      </Card.Body>
                    </Card>
                  ))
                }
              </List>
            ))
          }
        </Tabs>
      </div>
    )
  }
}
