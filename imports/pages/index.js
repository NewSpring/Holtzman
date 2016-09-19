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
  import Music from "./music";
  import Series from "./series";
  import Stories from "./stories";
  import Sections from "./sections";
  import Video from "./video";
  import Welcome from "./welcome";
  import Locations from "./locations";
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
    Music.Routes,
    Series.Routes,
    Stories.Routes,
    Sections.Routes,
    Discover.Routes,
    Video.Routes,
    Welcome.Routes,
    Locations.Routes,
  );
}

Routes = Routes.concat(Signup.Routes, Util.Routes);

export default {
  Routes,
};

export {
  Routes,
};
