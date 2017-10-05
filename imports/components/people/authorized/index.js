import { Meteor } from "meteor/meteor";
import PropTypes from "prop-types";
import { Component, cloneElement } from "react";
import { connect } from "react-redux";

import { accounts as accountsActions, modal } from "../../../data/store";
import { routeActions } from "../../../data/store/routing";
import OnBoard from "../accounts";

const map = state => ({
  auth: state.accounts.authorized,
  modal: state.modal,
  previous: state.routing.location.previous,
});
@connect(map)
export default class Authorized extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    auth: PropTypes.bool,
    modal: PropTypes.object,
    children: PropTypes.object,
    previous: PropTypes.object,
  }

  componentWillMount() {
    this.props.dispatch(modal.update({ modalBackground: "light" }));
    const authorized = Meteor.userId();
    if (!authorized) {
      this.props.dispatch(modal.render(OnBoard, { coverHeader: true, forceOpen: true }));
    }

    // fail safe if for some reason we are logged in but not authorized in
    // the application
    if (authorized && !this.props.auth) {
      this.props.dispatch(accountsActions.authorize(true));
    }
  }

  componentWillReceiveProps(nextProps) {
    // if the modal is closing, but the user is not authorized
    if (this.props.modal.visible && !nextProps.modal.visible && !nextProps.auth) {
      // use last route instead of goBack() to force update of active nav item
      // handle case where a protected route is the first page visited
      const protectedRegEx = /^\/profile|\/give\/history|\/give\/home/gi;
      let lastRoute = nextProps.previous[nextProps.previous.length - 1] || "/";
      if (protectedRegEx.test(lastRoute)) lastRoute = "/give/now";

      this.props.dispatch(routeActions.push(lastRoute));
    }

    if (this.props.auth && !nextProps.auth) {
      this.props.dispatch(modal.render(OnBoard, {
        coverHeader: true,
        forceOpen: true,
      }));
    }

    // if (!this.props.auth && nextProps.auth) {
    //   this.props.dispatch(modal.hide())
    // }
  }


  render() {
    if (Meteor.userId()) {
      const props = { ...this.props };
      delete props.children;
      return cloneElement(this.props.children, { ...props });
    }

    /*

      This is a temporary work around to a bug with webkit on iOS
      If there is not relative DOM behind a fixed DOM container with inputs
      inside of it, the inputs will not show a focused state, or show as you type

      I'm not sure of a good solution yet, hence the hackery

    */
    if (Meteor.isCordova) {
      return (
        <section className="push-double-ends">
          <section className="push-double-ends">
            <section className="push-double-ends">
              <section className="push-double-ends">
                <section className="push-double-ends">
                  <section className="push-double-ends" />
                </section>
              </section>
            </section>
          </section>
        </section>
      );
    }
    return null;
  }
}
