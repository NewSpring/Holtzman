// @flow
import find from "lodash.find";
import React, { Component, cloneElement } from "react";
import Split, { Left, Right } from "../../components/@primitives/layout/split";
import DashboardLayout from "../../components/@primitives/layout/dashboard";

type ILayout = {
  children: React$Element<any>,
}

class Layout extends Component {
  props: ILayout;
  state = {
    right: {
      props: {
        background: "//s3.amazonaws.com/ns.images/newspring/christmasoffering/christmas_offering_1x1.png",
      },
    },
    subNav: [
      {
        isActive: false,
        linkUrl: "/give/home",
        onClick: () => {},
        title: "Dashboard",
      },
      {
        isActive: false,
        linkUrl: "/give/now",
        onClick: () => {},
        title: "Give Now",
      },
      {
        isActive: false,
        linkUrl: "/give/history",
        onClick: () => {},
        title: "History",
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

  getActive = (props: Object) => {
    const active = props.location.pathname.split("/");
    return find(props.routes, { path: active[2] });
  }

  getRightComponent = (props: Object) => {
    const { rightComponent } = this.getActive(props);
    // XXX handle function as children
    return rightComponent || null;
  }

  setRightProps = (props: Object) => {
    this.setState({ right: { props } });
  }

  render() {
    return (
      <div>
        <Split>
          <Right {...this.state.right.props}>
            {this.getRightComponent(this.props)}
          </Right>
        </Split>
        <Left>
          <DashboardLayout
            title="My Giving"
            subNav={this.state.subNav}
            additionalClasses={"soft-half-sides push-half-right"}
          >
            {cloneElement(this.props.children, {
              setRightProps: this.setRightProps,
            })}
          </DashboardLayout>
        </Left>
      </div>
    );
  }
}

export default Layout;
