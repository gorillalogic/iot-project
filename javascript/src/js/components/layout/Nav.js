import React from 'react'
import { IndexLink, Link } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/Appbar'

export default class Nav extends React.Component {
  render () {
    return (
      <MuiThemeProvider>
        <AppBar title='Internet of Things' />
      </MuiThemeProvider>
    )
  }
}
