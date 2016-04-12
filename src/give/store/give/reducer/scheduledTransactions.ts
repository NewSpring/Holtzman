import { assign } from "lodash";

const setRecoverableSchedule = (state: any, action: any): any => {
  return assign(state, { scheduleToRecover: action.recoverableSchedule });
};

const deleteRecoverableSchedule = (state: any, action: any): any => {
  return assign(state, { scheduleToRecover: null });
};

const setRecoverableSchedules = (state: any, action: any): any => {
  return assign(state, { recoverableSchedule: action.recoverableSchedule });
};

const deleteRecoverableSchedules = (state: any, action: any): any => {
  const { id } = action;

  let newState = assign(state);

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
}
