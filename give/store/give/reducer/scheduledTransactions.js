
const setRecoverableSchedules = (state, action) => {
  return {...state, ...{
    recoverableSchedules: action.recoverableSchedules
  }}
}

const deleteRecoverableSchedule = (state, action) => {
  const { id } = action

  let newState = {...state}

  if (newState.recoverableSchedules[id]) {
    delete newState.recoverableSchedules[id]
  }

  return newState
};

export {
  setRecoverableSchedules,
  deleteRecoverableSchedule
}
