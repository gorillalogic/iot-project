const defaultValues = {
  temp: {
    val: null,
    min: 20,
    max: 23,
    timeStamp: null
  },
  fetching: false,
  fetched: false,
  error: null
}
export default function reducer (state = defaultValues, action) {
  const actions = {
    'FETCH_TEMP': () => {
      state = {...state, fetching: true}
    },
    'FETCH_TEMP_REJECTED': () => {
      state = {...state, fetching: false, error: action.payload}
    },
    'FETCH_TEMP_FULLFILLED': () => {
      state = {
        ...state,
        fetching: false,
        fetched: true,
        temp: {...state.temp, val: action.payload.val}
      }
    },
    'SET_TEMP_MIN': () => {
      state = {
        ...state,
        temp: {...state.temp, min: action.payload}
      }
    },
    'SET_TEMP_MAX': () => {
      state = {
        ...state,
        temp: {...state.temp, max: action.payload}
      }
    },
    'RESET_TEMP_VAL': () => {
      state = {
        ...state,
        temp: {...state.temp, min: defaultValues.temp.min, max: defaultValues.temp.max}
      }
    }
  }

  actions[action.type] && actions[action.type]()

  return state
}
