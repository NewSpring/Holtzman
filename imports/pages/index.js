/* eslint-disable */
import Util from "./_";
import Give from "./give";
import Groups from "./groups";
import Celebrate from "./celebrate";
import Profile from "./profile";
import Signup from "./signup";

if (process.env.NATIVE) {
  import Articles from "./articles";
  import Devotionals from "./devotionals";
  import Discover from "./discover";
  import Locations from "./locations";
  import Music from "./music";
  import News from "./news";
  import Sections from "./sections";
  import Series from "./series";
  import Stories from "./stories";
  import Studies from "./studies";
  import Video from "./video";
  import Welcome from "./welcome";
}


let Routes = [];
Routes = Routes.concat(
  Profile,
  Give,
  Groups.Routes,
  Celebrate.Routes
);

if (process.env.NATIVE) {
  Routes = Routes.concat(
    Articles.Routes,
    Devotionals.Routes,
    Discover.Routes,
    Locations.Routes,
    Music.Routes,
    News.Routes,
    Sections.Routes,
    Series.Routes,
    Stories.Routes,
    Studies.Routes,
    Video.Routes,
    Welcome.Routes,
  );
}

Routes = Routes.concat(Signup.Routes, Util.Routes);

export {
  Routes,
};

export default Routes;
