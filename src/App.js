import { HashRouter, Route, Link, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';

import './App.css';
import Home from './pages/Home'
// import CreateForm from './pages/CreateForm'
import Setting from './pages/Setting'


export default class App extends Component {
  state = {
    selectedTab: 'home',
    tabList: [{
      name: 'home',
      label: '首页',
      url: '/'
    }, {
      name: 'set',
      label: '设置',
      url: '/setting'
    }]
  }
  componentDidMount () {
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
  render() {
    const { tabList } = this.state
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/setting" component={Setting} />
        </Switch>
        <TabBar noRenderContent={false}>
          {
            tabList.map(item => (
              <TabBar.Item
                icon={
                  <Link to={item.url} className={`iconfont icon${item.name}`} style={{ fontSize: '22px' }}>
                  </Link>
                }
                selectedIcon={
                  <Link to={item.url} className={`iconfont icon${item.name}-active`} style={{ fontSize: '22px' }}></Link>
                }
                title={item.label}
                key={item.name}
                selected={this.state.selectedTab === item.name}
                onPress={() => {
                  this.setState({
                    selectedTab: item.name,
                  });
                }}
              ></TabBar.Item>
            ))
          }
        </TabBar>
      </HashRouter>
    );
  }
}
