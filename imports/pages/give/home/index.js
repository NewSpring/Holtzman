// @flow
// $FlowMeteor
import { Meteor } from "meteor/meteor";
import Layout from "./Layout";

const Home = () => (
  <Layout />
);

export const Hai = () => (
  <div className="locked-ends locked-sides background--primary">
    <h1 className="text-light-primary">Your Giving So Far</h1>
  </div>
);

const Routes = [
  { path: "home",
    component: Home,
    rightComponent: <Hai />,
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
