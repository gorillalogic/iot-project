import React from 'react'
import { IndexLink, Link } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import Avatar from 'material-ui/Avatar'

export default class Nav extends React.Component {
  render () {
    const avatarStyle = {
      marginTop: '10px'
    };
    return (
      <MuiThemeProvider>
        <AppBar title='Internet of Things'>
          <Avatar src='https://pbs.twimg.com/profile_images/540934751180189696/BKN_X52u.png' style={avatarStyle} />
        </AppBar>
      </MuiThemeProvider>
    )
  }
}
