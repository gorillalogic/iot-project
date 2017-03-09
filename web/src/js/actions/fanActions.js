// How to use:
// import { fetchUserName } from '../userActions'
import axios from 'axios'
const Config = require('Config')

export function fetchFan () {
  return (dispatch) => {
    axios.get(`${Config.serverUrl}/fan`)
      .then((response) => {
        dispatch({type: 'FETCH_FAN_FULLFILLED', payload: response.data})
      })
      .catch((err) => {
        dispatch({type: 'FETCH_FAN_REJECTED', payload: err})
      })
  }
}

export function setFanVal (val) {
  // return (dispatch) => {
  //   axios.post(`${Config.serverUrl}/fan`, {val})
  //     .then((response) => {
  //       dispatch({type: 'SET_FAN_VAL', payload: response.data})
  //     })
  //     .catch((err) => {
  //       dispatch({type: 'SET_FAN_VAL_REJECTED', payload: err})
  //     })
  // }
  return {
    type: 'SET_FAN_VAL',
    payload: val
  }
}

export function resetFanVal () {
  return {
    type: 'RESET_FAN_VAL',
    payload: null
  }
}
