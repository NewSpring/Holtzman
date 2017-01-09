import { Component, PropTypes } from "react";
import { header as headerActions } from "../../data/store";
import Meta from "../../components/shared/meta";
import NextSteps from "./next-steps";

class Template extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
  }

  componentDidMount() {
    console.log("nextstepsroutes = ", ...NextSteps.Routes);
    if (process.env.NATIVE) {
      this.props.dispatch(headerActions.set({ title: "Annual Report" }));
    }
  }

  render() {
    return (
      <div>
        <Meta title="Annual Report" />
        <h1>HELLO FROM THE ANNUAL REPORT</h1>
      </div>
    );
  }
}

const Routes = [
  {
    path: "celebrate",
    component: Template,
    childRoutes: [
      ...NextSteps.Routes,
    ],
  },
];

export default {
  Template,
  Routes,
};
