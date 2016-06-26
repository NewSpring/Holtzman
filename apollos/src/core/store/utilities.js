
// stored state for use with other packages
const reducers = {}

const addReducer = (obj) => {

  for (let name in obj) {
    let handler = obj[name]

    if (reducers[name]) {
      throw new Error(
        "Reducer assigned",
        `reducers function ${name} is already registered`
      )
    }

    if (!handler || typeof(handler) != "function") {
      throw new Error(
        "Reducer TypeError",
        `Reducer ${name} requires a function`
      )
    }

    reducers[name] = handler
  }

  return obj

}

const createReducer = (initialState, handlers) => {

  return (state = initialState, action) => {
    // better than switch statement
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }

}

// stored middlewares for use with other packages
const middlewares = []

const addMiddleware = (...newWares) => {
  for (let middleware of newWares) { middlewares.push(middleware) }
}

// stored sagas for use with other packages
const sagas = []

const addSaga = (...newSagas) => {
  for (let saga of newSagas) { sagas.push(() => saga) }
}




export default {
  addMiddleware,
  middlewares,

  addReducer,
  createReducer,
  reducers,

  sagas,
  addSaga,
}
