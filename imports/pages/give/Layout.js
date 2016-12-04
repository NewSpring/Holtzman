// @flow
import { Component } from "react";
import Split, { Left, Right } from "../../blocks/split";
import Dashboard from "../../components/dashboard/";

const subNav = [
  {
    isActive: true,
    linkUrl: "https://my.newspring.cc/give",
    onClick: () => {},
    title: "Home",
  },
  {
    isActive: false,
    linkUrl: "https://my.newspring.cc/give/now",
    onClick: () => {},
    title: "Give Now",
  },
  {
    isActive: false,
    linkUrl: "https://my.newspring.cc/give/history",
    onClick: () => {},
    title: "History",
  },
];

type ILayout = {
  children?: React$Element<any>,
}

class Layout extends Component {
  props: ILayout;

  render() {
    return (
      <div>
        <Split>
          <Right
            background="//s3.amazonaws.com/ns.images/newspring/christmasoffering/christmas_offering_1x1.png"
          />
        </Split>
        <Left>
          <Dashboard
            title="Your Giving"
            subNav={subNav}
          >
            {this.props.children}
          </Dashboard>
        </Left>
      </div>
    );
  }
}

export default Layout;
