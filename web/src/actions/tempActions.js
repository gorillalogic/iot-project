// How to use:
// import { fetchUserName } from '../userActions'
import axios from 'axios'
const Config = require('Config')

export function fetchTemp (name) {
  return (dispatch) => {
    dispatch({type: 'FETCH_TEMP'})
    axios.get(`${Config.serverUrl}/thermo/${name}`)
      .then((response) => {
        dispatch({type: 'FETCH_TEMP_FULLFILLED', payload: response.data})
      })
      .catch((err) => {
        dispatch({type: 'FETCH_TEMP_REJECTED', payload: err})
      })
  }

  // return {
  //   type: 'FETCH_TEMP_FULLFILLED',
  //   payload: {
  //     val: 22
  //   }
  // }
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

export function setTempMinError (min) {
  return {
    type: 'SET_TEMP_MIN_ERROR',
    payload: min
  }
}

export function putTempMin (min, name) {
  // return (dispatch) => {
  //   axios.put(`${Config.serverUrl}/thermo/${name}`, {
  //     'min': min
  //   })
  //   .then((response) => {
  //      dispatch({type: 'POST_TEMP_MIN', payload: min)
  //   })
  //   .catch((err) => {
  //
  //   })
  // }

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

export function setTempMaxError (max) {
  return {
    type: 'SET_TEMP_MAX_ERROR',
    payload: max
  }
}

export function putTempMax (max, name) {
  // return (dispatch) => {
  //   axios.put(`${Config.serverUrl}/thermo/${name}`, {
  //     'max': max
  //   })
  //   .then((response) => {
  //      dispatch({type: 'POST_TEMP_MAX', payload: max)
  //   })
  //   .catch((err) => {
  //
  //   })
  // }
  return {
    type: 'POST_TEMP_MAX',
    payload: max
  }
}

export function resetTempVal () {
  return {
    type: 'RESET_TEMP_VAL',
    payload: null
  }
}

export function addTempHistory (val) {
  return {
    type: 'ADD_TEMP_HISTORY',
    payload: val
  }
}
