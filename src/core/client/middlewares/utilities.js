// stored middlewares for use with other packages
const middlewares = []

const addMiddleware = (...newWares) => {
  for (let middleware of newWares) { middlewares.push(middleware) }
}

export default {
  addMiddleware,
  middlewares
}
