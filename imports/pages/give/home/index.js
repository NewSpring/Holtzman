// @flow

import Authorized from "../../../blocks/authorzied";
import Layout from "./Layout";
import Right from "./RightPanel";

const Home = () => <Authorized><Layout /></Authorized>;

const Routes = [
  {
    path: "home",
    component: Home,
    rightComponent: <Right />,
  },
];

export default {
  Home,
  Routes,
};
