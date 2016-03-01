

const setRecoverableSchedule = (state, action) => {
  return {...state, ...{
    scheduleToRecover: action.recoverableSchedule
  }}
}

const deleteRecoverableSchedule = (state, action) => {
  return {...state, ...{
    scheduleToRecover: null
  }}
};


const setRecoverableSchedules = (state, action) => {
  return {...state, ...{
    recoverableSchedules: action.recoverableSchedules
  }}
}

const deleteRecoverableSchedules = (state, action) => {
  const { id } = action

  let newState = {...state}

  if (newState.recoverableSchedules[id]) {
    delete newState.recoverableSchedules[id]
  }

  return newState
};

export {
  setRecoverableSchedule,
  deleteRecoverableSchedule,

  setRecoverableSchedules,
  deleteRecoverableSchedules,
}
