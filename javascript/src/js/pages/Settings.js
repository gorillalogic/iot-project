import React from 'react'
import {connect} from 'react-redux'

import {fetchTemp, setTempMin, setTempMax, resetTempVal} from '../actions/tempActions'
import {fetchFan, setFanVal, resetFanVal} from '../actions/fanActions'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Toggle from 'material-ui/Toggle'
import RaisedButton from 'material-ui/RaisedButton'

@connect((store) => {
  return {
    temp: store.temp.temp,
    tempFetched: store.temp.fetched,
    fan: store.fan.fan,
    fanFetched: store.fan.fetched
  }
})
export default class Settings extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchTemp())
    this.props.dispatch(fetchFan())
  }

  setTempMin (e) {
    const min = e.target.value
    this.props.dispatch(setTempMin(min))
  }

  setTempMax (e) {
    const min = e.target.value
    this.props.dispatch(setTempMax(min))
  }

  setFanVal (e, isInputChecked) {
    const val = isInputChecked
    this.props.dispatch(setFanVal(val))
  }

  reset () {
    this.props.dispatch(resetTempVal())
    this.props.dispatch(resetFanVal())
  }

  render() {
    // const { query } = this.props.location
    // const { params } = this.props
    // const { article } = params
    // const { date, filter } = query
    //console.log('temp stuff', this.props)
    return (
      <div>
        <form class='form-horizontal'>
          <div class='form-group'>
            <label class='col-sm-2 control-label'>Temperature</label>
            <div class='col-sm-3'>
              <p class='form-control-static'>{this.props.temp.val}</p>
            </div>
          </div>
          <div class='form-group'>
            <label for='tempMin' class='col-sm-2 control-label'>Min threshold</label>
            <div class='col-sm-3'>
              <input type='number' class='form-control' id='tempMin' value={this.props.temp.min} placeholder="min threshold value" onChange={this.setTempMin.bind(this)} /></div>
          </div>
          <div class='form-group'>
            <label for='tempMax' class='col-sm-2 control-label'>Max threshold</label>
            <div class='col-sm-3'>
              <input type='number' class='form-control' id='tempMax' value={this.props.temp.max} placeholder="max threshold value" onChange={this.setTempMax.bind(this)} /></div>
            </div>
            <div class='form-group'>
              <label for='fan' class='col-sm-2 control-label'>Fan</label>
              <div class='col-sm-3'>
                <div class='checkbox'>
                  <MuiThemeProvider>
                    <Toggle toggled={this.props.fan.val} onToggle={this.setFanVal.bind(this)} />
                  </MuiThemeProvider>
                </div>
              </div>
            </div>
              <div class='form-group'>
                <div class='col-sm-offset-2 col-sm-3'>
                  <MuiThemeProvider>
                    <RaisedButton label="Reset" onClick={this.reset.bind(this)} />
                  </MuiThemeProvider>
              </div>
            </div>
        </form>
      </div>
    )
  }
}
