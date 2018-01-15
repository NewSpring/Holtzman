// @flow
import React, { Component } from "react";
import scriptLoader from "react-async-script-loader";

import DashboardLayout from "../../components/@primitives/layout/dashboard";
import FinancesPage from "./finances";
// import { Leaves } from "./components/layout";
import Meta from "../../components/shared/meta";
import MinistriesPage from "./ministries";
import NextStepsPage from "./next-steps";
import HomePage from "./message-from-shane";
// import { SolidLeaf, StripedLeaf } from "./components/leaves";

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
        }), //eslint-disable-line
    );
  };

  render() {
    return (
      <div>
        <Meta title="Annual Report" />
        <div className="text-center soft-double-top soft-double-left@lap-and-up soft-sides push-top@lap-and-up one-whole">
          <img
            src="https://s3.amazonaws.com/ns.images/newspring/annualreport/2017/ar2017.hero.png"
            alt="Annual Report 2017"
          />
        </div>

        <DashboardLayout
          subNav={this.state.subNav}
          additionalClasses={"soft-half-sides push-right@lap-and-up"}
          title={"Annual Report"}
          align={"text-center"}
          hideTitle
          centerWebNav
        >
          {this.props.children}
        </DashboardLayout>
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
