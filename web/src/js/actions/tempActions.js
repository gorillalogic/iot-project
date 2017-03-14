// How to use:
// import { fetchUserName } from '../userActions'
import axios from 'axios'
const Config = require('Config')

export function fetchTemp () {
  // return (dispatch) => {
  //   dispatch({type: 'FETCH_TEMP'})
  //   axios.get(`${Config.serverUrl}/temp`)
  //     .then((response) => {
  //       dispatch({type: 'FETCH_TEMP_FULLFILLED', payload: response.data})
  //     })
  //     .catch((err) => {
  //       dispatch({type: 'FETCH_TEMP_REJECTED', payload: err})
  //     })
  // }
  return {
    type: 'FETCH_TEMP_FULLFILLED',
    payload: {
      val: 22
    }
  }
}

export function setTemp (temp) {
  return {
    type: 'SET_TEMP',
    payload: temp
  }
}

export function setTempMin (min) {
  return {
    type: 'SET_TEMP_MIN',
    payload: min
  }
}

export function postTempMin (min) {
  return {
    type: 'POST_TEMP_MIN',
    payload: min
  }
}

export function setTempMax (max) {
  return {
    type: 'SET_TEMP_MAX',
    payload: max
  }
}

export function postTempMax (max) {
  return {
    type: 'POST_TEMP_MAX',
    payload: max
  }
}

export function resetTempVal (max) {
  return {
    type: 'RESET_TEMP_VAL',
    payload: null
  }
}
