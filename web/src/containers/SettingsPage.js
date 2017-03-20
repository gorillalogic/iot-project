/*eslint-disable */
import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import debounce from 'lodash/debounce'
import {cyan600, pink600, purple600, orange600, yellow700} from 'material-ui/styles/colors'
import Assessment from 'material-ui/svg-icons/action/assessment'
import Face from 'material-ui/svg-icons/action/face'
import ThumbUp from 'material-ui/svg-icons/action/thumb-up'
import Toys from 'material-ui/svg-icons/hardware/toys'
import Nature from 'material-ui/svg-icons/image/nature'
import ACUnit from 'material-ui/svg-icons/places/ac-unit'
import Whatshot from 'material-ui/svg-icons/social/whatshot'
import ShoppingCart from 'material-ui/svg-icons/action/shopping-cart'
import Warning from 'material-ui/svg-icons/alert/warning'
import InfoBox from '../components/dashboard/InfoBox'
import RealTimeStats from '../components/dashboard/RealTimeStats'
import globalStyles from '../styles'

import RaisedButton from 'material-ui/RaisedButton'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import Toggle from 'material-ui/Toggle'
import Checkbox from 'material-ui/Checkbox'
import DatePicker from 'material-ui/DatePicker'
import {grey400} from 'material-ui/styles/colors'
import Divider from 'material-ui/Divider'
import PageBase from '../components/PageBase'

import Data from '../data'

import {fetchTemp, setTempVal, setTempMin, setTempMax,
  setTempMinError, setTempMaxError, addTempHistory, resetTempVal} from '../actions/tempActions'
import {fetchFan, setFanVal, getFanOverride, setFanOverride, resetFanVal} from '../actions/fanActions'

@connect((store) => {
  return {
    temp: store.temp.temp,
    tempRequested: store.temp.requested,
    fan: store.fan.fan,
    fanRequested: store.fan.requested
  }
})

export default class SettingsPage extends React.Component {
  constructor () {
    super()
    this.postTempMin = debounce(this.setTempMin, 600)
    this.postTempMax = debounce(this.setTempMax, 600)
  }

  componentWillMount () {
    this.props.dispatch(fetchTemp())
    this.props.dispatch(fetchFan())

    setInterval(() => {
      const changingTemp = Math.floor(Math.random() * (17 - 27)) + 27
      this.props.dispatch(setTempVal(changingTemp))
      this.handleFan(changingTemp)
      this.props.dispatch(addTempHistory({'pv': changingTemp}))
    }, 10000);
  }

  handleTempMinChange (e) {
    const min = e.target.value
    this.setTempMin(min)

    if (this.validateTresholds({min})) {
      this.postTempMin(min)
    }
  }

  handleTempMaxChange (e) {
    const max = e.target.value
    this.setTempMax(max)

    if (this.validateTresholds({max})) {
      this.postTempMax(max)
    }
  }

  setTempMin (min) {
    this.props.dispatch(setTempMin(min))
    this.validateTresholds()
  }

  setTempMax (max) {
    this.props.dispatch(setTempMax(max))
    this.validateTresholds()
  }

  handleFanToggle (e, isInputChecked) {
    const val = !this.props.fan.val
    this.setFanVal(val)
  }

  setFanVal (val) {
    this.props.dispatch(setFanVal(val))
  }

  handleFanOverride (e, isInputChecked) {
    const val = !this.props.fan.override
    this.setFanOverride(val)
  }

  setFanOverride (val) {
    this.props.dispatch(setFanOverride(val))
  }

  handleFan () {
    if (!this.props.fan.override) {
      if (this.props.temp.val > this.props.temp.max) {
        this.props.dispatch(setFanVal(true))
      } else if (this.props.temp.val < this.props.temp.max) {
        this.props.dispatch(setFanVal(false))
      }
    }
  }

  validateTresholds (threshold = {}) {
    let valid = true
    const tempMax = threshold.max ? parseInt(threshold.max) : parseInt(this.props.temp.max)
    const tempMin = threshold.min ? parseInt(threshold.min) : parseInt(this.props.temp.min)

    if (isNaN(tempMin) || isNaN(tempMax)) {
      if (isNaN(tempMin)) {
        this.props.dispatch(setTempMinError('Invalid value'))
      } else if (tempMin === '') {
        this.props.dispatch(setTempMinError(''))
      }
      if (isNaN(tempMax)) {
        this.props.dispatch(setTempMaxError('Invalid value'))
      } else if (tempMin === '') {
        this.props.dispatch(setTempMaxError(''))
      }
      valid = false
    } else {
      if (tempMax > 30) {
        this.props.dispatch(setTempMaxError('The value is too high'))
        valid = false
      } else {
        this.props.dispatch(setTempMaxError(''))
      }
      if (tempMin < 0) {
        this.props.dispatch(setTempMinError('The value is too low'))
        valid = false
      } else {
        this.props.dispatch(setTempMinError(''))
      }
      if (valid && (tempMin > tempMax)) {
        this.props.dispatch(setTempMinError('The min value should be lower than the max (duh!)'))
        this.props.dispatch(setTempMaxError('The max value should be higher than the min (duh!)'))
        valid = false
      }
    }

    return valid
  }

  reset () {
    this.props.dispatch(resetTempVal())
    this.props.dispatch(resetFanVal())
  }

  render () {
    const styles = {
      toggleDiv: {
        maxWidth: 300,
        marginTop: 40,
        marginBottom: 5
      },
      toggleLabel: {
        //color: grey400,
        //fontWeight: 100
      },
      buttons: {
        marginTop: 30,
        float: 'right'
      },
      checkbox: {
        marginBottom: 16,
      },
      saveButton: {
        marginLeft: 5
      }
    }

    return (
      <div>
        <h3 style={globalStyles.navigation}>Settings</h3>

        <div className='row'>
          <div className='col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15'>
            <InfoBox Icon={this.props.temp.val > this.props.temp.max ? Warning : Nature}
              color={this.props.temp.val > this.props.temp.max ? yellow700 : pink600}
              title='Temperature'
              value={this.props.temp.val}
            />
          </div>

          <div className='col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15'>
            <InfoBox Icon={Toys}
              color={cyan600}
              title='Fan'
              spinClass={this.props.fan.val ? 'fa fa-spin' : ''}
              value={
                <Toggle
                  label={this.props.fan.val ? 'On' : 'Off'}
                  labelStyle={styles.toggleLabel}
                  toggled={this.props.fan.val}
                  onToggle={this.handleFanToggle.bind(this)}
                />
              }
            />
          </div>

          <div className='col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15'>
            <InfoBox Icon={ACUnit}
              color={purple600}
              title='Min. Threshold'
              value={this.props.temp.min}
            />
          </div>

          <div className='col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15'>

            <InfoBox Icon={Whatshot}
              color={orange600}
              title='Max. Threshold'
              value={this.props.temp.max}
            />

          </div>
        </div>

        <div className='row'>
          <div className='col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md m-b-15'>
            <PageBase title="Change Settings"
                      navigation="">
              <form>
                <TextField
                  hintText="Min. threshold"
                  floatingLabelText="Min. Threshold"
                  type='number'
                  value={this.props.temp.min}
                  errorText={this.props.temp.minError}
                  onChange={this.handleTempMinChange.bind(this)}
                  fullWidth={true}
                />
                <TextField
                  hintText="Max. threshold"
                  floatingLabelText="Max. Threshold"
                  type='number'
                  value={this.props.temp.max}
                  errorText={this.props.temp.maxError}
                  onChange={this.handleTempMaxChange.bind(this)}
                  fullWidth={true}
                />
                <div style={styles.toggleDiv}>
                  <Toggle
                    label="Override thresholds (manual fan)"
                    labelStyle={styles.toggleLabel}
                    onToggle={this.handleFanOverride.bind(this)}
                    toggled={this.props.fan.override}
                  />
                </div>

                <Divider />

                <RaisedButton label="Reset"
                              style={styles.buttons}
                              onTouchTap={this.reset.bind(this)}
                              primary={true}/>
              </form>
            </PageBase>
          </div>

          <div className='col-xs-12 col-sm-6 col-md-6 col-lg-6 m-b-15'>
            <PageBase>
              <RealTimeStats data={this.props.temp.history} />
            </PageBase>
          </div>
        </div>
      </div>
    )
  }
}
/*eslint-enable */
