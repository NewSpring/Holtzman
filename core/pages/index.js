import Global from "../blocks/global"
import Util from "./util"
// import NotFound from "./notFound"

const Routes = {
  component: Global,
  childRoutes: [].concat(
    Util.Routes
    // NotFound.Routes
  )
}

export {

  // combined export of app routes
  Routes

}
