
// stored state for use with other packages
const reducers = {};

const addReducer = obj => {
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const name in obj) {
    const handler = obj[name];

    if (reducers[name]) {
      throw new Error(
        "Reducer assigned",
        `reducers function ${name} is already registered`
      );
    }

    if (!handler || typeof (handler) !== "function") {
      throw new Error(
        "Reducer TypeError",
        `Reducer ${name} requires a function`
      );
    }

    reducers[name] = handler;
  }

  return obj;
};

const createReducer = (initialState, handlers) => (
  (state = initialState, action) => {
    // better than switch statement
    // eslint-disable-next-line no-prototype-builtins
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  }
);

// stored middlewares for use with other packages
const middlewares = [];

const addMiddleware = (...newWares) => {
  for (const middleware of newWares) { middlewares.push(middleware); }
};

// stored sagas for use with other packages
const sagas = [];

const addSaga = (...newSagas) => {
  for (const saga of newSagas) { sagas.push(() => saga); }
};


export {
  addMiddleware,
  middlewares,

  addReducer,
  createReducer,
  reducers,

  sagas,
  addSaga,
};
