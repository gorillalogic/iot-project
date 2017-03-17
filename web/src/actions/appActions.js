export function getOpen (val) {
  return {
    type: 'GET_OPEN',
    payload: val
  }
}

export function setOpen (val) {
  return {
    type: 'SET_OPEN',
    payload: val
  }
}
