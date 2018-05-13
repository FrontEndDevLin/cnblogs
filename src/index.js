import React from 'react';
import ReactDOM from 'react-dom';
import './layout/init.css';
import './layout/index.css';

import {BrowserRouter,Route}from 'react-router-dom';
import IndexComponent from './component/index';
import DetailComponent from './component/detail';
import EditCenterComponent from './component/edit-center';
import LoginComponent from './component/login';
import RegComponent from './component/register';

// import App from './App';
// import ReactRouter from './router';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<BrowserRouter>
            <div>
                <Route exact path="/" component={IndexComponent}></Route>
                <Route path="/index" component={IndexComponent}></Route>
                <Route path="/detail" component={DetailComponent}></Route>
                <Route path="/login" component={LoginComponent}></Route>
                <Route path="/register" component={RegComponent}></Route>
                <Route path="/edit-center" component={EditCenterComponent}></Route>
            </div>
        </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
