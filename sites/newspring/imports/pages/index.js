
if (process.env.WEB) {
  // import Celebrate from "./celebrate";
  import Groups from "./groups/index";
}

if (process.env.NATIVE) {
  import Articles from "./articles/index"
  import Devotionals from "./devotionals/index"
  import Discover from "./discover/index"
  import Music from "./music/index"
  import Series from "./series/index"
  import Stories from "./stories/index"
  import Sections from "./sections/index";
}


let Routes = []
if (process.env.WEB) {
  // Routes.push(Celebrate.Routes);
  Routes = Routes.concat(Groups.Routes);
}

if (process.env.NATIVE) {
  Routes = Routes.concat(
    Articles.Routes,
    Devotionals.Routes,
    Music.Routes,
    Series.Routes,
    Stories.Routes,
    Sections.Routes,
    Discover.Routes,
  );
}

export {
  Routes,
}
