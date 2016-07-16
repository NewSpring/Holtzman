import { Component, PropTypes } from "react";
import { connect } from "react-redux";
import Accounts from "../../blocks/accounts";

@connect((state) => ({ breakpoints: state.responsive.breakpoints }))
class Template extends Component {

  render() {
    const { breakpoints } = this.props;
    if (breakpoints.length && breakpoints.indexOf("lap-and-up") > -1) {
      return (
        <div
          className="scrollable background--fill background--light-secondary locked-sides@palm-wide-and-up locked-ends@palm-wide-and-up floating soft-double-ends push-double-left@lap-and-up soft-double-left@lap-and-up"
          style={{backgroundImage: "url('https://dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/homepage/event.auditorium.2x1_1700_850_c1.png')"}}
        >
          <div className="floating__item" style={{maxWidth: "460px"}}>
            <div className="card flush-bottom">
              <div className="card__item" style={{
                minWidth: "420px",
                "minHeight": "500px",
              }}>
                <Accounts />
              </div>
            </div>

          </div>
        </div>
      );
    }

    return <Accounts />

  }
}

const Routes = [
  { path: "/signup", component: Template },
];

export default {
  Routes,
};
