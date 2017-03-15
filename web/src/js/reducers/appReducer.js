const defaultValues = {
  open: false
}
export default function reducer (state = defaultValues, action) {
  const actions = {
    'SET_OPEN': () => {
      state = {...state, open: action.payload}
    }
  }

  actions[action.type] && actions[action.type]()

  return state
}
