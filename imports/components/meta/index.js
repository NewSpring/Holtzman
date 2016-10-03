import { Component } from "react";
import Helmet from "react-helmet";

import generateData from "./metadata";

class Meta extends Component {

  componentWillMount() {
    if (typeof ga !== "undefined") {
      ga("send", "pageview");
    }
  }

  render() {
    return (<Helmet {...generateData(this.props)} />);
  }

}

export default Meta;
