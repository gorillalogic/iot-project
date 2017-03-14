import { combineReducers } from 'redux'

import temp from './tempReducer'
import fan from './fanReducer'
import app from './appReducer'

export default combineReducers({
  app,
  temp,
  fan
})
