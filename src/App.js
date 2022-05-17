import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';

import { Homepage, Navbar } from './components';
import './App.css';

const App = () => (
  <div className="app">
    <div>
      <Navbar />
    </div>
    <div className="main">
      <Layout>
        <div className="routes">
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
          </Switch>
        </div>
      </Layout>
      
    </div>
  </div>
);

export default App;
