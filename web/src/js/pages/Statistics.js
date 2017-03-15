import React from 'react'
import {connect} from 'react-redux'

import {fetchTemp} from '../actions/tempActions'
import {fetchFan} from '../actions/fanActions'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Toggle from 'material-ui/Toggle'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import Checkbox from 'material-ui/Checkbox'
import Divider from 'material-ui/Divider'
import {List, ListItem} from 'material-ui/List'
import Paper from 'material-ui/Paper';

@connect((store) => {
  return {
    temp: store.temp.temp,
    tempRequested: store.temp.requested
  }
})

export default class Settings extends React.Component {
  componentWillMount() {

  }

  render() {
    const spacerStyle = {
      marginTop: '40px'
    }

    return (
      <div>
        {/*
          <MuiThemeProvider>
            <RefreshIndicator left={0} top={-10} size={30} status='loading' />
          </MuiThemeProvider>
        */}
        <h2>Statistics</h2>
        <MuiThemeProvider>
          <Paper zDepth={2}>
            <List>
              <ListItem disabled={true} insetChildren={true} primaryText='Current Temperature: ' />
              <Divider />
              <ListItem  disabled={true} insetChildren={true} primaryText='Hourly Temperature: ' />
              <Divider />
              <ListItem disabled={true} insetChildren={true} primaryText='Monthly Temperature: ' />
              <Divider />
              <ListItem disabled={true} insetChildren={true} primaryText='Yearly Temperature: ' />
            </List>
          </Paper>
        </MuiThemeProvider>
        <div class='row' style={spacerStyle}>

        </div>
      </div>
    )
  }
}
