

// stored state for use with other packages
let routes = []

const storeRoutes = (route) => { routes = routes.concat(route); return route }
const getRoutes = () => { return routes }

export default {
  storeRoutes,
  getRoutes
}
