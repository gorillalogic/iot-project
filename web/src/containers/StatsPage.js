import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import globalStyles from '../styles'

export default class SettingsPage extends React.Component {
  constructor () {
    super()
  }

  render () {

    return (
      <div>
        <h3 style={globalStyles.navigation}>Statistics</h3>

        <div className='row'>
          <div className='col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md m-b-15'>
            <p> Work in pogress</p>
          </div>
        </div>
      </div>
    )
  }
}
