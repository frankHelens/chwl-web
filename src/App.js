import {HashRouter, Route, Switch} from 'react-router-dom';
import React, { Component } from 'react';
import './App.css';
import Home from './pages/Home'
import CreateForm from './pages/CreateForm'


export default class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/createForm" component={CreateForm}/>
        </Switch>
      </HashRouter>
    );
  }
}

