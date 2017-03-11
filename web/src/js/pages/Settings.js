import React from 'react'
import {connect} from 'react-redux'
import debounce from 'lodash/debounce';

import {fetchTemp, setTemp, setTempMin, setTempMax, resetTempVal} from '../actions/tempActions'
import {fetchFan, setFanVal, getFanOverride, setFanOverride, resetFanVal} from '../actions/fanActions'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Toggle from 'material-ui/Toggle'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import Checkbox from 'material-ui/Checkbox'
import Divider from 'material-ui/Divider'

// MQTT provisional code for Demo
const mqtt = require('mqtt')
const Config = require('Config')
const client = mqtt.connect(Config.iotUrl)
// End of MQTT provisional code for Demo

@connect((store) => {
  return {
    temp: store.temp.temp,
    tempRequested: store.temp.requested,
    fan: store.fan.fan,
    fanRequested: store.fan.requested
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

    // MQTT provisional code for Demo
    const that = this
    client.on('connect', () => {
      client.subscribe('temp')
      setInterval(() => {
        const changingTemp = Math.floor(Math.random() * (17 - 27)) + 27
        client.publish('temp', changingTemp)
      }, 5000);
    })
    client.on('message', (topic, message) => {
      if (topic === 'temp' && message) {
        const val = parseInt(message.toString())
        that.props.dispatch(setTemp(val))
        that.validateTresholds()
      }
      //client.end()
    })
    // End of MQTT provisional code for Demo
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

  setFanOverride (e, isInputChecked) {
    const val = isInputChecked
    this.props.dispatch(setFanOverride(val))
  }

  validateTresholds() {
    if (!this.props.fan.override) {
      if (this.props.temp.val > this.props.temp.max) {
        this.props.dispatch(setFanVal(true))
      } else if (this.props.temp.val < this.props.temp.min) {
        this.props.dispatch(setFanVal(false))
      }
    }
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
    const textStyle = {
      fontSize: '16px'
    }

    const helperClass = `form-control-static ${
      this.props.temp.val > this.props.temp.max ? 'bg-danger' :
      this.props.temp.val < this.props.temp.min ? 'bg-info' :
    ''}`

    const checkboxStyle = {
      paddingTop: '4px'
    }
    return (
      <div>
        {/*
          <MuiThemeProvider>
            <RefreshIndicator left={0} top={-10} size={30} status='loading' />
          </MuiThemeProvider>
        */}
        <h2>Settings</h2>
        <form class='form-horizontal'>
          <div class='form-group'>
            <label class='col-sm-2 control-label'>Temperature</label>
            <div class='col-sm-2'>
              <p class={helperClass} style={textStyle}>{this.props.temp.val}</p>
            </div>
          </div>
          <div class='form-group'>
            <label for='tempMin' class='col-sm-2 control-label'>Min threshold</label>
            <div class='col-sm-2'>
              <MuiThemeProvider>
                <TextField type='number' id='tempMin' value={this.props.temp.min} hintText='Min threshold' onChange={this.handleTempMinChange.bind(this)} />
              </MuiThemeProvider>
            </div>
          </div>
          <div class='form-group'>
            <label for='tempMax' class='col-sm-2 control-label'>Max threshold</label>
            <div class='col-sm-2'>
              <MuiThemeProvider>
                <TextField type='number' id='tempMax' value={this.props.temp.max} hintText='Max threshold' onChange={this.handleTempMaxChange.bind(this)} />
              </MuiThemeProvider>
            </div>
          </div>
          <div class='form-group'>
            <div class='col-sm-6'>
              <MuiThemeProvider>
                <Divider />
              </MuiThemeProvider>
            </div>
          </div>
          <div class='form-group'>
            <label for='fan' class='col-sm-2 control-label'>Fan</label>
            <div class='col-sm-1'>
              <div class='checkbox'>
                <MuiThemeProvider>
                  <Toggle toggled={this.props.fan.val} onToggle={this.setFanVal.bind(this)} />
                </MuiThemeProvider>
              </div>
            </div>
          </div>
          <div class='form-group'>
            <label for='tempMax' class='col-sm-2 control-label'>Override thresholds</label>
            <div class='col-sm-2'>
              <MuiThemeProvider>
                <Checkbox onCheck={this.setFanOverride.bind(this)} checked={this.props.fan.override} style={checkboxStyle} />
              </MuiThemeProvider>
            </div>
          </div>
          <div class='form-group'>
            <div class='col-sm-6'>
              <MuiThemeProvider>
                <Divider />
              </MuiThemeProvider>
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
