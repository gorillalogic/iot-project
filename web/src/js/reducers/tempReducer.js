const defaultValues = {
  temp: {
    val: null,
    min: 20,
    max: 23
  },
  requesting: false,
  requested: false,
  error: null
}
export default function reducer (state = defaultValues, action) {
  const actions = {
    'FETCH_TEMP': () => {
      state = {...state, requesting: true}
    },
    'FETCH_TEMP_REJECTED': () => {
      state = {...state, requesting: false, error: action.payload}
    },
    'FETCH_TEMP_FULLFILLED': () => {
      state = {
        ...state,
        requesting: false,
        requested: true,
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
    'POST_TEMP_THRESHOLD': () => {
      state = {...state, requesting: true}
    },
    'POST_TEMP_THRESHOLD_REJECTED': () => {
      state = {...state, requesting: false, error: action.payload}
    },
    'POST_TEMP_THRESHOLD_FULLFILLED': () => {
      state = {
        ...state,
        requesting: false,
        requested: true
      }
    },
    'RESET_TEMP_VAL': () => {
      state = {
        ...state,
        temp: {
          ...state.temp,
          min: defaultValues.temp.min,
          max: defaultValues.temp.max
        }
      }
    }
  }

  actions[action.type] && actions[action.type]()

  return state
}
