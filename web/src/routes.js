/*eslint-disable */
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import NotFoundPage from './containers/NotFoundPage.js'
import SettingsPage from './containers/SettingsPage'
import StatsPage from './containers/StatsPage'

export default (
  <Route>
    <Route path='/' component={App}>
      <IndexRoute component={SettingsPage} />
      <Route path='settings' component={SettingsPage} />
      <Route path='stats' component={StatsPage} />
      <Route path='*' component={NotFoundPage} />
    </Route>
  </Route>
)
/*eslint-enable */
