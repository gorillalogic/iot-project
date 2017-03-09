const defaultValues = {
  fan: {
    val: false
  },
  fetching: false,
  fetched: false,
  error: null
}
export default function reducer (state = defaultValues, action) {
  const actions = {
    'FETCH_FAN': () => {
      state = {...state, fetching: true}
    },
    'FETCH_FAN_REJECTED': () => {
      state = {...state, fetching: false, error: action.payload}
    },
    'FETCH_FAN_FULLFILLED': () => {
      state = {
        ...state,
        fetching: false,
        fetched: true,
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
