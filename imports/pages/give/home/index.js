// @flow
import { Component } from "react";
import Layout from "./Layout";

class Home extends Component {
  render() {
    return (
      <Layout />
    );
  }
}

export const Hai = () => (
  <div className="locked-ends locked-sides background--primary">
    <h1 className="text-light-primary">Your Giving So Far</h1>
  </div>
);

const Routes = [
  { path: "home", component: Home, rightComponent: <Hai /> },
];

export default {
  Home,
  Routes,
};
