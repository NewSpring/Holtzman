

const savedAccount = (state, action) => {

  if (!action.savedAccount) {
    return state
  }

  return { ...state, ...{
    savedAccount: action.savedAccount
  } }
}

export default {
  savedAccount
}
