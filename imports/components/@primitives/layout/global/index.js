import { Component } from "react";
import { Meteor } from "meteor/meteor";
import moment from "moment";
import PropTypes from 'prop-types';
import { flatten, pluck } from "ramda";
import { connect } from "react-redux";
import { css } from "aphrodite";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";
import createContainer from "../../../../deprecated/meteor/react-meteor-data";
import { routeActions } from "../../../../data/store/routing";

import NotificationRequest, { UPDATE_ATTRIBUTE_MUTATION } from "./NotificationRequest";

import Modal from "../../modals";
import Meta from "../../../shared/meta";
import Nav from "../../nav";
import Header from "../../UI/header";
import { Loading } from "../../UI/states";

import Likes from "../../../../deprecated/database/collections/likes";

import { linkListener } from "../../../../util/inAppLink";

import {
  accounts as accountsActions,
  liked as likedActions,
  modal as modalActions,
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
      <div data-status-scroll>{children}</div>
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

const Blank = () => <div />;

const PERSON_QUERY = gql`
  query GetPerson {
    person: currentPerson {
      attributes(key: "NotificationIgnoreDate") {
        values {
          value
        }
      }
    }
  }
`;

export const promptNotify = (client, dispatch) => () => {
  const lookup = token => {
    // no need to lookup anything since notifications are already there
    if (token === true) return;

    client.query({ query: PERSON_QUERY }).then(result => {
      const current = flatten(pluck("values", result.data.person.attributes));
      if (current.length && moment(current[0].value).isAfter(moment())) return;
      // wait three seconds after app launch before asking for permission
      setTimeout(() => {
        dispatch(
          modalActions.render(NotificationRequest, {
            promptModal: true,
          })
        );
      }, 3000);
    });
  };

  NativeStorage.getItem("pushNotifications", lookup, lookup);
};

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
    if (!hasBeenSignedIn && Meteor.isCordova) {
      document.addEventListener("deviceready", promptNotify(client, dispatch), false);
    }

    if (!hasBeenSignedIn && process.env.NATIVE && process.env.APP_VERSION) {
      // update the version number in Rock
      client.mutate({
        mutation: UPDATE_ATTRIBUTE_MUTATION,
        variables: {
          key: "AppVersion",
          value: process.env.APP_VERSION,
        },
      });
    }

    hasBeenSignedIn = true;

    // Load in topics from user profile
    Meteor.subscribe("userData");
    const topics = Meteor.user() ? Meteor.user().topics : [];
    if (topics && topics.length) dispatch(topicActions.set(topics));

    Meteor.subscribe("likes");
    const likes = Likes.find({ userId })
      .fetch()
      .map(like => like.entryId);
    if (likes.length) dispatch(likedActions.set(likes));
  }

  return { userId };
}, Blank);

const map = state => ({
  location: state.routing.location,
  modal: state.modal,
});
const withRedux = connect(map);

export const URL_TITLE_QUERY = gql`
  query contentWithUrlTitle(
    $parentChannel: String!
    $parentUrl: String!
    $childChannel: String = ""
    $childUrl: String = ""
    $hasChild: Boolean = false
  ) {
    parent: contentWithUrlTitle(channel: $parentChannel, urlTitle: $parentUrl)
    child: contentWithUrlTitle(channel: $childChannel, urlTitle: $childUrl) @include(if: $hasChild)
  }
`;

class GlobalWithoutData extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    client: PropTypes.object.isRequired,
  };

  state = { universalLinkLoading: false };

  componentWillMount() {
    if (Meteor.isCordova) {
      document.addEventListener("click", linkListener);
      document.addEventListener("deviceready", this.deviceReadyFunction, false);
    }
  }

  componentWillUnMount() {
    if (Meteor.isCordova) universalLinks.unsubscribe("universalLinkRoute");
  }

  deviceReadyFunction = () => {
    universalLinks.subscribe("universalLinkRoute", this.universalLinkRouting);
    /* eslint-disable */
    FCMPlugin.onDynamicLink(({ deepLink }) => {
      // this is a free way to parse a link without requring another lib
      const parser = document.createElement("a");
      parser.href = deepLink;
      const path = parser.pathname;
      // send to be routed :yay:
      this.universalLinkRouting({ path });
    }, alert);
    /* eslint-enable */
  };

  universalLinkRouting = ({ path }) => {
    this.setState({ universalLinkLoading: true });

    switch (path) {
      case this.isQueryRoute(path):
        this.withQuery(path);
        break;
      case "/watchandread":
        this.go("/");
        break;
      case "/sermons":
        this.go("/series");
        break;
      default:
        this.go(path);
    }
  };

  isQueryRoute = path => {
    const queryRoutes = [
      "/articles/",
      "/sermons/",
      "/devotionals/",
      "/studies/",
      "/stories/",
      "/news/",
    ];

    if (queryRoutes.find(url => path.includes(url))) return path;
    return false;
  };

  withQuery = path => {
    const pathArray = path.split("/").filter(Boolean);

    const channel = pathArray[0];
    let urlTitle = pathArray[1];
    let parent = "";

    if (pathArray.length === 3) {
      parent = pathArray[1];
      urlTitle = pathArray[2];
    }

    let parentChannelToUse = channel;
    let childChannelToUse = channel;

    switch (channel) {
      case "sermons":
        parentChannelToUse = "series_newspring";
        break;
      case "studies":
        childChannelToUse = "study_entries";
        break;
      default:
        break;
    }

    this.props.client
      .query({
        query: URL_TITLE_QUERY,
        variables: {
          parentChannel: parentChannelToUse,
          parentUrl: parent || urlTitle,
          childChannel: parent ? childChannelToUse : "",
          childUrl: parent ? urlTitle : "",
          hasChild: parent,
        },
      })
      .then(({ data }) => {
        switch (channel) {
          case "sermons":
            if (data.child) {
              this.go(`/series/${data.parent}/sermon/${data.child}`);
            } else {
              this.go(`/series/${data.parent}`);
            }
            break;
          case "studies":
            if (data.child) {
              this.go(`/${channel}/${data.parent}/entry/${data.child}`);
            } else {
              this.go(`/${channel}/${data.parent}`);
            }
            break;
          default:
            this.go(`/${channel}/${data.parent}`);
        }
      });
    return;
  };

  go = url => {
    this.setState({ universalLinkLoading: false });
    this.props.dispatch(routeActions.push(url));
  };

  render() {
    const { dispatch, client } = this.props;
    let scrollbarStyles = "";
    if (Meteor.isCordova) {
      scrollbarStyles =
        "::-webkit-scrollbar, ::-webkit-scrollbar-track, ::-webkit-scrollbar-track-piece, ::-webkit-scrollbar-thumb { display: none; }";
    }
    return (
      <div id="global">
        <style>{scrollbarStyles}</style>
        {this.state.universalLinkLoading && <Loading />}
        <App {...this.props} />
        <GlobalData dispatch={dispatch} client={client} />
      </div>
    );
  }
}

export default withRedux(withApollo(GlobalWithoutData));

export { GlobalWithoutData, map, withRedux, Watermark, App, Blank, GlobalData };
