import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';

import { ChatWindow, VisitorForm, Login, Groupchat } from './components';

import { Provider } from 'react-redux';
import  store from  './stores';


import './index.scss'

class App extends React.Component {

    render() {
        return (
              <Router>
                  <div className="container-fluid">
                      <Switch>
                          <Route exact path="/" component={Login} />
                          <Route exact path="/login" component={Login} />
                          <Route exact path="/chatwindow" component={ChatWindow} />
                          <Route exact path="/chat" component={Groupchat} />
                      </Switch>
                  </div>
              </Router>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)
