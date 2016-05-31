
import Articles from "./articles"
import Devotions from "./devotions"
import Discover from "./discover"
import Home from "./home"
import Music from "./music"
import Series from "./series"
import Stories from "./stories"

const Routes = [
  // { path: "/sections", component: Sections },
  { path: "/discover", component: Discover }
].concat(
  Articles.Routes,
  Devotions.Routes,
  Music.Routes,
  Series.Routes,
  Stories.Routes
)

export default {
  Articles,
  Devotions,
  Discover,
  Home,
  Music,
  Series,
  Stories,

  // combined export of app routes
  Routes
}
