// @flow
import React, { Component } from "react";
import Meta from "../../components/shared/meta";
import Finances from "./finances";
import NextSteps from "./next-steps";
import DashboardLayout from "../../components/@primitives/layout/dashboard";

type ITemplate = {
  children: React$Element<any>,
}

class Template extends Component {
  props: ITemplate;
  state = {
    subNav: [
      {
        isActive: false,
        linkUrl: "/celebrate/finances",
        onClick: () => {},
        title: "Finances",
      },
      {
        isActive: false,
        linkUrl: "/celebrate/next-steps",
        onClick: () => {},
        title: "Next Steps",
      },
      {
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
        <DashboardLayout
          title="2016 Annual Report"
          subNav={this.state.subNav}
        >
          {this.props.children}
        </DashboardLayout>
      </div>
    );
  }
}

const Routes = [
  {
    path: "celebrate",
    component: Template,
    indexRoute: { onEnter: (nextState: Object, replace: Function) => replace("/celebrate/finances") },
    childRoutes: [
      ...Finances.Routes,
      ...NextSteps.Routes,
    ],
  },
];

export default {
  Template,
  Routes,
};
