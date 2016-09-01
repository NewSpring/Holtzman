import Groups from "./groups/index";
import Celebrate from "./celebrate/index";


if (process.env.NATIVE) {
  import Articles from "./articles/index"
  import Devotionals from "./devotionals/index"
  import Discover from "./discover/index"
  import Music from "./music/index"
  import Series from "./series/index"
  import Stories from "./stories/index"
  import Sections from "./sections/index";
  import Video from "./video/index";
  import Welcome from "./welcome/index";
  import Locations from "./locations/index";
}


let Routes = []
Routes = Routes.concat(
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
}
