import { asyncComponent } from "react-async-component";

export default asyncComponent({
  // $FlowMeteor
  resolve: () => import("./LineGraph")
    .then((x) => x.default),
});
