

const setRecoverableSchedule = (state, action) => (
  { ...state,
    ...{
      scheduleToRecover: action.recoverableSchedule,
    },
  }
);

const deleteRecoverableSchedule = state => (
  { ...state,
    ...{
      scheduleToRecover: null,
    },
  }
);


const setRecoverableSchedules = (state, action) => (
  { ...state,
    ...{
      recoverableSchedules: action.recoverableSchedules,
    },
  }
);

const deleteRecoverableSchedules = (state, action) => {
  const { id } = action;

  const newState = { ...state };

  if (newState.recoverableSchedules[id]) {
    delete newState.recoverableSchedules[id];
  }

  return newState;
};

export {
  setRecoverableSchedule,
  deleteRecoverableSchedule,

  setRecoverableSchedules,
  deleteRecoverableSchedules,
};
