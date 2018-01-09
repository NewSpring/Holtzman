// @flow
import React, { Component } from "react";
import scriptLoader from "react-async-script-loader";

import DashboardLayout from "../../components/@primitives/layout/dashboard";
import FinancesPage from "./finances";
import { Leaves } from "./components/layout";
import Meta from "../../components/shared/meta";
import MinistriesPage from "./ministries";
import NextStepsPage from "./next-steps";
import HomePage from "./message-from-shane";
import { SolidLeaf, StripedLeaf } from "./components/leaves";

type ITemplate = {
  children: React$Element<any>,
};

class Template extends Component {
  props: ITemplate;
  state = {
    subNav: [
      {
        key: 1,
        isActive: false,
        linkUrl: "/annualreport/home",
        onClick: () => {},
        title: "Home",
      },
      {
        key: 2,
        isActive: false,
        linkUrl: "/annualreport/finances",
        onClick: () => {},
        title: "Finances",
      },
      {
        key: 3,
        isActive: false,
        linkUrl: "/annualreport/next-steps",
        onClick: () => {},
        title: "Next Steps",
      },
      {
        key: 4,
        isActive: false,
        linkUrl: "/annualreport/ministries",
        onClick: () => {},
        title: "Ministries",
      },
    ],
  };

  componentWillMount() {
    this.updateActive(this.props);
  }

  componentWillReceiveProps(props: Object) {
    this.updateActive(props);
  }

  updateActive = (props: Object) => {
    const { pathname } = props.location;

    this.setState(
      state =>
        state.subNav.map(x => {
          const nav = x;
          nav.isActive = false;
          if (nav.linkUrl === pathname) {
            nav.isActive = true;
          }

          return nav;
        }) //eslint-disable-line
    );
  };

  render() {
    return (
      <div>
        <Meta title="Annual Report" />
        <div className="text-center soft-double-top soft-double-left@lap-and-up soft-left push-top@lap-and-up one-whole">
          <div className="one-whole text-primary visuallyhidden@lap-and-up">
            <h1
              className="display-inline-block uppercase"
              style={{ fontWeight: "900", marginBottom: "0" }}
            >
              Annual
            </h1>
            <h1
              className="display-inline-block soft-half-left uppercase"
              style={{ fontWeight: "900", marginBottom: "0" }}
            >
              Report
            </h1>
          </div>
          <div className="one-fourth display-inline-block text-primary visuallyhidden@handheld">
            <h1
              className="uppercase"
              style={{ fontWeight: "900", marginBottom: "0" }}
            >
              Annual
            </h1>
            <h1
              className="uppercase"
              style={{ fontWeight: "900", marginBottom: "0" }}
            >
              Report
            </h1>
          </div>
          <div className="relative one-whole@handheld one-fourth@lap-and-up soft-half-right@lap-and-up display-inline-block">
            <span
              className="text-light-primary rotate--number"
              style={{
                position: "absolute",
                top: "18px",
                left: "8px",
                fontWeight: "900",
                fontSize: 20,
              }}
            >
              20
            </span>
            <h1
              className="uppercase flush-bottom text-primary"
              style={{
                fontWeight: "900",
                fontSize: 120,
              }}
            >
              17
            </h1>
          </div>
        </div>

        <DashboardLayout
          subNav={this.state.subNav}
          additionalClasses={
            "soft-half-sides push-right@lap-and-up push-half-right"
          }
          title={"Annual Report"}
          align={"text-center"}
          hideTitle
          centerWebNav
        >
          {this.props.children}
        </DashboardLayout>
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
      </div>
    );
  }
}

const scripts = [
  "//player.ooyala.com/static/v4/stable/4.6.9/core.min.js",
  "//player.ooyala.com/static/v4/stable/4.6.9/video-plugin/main_html5.min.js",
  "//player.ooyala.com/static/v4/stable/4.6.9/skin-plugin/html5-skin.js",
];

const Routes = [
  {
    path: "annualreport",
    component: scriptLoader(...scripts)(Template),
    indexRoute: {
      onEnter: (nextState: Object, replace: Function) =>
        replace("/annualreport/home"),
    },
    childRoutes: [
      ...HomePage.Routes,
      ...FinancesPage.Routes,
      ...NextStepsPage.Routes,
      ...MinistriesPage.Routes,
    ],
  },
  {
    path: "celebrate",
    indexRoute: {
      onEnter: (nextState: Object, replace: Function) =>
        replace("/annualreport"),
    },
  },
  {
    path: "annual-report",
    indexRoute: {
      onEnter: (nextState: Object, replace: Function) =>
        replace("/annualreport"),
    },
  },
];

export default {
  Template,
  Routes,
};
