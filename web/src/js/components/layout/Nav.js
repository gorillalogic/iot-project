import React from 'react'
import {connect} from 'react-redux'
import {IndexLink, Link} from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import Avatar from 'material-ui/Avatar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import Menu from 'material-ui/svg-icons/navigation/menu'

import {getOpen, setOpen} from '../../actions/appActions'


@connect((store) => {
  return {
    open: store.app.open
  }
})
export default class Nav extends React.Component {
  constructor() {
    super()
  }

  componentWillMount() {
    this.props.dispatch(getOpen())
  }

  handleToggle () {
    const toggled = !this.props.open
    this.setOpen(toggled)
  }

  handleClose () {
    this.setOpen(false)
  }

  setOpen (val) {
    this.props.dispatch(setOpen(val))
  }

  render() {
    const avatarStyle = {
      marginTop: '10px'
    }

    const styles = {
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400
      }
    }

    return (
      <MuiThemeProvider>
        <AppBar
          title='Internet of Things'
          iconElementLeft={<IconButton onClick={this.handleToggle.bind(this)}><Menu /></IconButton>}
        >
          <Avatar src='https://pbs.twimg.com/profile_images/540934751180189696/BKN_X52u.png' style={avatarStyle} />
            <Drawer
              docked={false}
              width={200}
              open={this.props.open}
              onRequestChange={(open) => this.setOpen({open}).bind(this)}
            >
            <MenuItem onClick={this.handleClose.bind(this)}>
              <IndexLink to='/'>Settings</IndexLink>
            </MenuItem>
            <MenuItem onClick={this.handleClose.bind(this)}>
              <Link to='statistics'>Statistics</Link>
            </MenuItem>
          </Drawer>
        </AppBar>

      </MuiThemeProvider>
    )
  }
}
