// @flow
import { Component } from "react";
// $FlowMeteor
// import { Meteor } from "meteor/meteor";

import Authorized from "../../../blocks/authorzied";
import Layout from "./Layout";
import FundBreakdown from "./FundBreakdown";

type IHome = {
  setRightProps: Function,
};

class Home extends Component {
  props: IHome;
  componentWillMount() {
    this.props.setRightProps({
      background: "//s3.amazonaws.com/ns.images/all/heroes/a2617.stepuphero.1x2.nologo.jpg",
    });
  }
  render() {
    return <Layout />;
  }
}

export const Hai = () => (
  <div className="locked-ends locked-sides background--primary">
    <h1 className="text-light-primary">Your Giving So Far</h1>
    <FundBreakdown />
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
