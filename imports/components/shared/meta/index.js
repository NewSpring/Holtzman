import { Component, PropTypes } from "react";
import Helmet from "react-helmet";

import generateData from "./metadata";

class Meta extends Component {

  static propTypes = {
    title: PropTypes.string,
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }

  componentDidMount() {
    if (
      typeof ga !== "undefined" &&
      window.location.pathname !== "/give/review"
    ) {
      ga("set", "page", location.pathname);
      ga("send", "pageview");
    }
    if (typeof fabric !== "undefined") {
      if (this.props.title) {
        window.fabric.Answers.sendContentView(
          this.props.title,
          "",
          this.props.id ? this.props.id : ""
        );
      }
    }
  }

  render() {
    return (<Helmet {...generateData(this.props)} />);
  }

}

export default Meta;
