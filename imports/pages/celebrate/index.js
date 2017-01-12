// @flow
import React, { Component } from "react";
import Meta from "../../components/shared/meta";
import Finances from "./finances";
import FitText from "./components/fit-text";
import NextSteps from "./next-steps";
import DashboardLayout from "../../components/@primitives/layout/dashboard";
import Ministries from "./ministries";
import SmallButton from "../../components/@primitives/UI/buttons/SmallButton";
import {
  SolidLeaf,
  StripedLeaf,
} from "./components/leaves";
import { Leaves } from "./components/layout";

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
          <div className="one-whole@handheld one-fifth@lap-and-up display-inline-block">
            <FitText compressor={0.25} minFontSize={48} maxFontSize={120}>
              <h1
                className="uppercase flush-bottom text-primary"
                style={{
                  fontWeight: "900",
                }}
              >
                2016
              </h1>
            </FitText>
          </div>
          <div className="one-whole text-primary visuallyhidden@lap-and-up">
            <h3 className="display-inline-block uppercase" style={{ fontWeight: "900", marginBottom: "0" }}>Annual</h3>
            <h3 className="display-inline-block soft-half-left uppercase" style={{ fontWeight: "900", marginBottom: "0" }}>Report</h3>
          </div>
          <div className="one-fifth display-inline-block text-primary visuallyhidden@handheld">
            <h3 className="uppercase" style={{ fontWeight: "900", marginBottom: "0" }}>Annual</h3>
            <h3 className="uppercase" style={{ fontWeight: "900", marginBottom: "0" }}>Report</h3>
          </div>
          <div className="three-fifths display-inline-block visuallyhidden@handheld">
            <Leaves>
              <SolidLeaf
                className="locked-bottom locked-right"
                size="200px"
                color="text-secondary"
                style={{
                  transform: "rotate(225deg)",
                  marginBottom: "-150px",
                  marginRight: "-50px",
                }}
              />
              <SolidLeaf
                className="locked-bottom locked-right"
                size="100px"
                color="text-primary"
                style={{
                  transform: "rotate(90deg)",
                  marginBottom: "-125px",
                  marginRight: "170px",
                }}
              />
              <SolidLeaf
                className="locked-bottom locked-right"
                size="200px"
                color="text-tertiary"
                style={{
                  transform: "rotate(0deg)",
                  marginBottom: "-240px",
                  marginRight: "-10px",
                }}
              />
              <StripedLeaf
                className="locked-bottom locked-right"
                size="120px"
                color="text-secondary"
                style={{
                  transform: "rotate(270deg)",
                  marginBottom: "-250px",
                  marginRight: "150px",
                }}
              />
            </Leaves>
          </div>
        </div>
        <div className="soft-double-left@lap-and-up soft-left push-half-top">
          <p className="italic">
            Hear from our Executive Pastor Shane Duffey as he reflects on this year.
          </p>
        </div>
        <div className="soft-double-left@lap-and-up soft-left">
          <SmallButton text="Learn More" className="btn--dark-secondary" />
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

const Routes = [
  {
    path: "celebrate",
    component: Template,
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
