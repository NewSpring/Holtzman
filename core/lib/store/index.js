

// stored state for use with other packages
let routes = []
import Error from "../error"

const storeRoutes = (route) => { routes = routes.concat(route); return route }
const getRoutes = () => { return routes }

export default {
  storeRoutes,
  getRoutes
}
