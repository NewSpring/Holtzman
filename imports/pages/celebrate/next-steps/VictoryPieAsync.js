import { asyncComponent } from "react-async-component";

// async this giant library
export default asyncComponent({
  resolve: () => import("victory").then((x) => x.VictoryPie),
});

