import {HashRouter, Route, Switch, Link} from 'react-router-dom';
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
      label: '首页'
    }, {
      name: 'set',
      label: '设置'
    }]
  }
  render() {
    const { tabList } = this.state
    return (
      <div>
        {/* <HashRouter>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/Setting" component={Setting}/>
          </Switch>
          </HashRouter> */}
        <TabBar>
          {
            tabList.map(item => (
              <TabBar.Item
                icon={                    
                  <span className={`iconfont icon${item.name}`} style={{fontSize: '22px'}}>
                  </span>
                }
                selectedIcon={
                  <span className={`iconfont icon${item.name}-active`} style={{fontSize: '22px'}}></span>
                }
                title={item.label}
                key={item.name}
                selected={this.state.selectedTab === item.name}
                onPress={() => {
                  this.setState({
                    selectedTab: item.name,
                  });
                }}
              >
              {
                item.name === 'home' ?  <Home/> : <Setting/>
              }
              </TabBar.Item>
            ))
          }
          </TabBar>
      </div>
    );
  }
}
