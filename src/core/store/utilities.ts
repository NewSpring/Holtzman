
export type Action = any;
export interface State extends Object {};
export type Reducer = (state: State, action: Action) => State;
export type Middleware = {};
export type Saga = {};

// stored state for use with other packages
const reducers: { [key: string]: Function } = {};

const addReducer = (obj: { [key: string]: Function }): { [key: string]: Function } => {

  for (let name in obj) {
    let handler = obj[name];

    if (reducers[name]) {
      throw new Meteor.Error(
        "Reducer assigned",
        `reducers function ${name} is already registered`
      );
    }

    if (!handler || typeof(handler) != "function") {
      throw new Meteor.Error(
        "Reducer TypeError",
        `Reducer ${name} requires a function`
      );
    }

    reducers[name] = handler;
  }

  return obj;
};

const createReducer = (initialState: State, handlers: { [key: string]: (State, Action) => State }): Reducer => {

  return (state = initialState, action: Action) => {
    // better than switch statement
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  }
};

// stored middlewares for use with other packages
const middlewares: Array<Middleware> = [];

const addMiddleware = (...newWares: Array<Middleware>) => {
  for (let middleware of newWares) {
    middlewares.push(middleware);
  }
};

// stored sagas for use with other packages
const sagas: Array<Saga> = [];

const addSaga = (...newSagas: Array<Saga>) => {
  for (let saga of newSagas) {
    sagas.push(() => saga);
  }
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
