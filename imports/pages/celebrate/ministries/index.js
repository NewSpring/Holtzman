// @flow
import Meta from "../../../components/shared/meta";

import NewSpringAverages from "./sections/newSpringAverages";
import KidSpring from "./sections/kidSpring";
import Fuse from "./sections/fuse";
import NewSpringLeadershipCollege from "./sections/newSpringLeadershipCollege";
import NewSpringNetwork from "./sections/newSpringNetwork";
import Web from "./sections/web";
import Thanks from "./sections/thanks";

/* eslint-disable max-len */
export const Ministries = () => (
  <div>
    <Meta title="Ministries" />

    <NewSpringAverages />
    <KidSpring />
    <Fuse />
    <NewSpringLeadershipCollege />
    <NewSpringNetwork />
    <Web />
    <Thanks />
  </div>
);

const Routes = [
  {
    path: "ministries",
    component: Ministries,
  },
];

export default {
  Ministries,
  Routes,
};
