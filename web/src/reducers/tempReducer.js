const defaultValues = {
  temp: {
    val: null,
    min: 20,
    max: 23,
    minError: '',
    maxError: '',
    history: []
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
    'SET_TEMP_VAL': () => {
      state = {
        ...state,
        temp: {...state.temp, val: action.payload}
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
    'SET_TEMP_MIN_ERROR': () => {
      state = {
        ...state,
        temp: {...state.temp, minError: action.payload}
      }
    },
    'SET_TEMP_MAX_ERROR': () => {
      state = {
        ...state,
        temp: {...state.temp, maxError: action.payload}
      }
    },
    'ADD_TEMP_HISTORY': () => {
      const history = [...state.temp.history]
      if (history.length > 7) {
        history.shift()
      }
      history.push(action.payload)
      state = {
        ...state,
        temp: {
          ...state.temp,
          history
        }
      }
    },
    'PUT_TEMP_THRESHOLD': () => {
      state = {...state, requesting: true}
    },
    'PUT_TEMP_THRESHOLD_REJECTED': () => {
      state = {...state, requesting: false, error: action.payload}
    },
    'PUT_TEMP_THRESHOLD_FULLFILLED': () => {
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
          max: defaultValues.temp.max,
          minError: '',
          maxError: ''
        },
        requesting: false,
        requested: false,
        error: null
      }
    }
  }

  actions[action.type] && actions[action.type]()

  return state
}
