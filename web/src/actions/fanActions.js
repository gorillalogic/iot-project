// How to use:
// import { fetchUserName } from '../userActions'
import axios from 'axios'
const Config = require('Config')

export function fetchFan () {
  return (dispatch) => {
    dispatch({type: 'FETCH_FAN'})
    axios.get(`${Config.serverUrl}/fan`)
      .then((response) => {
        dispatch({type: 'FETCH_FAN_FULLFILLED', payload: response.data})
      })
      .catch((err) => {
        dispatch({type: 'FETCH_FAN_REJECTED', payload: err})
      })
  }

  // return {
  //   type: 'FETCH_FAN_FULLFILLED',
  //   payload: {
  //     state: false
  //   }
  // }
}

export function setFanVal (val) {
  return {
    type: 'SET_FAN_VAL',
    payload: val
  }
}

export function setFanOverride (val) {
  return {
    type: 'SET_FAN_OVERRIDE',
    payload: val
  }
}

export function putFanVal (val) {
  return (dispatch) => {
    dispatch({type: 'PUT_FAN_VAL'})
    axios.put(`${Config.serverUrl}/fan`, {
      'state': val
    })
    .then((response) => {
      dispatch({type: 'PUT_FAN_VAL_FULLFILLED', payload: response.data})
      console.log('success', response)
    })
    .catch((err) => {
      dispatch({type: 'PUT_FAN_VAL_REJECTED', payload: err})
      console.log('error', err)
    })
  }
}

export function resetFanVal () {
  return {
    type: 'RESET_FAN_VAL',
    payload: null
  }
}
