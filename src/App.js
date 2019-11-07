// import { Drawer, List, NavBar, Icon } from 'antd-mobile';
import { NavBar, Icon, Tabs, List } from 'antd-mobile';
import React from 'react';
import './App.css';

const tabList = [
  { title: '广州', sub: '1' },
  { title: '深圳', sub: '2' },
  { title: '汕头', sub: '3' },
];

const Item = List.Item;
const Brief = Item.Brief;

function App() {
  return (
    <div className="App">
      <NavBar
        mode="light"
        rightContent={[
          <Icon key="1" type="ellipsis" />,
        ]}
      >NavBar</NavBar>
      <Tabs
        tabs={tabList}
        initialPage={1}
        onChange={(tab, index) => { console.log('onChange', index, tab); }}
        onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}>
        <List>
          <Item extra={'extra content'} thumb={'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573144056268&di=cc99499e16f65818f4da38af53fb83d2&imgtype=0&src=http%3A%2F%2Fy3.ifengimg.com%2Fa%2F2016_03%2F6154e935f8a0fc6.jpg'}>
          </Item>
        </List>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
          Content of second tab
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
          Content of third tab
        </div>
      </Tabs>
    </div>
  );
}

export default App;
