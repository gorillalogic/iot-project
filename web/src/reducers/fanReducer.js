const defaultValues = {
  fan: {
    val: false,
    override: false
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
        fan: {
          ...state.fan,
          val: action.payload.val
        }
      }
    },
    'SET_FAN_VAL': () => {
      state = {
        ...state,
        fan: {
          ...state.fan,
          val: action.payload
        }
      }
    },
    'SET_FAN_OVERRIDE': () => {
      state = {
        ...state,
        fan: {
          ...state.fan,
          override: action.payload
        }
      }
    },
    'RESET_FAN_VAL': () => {
      state = {
        ...state,
        fan: {
          ...state.fan,
          val: defaultValues.fan.val,
          override: defaultValues.fan.override
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
