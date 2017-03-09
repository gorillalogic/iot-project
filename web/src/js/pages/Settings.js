import React from 'react'
import {connect} from 'react-redux'
import debounce from 'lodash/debounce';

import {fetchTemp, setTempMin, setTempMax, resetTempVal} from '../actions/tempActions'
import {fetchFan, setFanVal, resetFanVal} from '../actions/fanActions'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Toggle from 'material-ui/Toggle'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

@connect((store) => {
  return {
    temp: store.temp.temp,
    tempFetched: store.temp.fetched,
    fan: store.fan.fan,
    fanFetched: store.fan.fetched
  }
})

export default class Settings extends React.Component {
  constructor() {
    super();
    this.postTempMin = debounce(this.setTempMin, 1000)
    this.postTempMax = debounce(this.setTempMax, 1000)
  }

  componentWillMount() {
    this.props.dispatch(fetchTemp())
    this.props.dispatch(fetchFan())
  }

  handleTempMinChange (e) {
    const min = e.target.value
    this.setTempMin(min)
    this.postTempMin(min)
  }

  handleTempMaxChange (e) {
    const max = e.target.value
    this.setTempMax(max)
    this.postTempMax(max)
  }

  setTempMin (min) {
    this.props.dispatch(setTempMin(min))
  }

  setTempMax (max) {
    this.props.dispatch(setTempMax(max))
  }

  getTempMax (e) {
    const max = e.target.value
    return max
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
    const textStyle = {
      fontSize: '16px'
    }

    return (
      <div>
        <h2>Settings</h2>
        <form class='form-horizontal'>
          <div class='form-group'>
            <label class='col-sm-2 control-label'>Temperature</label>
            <div class='col-sm-3'>
              <p class='form-control-static' style={textStyle}>{this.props.temp.val}</p>
            </div>
          </div>
          <div class='form-group'>
            <label for='tempMin' class='col-sm-2 control-label'>Min threshold</label>
            <div class='col-sm-3'>
              <MuiThemeProvider>
                <TextField type='number' id='tempMin' value={this.props.temp.min} hintText='Min threshold' onChange={this.handleTempMinChange.bind(this)} />
              </MuiThemeProvider>
            </div>
          </div>
          <div class='form-group'>
            <label for='tempMax' class='col-sm-2 control-label'>Max threshold</label>
            <div class='col-sm-3'>
              <MuiThemeProvider>
                <TextField type='number' id='tempMax' value={this.props.temp.max} hintText='Max threshold' onChange={this.handleTempMaxChange.bind(this)} />
              </MuiThemeProvider>
            </div>
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
                <RaisedButton label='Reset' onClick={this.reset.bind(this)} />
              </MuiThemeProvider>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
