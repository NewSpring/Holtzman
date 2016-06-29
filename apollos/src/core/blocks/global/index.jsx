import { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { createContainer } from "../meteor/react-meteor-data";
import { css } from "aphrodite";

import { Likes } from "../../collections"

import Modal from "../modal"
import Meta from "../../components/meta"
import Nav from "../nav"
import Header from "../../components/header";

import {
  accounts as accountsActions,
  liked as likedActions,
  // topics as topicActions,
} from "../../store"

import Styles from "./watermark-css"

const Watermark = () => (
  <div className={css(Styles["global-watermark"])}>
    <h4 className={`soft-half flush text-light-primary uppercase watermark ${Styles["watermark"]} visuallyhidden@handheld`}>
      NewSpring
    </h4>
  </div>
)


export const App = ({ children, className }) => {
  return (
    <div
      className="push-double-bottom@handheld soft-bottom@handheld push-double-left@lap-and-up soft-double-left@lap-and-up"
    >
      <div className={className}>
        <Meta />
        {(() => { if (process.env.NATIVE) return <Header />; })()}
        {/*<LivePlayer/>*/}
        <div data-status-scroll={true}>
          {children}
        </div>
        <Modal/>
        <Nav />
        <Watermark />
      </div>

    </div>
  )
}


export const Blank = () => (<div></div>);

// Global Data is a Tracker aware data fetching container
// it has no children to avoid reredering any child elements on change
// it pretty much just gives us Tracker + redux together
let hasBeenSignedIn = false;
const GlobalData =  createContainer(({ dispatch }) => {

  const userId = Meteor.userId();

  // XXX create universal store clearing on logout
  if (!userId && hasBeenSignedIn) {
    dispatch(accountsActions.authorize(false));
    dispatch(accountsActions.signout());
    hasBeenSignedIn = false;
  }

  if (userId) {
    hasBeenSignedIn = true;

    // Load in topics from user profile
    Meteor.subscribe("userData");
    let topics = Meteor.user() ? Meteor.user().topics : [];
    // if (topics && topics.length) dispatch(topicActions.set(topics));


    // XXX which one?
    // XXX remove this section and replace with Heighliner implementation
    Meteor.subscribe("likes");
    Meteor.subscribe("recently-liked");
    let likes = Likes.find({ userId }).fetch().map((like) => like.entryId);
    if (likes.length) dispatch(likedActions.set(likes));
  }

  return { userId }
}, Blank);

const map = (state) => ({
  location: state.routing.location,
  modal: state.modal,
})
@connect(map)
export default class Global extends Component {
  render(){
    const { dispatch } = this.props;
    return (
      <div id="global">
        <App {...this.props} />
        {/*<GlobalData dispatch={dispatch} />*/}
      </div>
    );
  }
};
