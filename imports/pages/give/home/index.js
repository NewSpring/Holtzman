// @flow
import { Component } from "react";
import moment from "moment";

import Authorized from "../../../blocks/authorzied";
import Layout from "./Layout";
import YTDGraph from "./YTDMetrics";

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
    return <Authorized><Layout /></Authorized>;
  }
}

export const RightPanel = () => (
  <div className="locked-ends locked-sides background--primary soft-double-sides soft-double-top">
    {/* spacer */}
    <div className="push-double-top display-inline-block soft-double-top soft-double-right one-whole">
      <h3
        className="text-light-primary soft-double-top outlined--bottom push-double-top outlined--light"
        style={{ borderColor: "white" }}
      >
        {moment().format("YYYY")} so far
      </h3>
      <YTDGraph
        linkUrl={"/give/history"}
      />
    </div>
  </div>
);

const Routes = [
  { path: "home",
    component: Home,
    rightComponent: <RightPanel />,
    // onEnter: (nextState: Object, replace: Function) => {
    //   if (!Meteor.userId()) {
    //     replace("/give/now");
    //   }
    // },
  },
];

export default {
  Home,
  Routes,
};
