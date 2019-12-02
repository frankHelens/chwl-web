import {HashRouter, Route, Switch} from 'react-router-dom';
import React, { Component } from 'react';
import './App.css';
import Home from './pages/Home'
// import CreateForm from './pages/CreateForm'
import Setting from './pages/Setting'


export default class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/Setting" component={Setting}/>
        </Switch>
      </HashRouter>
    );
  }
}
