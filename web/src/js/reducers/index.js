import { combineReducers } from 'redux'

import temp from './tempReducer'
import fan from './fanReducer'

export default combineReducers({
  temp,
  fan
})
