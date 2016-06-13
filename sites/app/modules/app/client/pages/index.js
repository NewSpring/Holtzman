
import Articles from "./articles"
import Devotions from "./devotions"
import Discover from "./discover"
import Home from "./home"
import Music from "./music"
import Series from "./series"
import Stories from "./stories"
import Sections from "./sections";

const Routes = [].concat(
  Articles.Routes,
  Devotions.Routes,
  Music.Routes,
  Series.Routes,
  Stories.Routes,
  Sections.Routes,
  Discover.Routes,
)

export default {
  Articles,
  Devotions,
  Home,
  Music,
  Series,
  Stories,

  // combined export of app routes
  Routes
}
