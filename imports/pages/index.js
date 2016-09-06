import Give from "./give";
import Groups from "./groups";
import Celebrate from "./celebrate";
import Profile from "./profile";

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

export {
  Routes,
};
