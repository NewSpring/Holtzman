import { Component, PropTypes } from "react";
import { Meteor } from "meteor/meteor";
import { connect } from "react-redux";
import { css } from "aphrodite";
import { withApollo } from "react-apollo";
import createContainer from "../../../../deprecated/meteor/react-meteor-data";

import Modal from "../../modals";
import Meta from "../../../shared/meta";
import Nav from "../../nav";
import Header from "../../UI/header";

import Likes from "../../../../deprecated/database/collections/likes";

import { linkListener } from "../../../../util/inAppLink";

import {
  accounts as accountsActions,
  liked as likedActions,
  topics as topicActions,
} from "../../../../data/store";

import Styles from "./watermark-css";

const Watermark = () => (
  <div className={css(Styles["global-watermark"])}>
    <h4
      className={
        "soft-half flush text-light-primary uppercase watermark " +
        `${css(Styles.watermark)} visuallyhidden@handheld`
      }
    >
      NewSpring
    </h4>
  </div>
);


const App = ({ children, className, native }) => (
  <div
    className={
      "push-double-bottom@palm soft-half-bottom@palm " +
      "push-double-left@palm-wide-and-up soft-double-left@palm-wide-and-up"
    }
  >
    <div className={className}>
      <Meta />
      {(() => {
        if (native || process.env.NATIVE) {
          return <Header />;
        }
        return null;
      })()}
      <div data-status-scroll>
        {children}
      </div>
      <Modal />
      <Nav />
      <Watermark />
    </div>

  </div>
);

App.propTypes = {
  children: PropTypes.object.isRequired,
  className: PropTypes.string,
  native: PropTypes.bool,
};


const Blank = () => (<div />);

// Global Data is a Tracker aware data fetching container
// it has no children to avoid reredering any child elements on change
// it pretty much just gives us Tracker + redux together
let hasBeenSignedIn = false;
const GlobalData = createContainer(({ dispatch, client }) => {
  const userId = Meteor.userId();

  if (typeof Raven !== "undefined") {
    if (!userId) Raven.setUserContext();
    if (userId && Meteor.user()) {
      const person = Meteor.user();
      const email = person.emails && person.emails[0] && person.emails[0].address;
      if (email) {
        Raven.setUserContext({ id: userId, email });
      }
    }
  }

  if (typeof fabric !== "undefined") {
    if (!userId) {
      fabric.Crashlytics.setUserEmail();
      fabric.Crashlytics.setUserIdentifier();
    }
    if (userId && Meteor.user()) {
      const person = Meteor.user();
      const email = person.emails && person.emails[0] && person.emails[0].address;
      if (email) {
        fabric.Crashlytics.setUserEmail(email);
        fabric.Crashlytics.setUserIdentifier(userId);
        fabric.Answers.sendLogIn("meteor", true);
      }
    }
  }

  // XXX create universal store clearing on logout
  if (!userId && hasBeenSignedIn) {
    dispatch(accountsActions.authorize(false));
    dispatch(accountsActions.signout());
    client.resetStore();
    hasBeenSignedIn = false;
  }

  if (userId) {
    dispatch(accountsActions.authorize(true));
    hasBeenSignedIn = true;

    // Load in topics from user profile
    Meteor.subscribe("userData");
    const topics = Meteor.user() ? Meteor.user().topics : [];
    if (topics && topics.length) dispatch(topicActions.set(topics));


    // XXX which one?
    // XXX remove this section and replace with Heighliner implementation
    Meteor.subscribe("likes");
    Meteor.subscribe("recently-liked");
    const likes = Likes.find({ userId }).fetch().map((like) => like.entryId);
    if (likes.length) dispatch(likedActions.set(likes));
  }

  return { userId };
}, Blank);

const map = (state) => ({
  location: state.routing.location,
  modal: state.modal,
});
const withRedux = connect(map);

class GlobalWithoutData extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    client: PropTypes.object.isRequired,
  }

  componentWillMount() {
    if (Meteor.isCordova) document.addEventListener("click", linkListener);
  }

  render() {
    const { dispatch, client } = this.props;
    return (
      <div id="global">
        <App {...this.props} />
        <GlobalData dispatch={dispatch} client={client} />
      </div>
    );
  }
}

export default withRedux(withApollo(GlobalWithoutData));

export {
  GlobalWithoutData,
  map,
  withRedux,
  Watermark,
  App,
  Blank,
  GlobalData,
};
