// @flow
import React, { Component } from "react";
import scriptLoader from "react-async-script-loader";

import DashboardLayout from "../../components/@primitives/layout/dashboard";
import Finances from "./finances";
import { Leaves } from "./components/layout";
import Meta from "../../components/shared/meta";
import Ministries from "./ministries";
import NextSteps from "./next-steps";
import Shane from "./message-from-shane";
import SmallButton from "../../components/@primitives/UI/buttons/SmallButton";
import {
  SolidLeaf,
  StripedLeaf,
} from "./components/leaves";

type ITemplate = {
  children: React$Element<any>,
}

class Template extends Component {
  props: ITemplate;
  state = {
    subNav: [
      {
        key: 1,
        isActive: false,
        linkUrl: "/celebrate/finances",
        onClick: () => {},
        title: "Finances",
      },
      {
        key: 2,
        isActive: false,
        linkUrl: "/celebrate/next-steps",
        onClick: () => {},
        title: "Next Steps",
      },
      {
        key: 3,
        isActive: false,
        linkUrl: "/celebrate/ministries",
        onClick: () => {},
        title: "Ministries",
      },
    ],
  }

  componentWillMount() {
    this.updateActive(this.props);
  }

  componentWillReceiveProps(props: Object) {
    this.updateActive(props);
  }

  updateActive = (props: Object) => {
    const { pathname } = props.location;

    this.setState((state) => state.subNav.map((x) => {
      const nav = x;
      nav.isActive = false;
      if (nav.linkUrl === pathname) {
        nav.isActive = true;
      }

      return nav;
    }));
  }

  render() {
    return (
      <div>
        <Meta title="Annual Report" />
        <div className="soft-double-top soft-double-left@lap-and-up soft-left push-top@lap-and-up one-whole">
          <div className="one-whole@handheld one-fourth@lap-and-up soft-half-right@lap-and-up display-inline-block">
            <h1
              className="uppercase flush-bottom text-primary"
              style={{
                fontWeight: "900",
                fontSize: 120,
              }}
            >
              2016
            </h1>
          </div>
          <div className="one-whole text-primary visuallyhidden@lap-and-up">
            <h3 className="display-inline-block uppercase" style={{ fontWeight: "900", marginBottom: "0" }}>Annual</h3>
            <h3 className="display-inline-block soft-half-left uppercase" style={{ fontWeight: "900", marginBottom: "0" }}>Report</h3>
          </div>
          <div className="one-fourth display-inline-block text-primary visuallyhidden@handheld">
            <h3 className="uppercase" style={{ fontWeight: "900", marginBottom: "0" }}>Annual</h3>
            <h3 className="uppercase" style={{ fontWeight: "900", marginBottom: "0" }}>Report</h3>
          </div>
        </div>
        <div className="soft-double-sides@lap-and-up soft-sides push-half-top one-half@lap-wide-and-up display-inline-block">
          <p className="italic">
            Hear from our Executive Pastor Shane Duffey as he reflects on this year.
          </p>
        </div>
        <div className="visuallyhidden@handheld visuallyhidden@lap one-half display-inline-block">
          <Leaves>
            <SolidLeaf
              className="locked-bottom locked-right"
              size="200px"
              color="text-secondary"
              style={{
                transform: "rotate(225deg)",
                marginBottom: "-80px",
                marginRight: "-50px",
              }}
            />
            <SolidLeaf
              className="locked-bottom locked-right"
              size="100px"
              color="text-primary"
              style={{
                transform: "rotate(90deg)",
                marginBottom: "-55px",
                marginRight: "170px",
              }}
            />
            <SolidLeaf
              className="locked-bottom locked-right"
              size="200px"
              color="text-tertiary"
              style={{
                transform: "rotate(0deg)",
                marginBottom: "-170px",
                marginRight: "-10px",
              }}
            />
            <StripedLeaf
              className="locked-bottom locked-right"
              size="120px"
              color="text-secondary"
              style={{
                transform: "rotate(270deg)",
                marginBottom: "-180px",
                marginRight: "150px",
              }}
            />
          </Leaves>
        </div>
        <div className="soft-double-left@lap-and-up soft-left">
          <SmallButton text="Learn More" className="btn--dark-secondary" linkUrl="/celebrate/message-from-shane" />
        </div>
        <DashboardLayout
          subNav={this.state.subNav}
        >
          {this.props.children}
        </DashboardLayout>
      </div>
    );
  }
}

// XXX This is not a great long term solution, but it works for this iteration.
// We shouldn't have to import the ooyala scripts twice.
const scripts = [
  "//player.ooyala.com/static/v4/stable/4.6.9/core.min.js",
  "//player.ooyala.com/static/v4/stable/4.6.9/video-plugin/main_html5.min.js",
  "//player.ooyala.com/static/v4/stable/4.6.9/skin-plugin/html5-skin.js",
];

const Routes = [
  { path: "celebrate/message-from-shane", component: Shane.Template },
  {
    path: "celebrate",
    component: scriptLoader(...scripts)(Template),
    indexRoute: { onEnter: (nextState: Object, replace: Function) => replace("/celebrate/finances") },
    childRoutes: [
      ...Finances.Routes,
      ...NextSteps.Routes,
      ...Ministries.Routes,
    ],
  },
];

export default {
  Template,
  Routes,
};
