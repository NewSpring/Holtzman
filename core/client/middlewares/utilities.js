// stored middlewares for use with other packages
const middlewares = []
import Error from "../../lib/error"

const addMiddleware = (...newWares) => {
  for (let middleware of newWares) { middlewares.push(middleware) }
}


export default {
  addMiddleware,
  middlewares
}
