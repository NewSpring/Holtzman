// @flow
import find from "lodash.find";
import { Component } from "react";
import Split, { Left, Right } from "../../blocks/split";
import Dashboard from "../../components/dashboard/";

type ILayout = {
  children?: React$Element<any>,
}

class Layout extends Component {
  props: ILayout;
  state = {
    subNav: [
      {
        isActive: false,
        linkUrl: "/give/home",
        onClick: () => {},
        title: "Home",
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
    active.shift();
    active.shift();
    return find(props.routes, { path: active[0] });
  }

  getRightComponent = (props: Object) => {
    const { rightComponent } = this.getActive(props);
    // XXX handle function as children
    return rightComponent || null;
  }

  render() {
    return (
      <div>
        <Split>
          <Right
            background="//s3.amazonaws.com/ns.images/newspring/christmasoffering/christmas_offering_1x1.png"
          >
            {this.getRightComponent(this.props)}
          </Right>
        </Split>
        <Left>
          <Dashboard
            title="Your Giving"
            subNav={this.state.subNav}
          >
            {this.props.children}
          </Dashboard>
        </Left>
      </div>
    );
  }
}

export default Layout;
