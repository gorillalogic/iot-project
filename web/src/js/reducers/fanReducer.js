const defaultValues = {
  fan: {
    val: false
  },
  requesting: false,
  requested: false,
  error: null
}
export default function reducer (state = defaultValues, action) {
  const actions = {
    'FETCH_FAN': () => {
      state = {...state, requesting: true}
    },
    'FETCH_FAN_REJECTED': () => {
      state = {...state, requesting: false, error: action.payload}
    },
    'FETCH_FAN_FULLFILLED': () => {
      state = {
        ...state,
        requesting: false,
        requested: true,
        fan: action.payload
      }
    },
    'SET_FAN_VAL': () => {
      state = {
        ...state,
        fan: {...state.fan, val: action.payload}
      }
    },
    'RESET_FAN_VAL': () => {
      state = {
        ...state,
        fan: {...state.fan, val: defaultValues.fan.val}
      }
    }
  }

  actions[action.type] && actions[action.type]()

  return state
}
