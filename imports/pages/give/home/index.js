// @flow

import { Meteor } from "meteor/meteor";

import Authorized from "../../../blocks/authorzied";
import Layout from "./Layout";
import Right from "./RightPanel";

const Home = () => <Authorized><Layout /></Authorized>;

const Routes = [
  {
    path: "home",
    component: Home,
    rightComponent: <Right />,
    onEnter: (nextState: Object, replace: Function) => {
      if (!Meteor.userId()) {
        replace("/give/now");
      }
    },
  },
];

export default {
  Home,
  Routes,
};
