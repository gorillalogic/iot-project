// How to use:
// import { fetchUserName } from '../userActions'
import axios from 'axios'
const Config = require('Config')

export function fetchTemp () {
  return (dispatch) => {
    axios.get(`${Config.serverUrl}/temp`)
      .then((response) => {
        dispatch({type: 'FETCH_TEMP_FULLFILLED', payload: response.data})
      })
      .catch((err) => {
        dispatch({type: 'FETCH_TEMP_REJECTED', payload: err})
      })
  }
}

export function setTempVal (val) {
  return {
    type: 'SET_TEMP_VAL',
    payload: val
  }
}

export function setTempMin (min) {
  return {
    type: 'SET_TEMP_MIN',
    payload: min
  }
}

export function setTempMax (max) {
  return {
    type: 'SET_TEMP_MAX',
    payload: max
  }
}

export function resetTempVal (max) {
  return {
    type: 'RESET_TEMP_VAL',
    payload: null
  }
}
