import React from 'react';
import ReactDOM from 'react-dom';
import './layout/init.css';
import './layout/index.css';
import { BrowserRouter, Route, Switch }from 'react-router-dom';
import IndexComponent from './page/index';
import LoginComponent from './page/login';
import RegComponent from './page/register';
import DetailComponent from './page/detail';
import EditCenterComponent from './page/edit-center';


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={ IndexComponent }></Route>
      <Route path="/index" component={IndexComponent}></Route>
      <Route path="/login" component={ LoginComponent }></Route>
      <Route path="/register" component={ RegComponent }></Route>
      <Route path="/detail" component={ DetailComponent }></Route>
      <Route path="/edit-center" component={ EditCenterComponent }></Route>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
