import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import Layout from './pages/Layout'
import Settings from './pages/Settings'
import Statistics from './pages/Statistics'

import store from './store'

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin()

const app = document.getElementById('app')

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/' component={Layout}>
        <IndexRoute component={Settings} />
        <Route path='settings' name='settings' component={Settings} />
        <Route path='statistics' name='statistics' component={Statistics} />
      </Route>
    </Router>
  </Provider>,
app)
