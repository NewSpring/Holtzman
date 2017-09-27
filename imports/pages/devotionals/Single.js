import PropTypes from 'prop-types';
import { Component } from "react";
import ReactMixin from "react-mixin";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import SwipeViews from "react-swipe-views";
import Meta from "../../components/shared/meta";

import Loading from "../../components/@primitives/UI/loading";

import canLike from "../../components/@enhancers/likes/toggle";
import Shareable from "../../deprecated/mixins/mixins.Shareable";

import {
  header as headerActions,
  live as liveActions,
} from "../../data/store";

// can we use the core toggle here? Is it ready @jbaxleyiii?
import DevotionsSingleContent from "./SingleContent";
import DevotionsSingleScripture from "./SingleScripture";

class DevotionsSingle extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    live: PropTypes.object.isRequired,
    devotion: PropTypes.object.isRequired,
  }

  state = { selectedIndex: 0 }

  componentWillMount() {
    if (process.env.WEB) return;

    // hide the live bar and then bring it back
    // after the view has faded in. this prevents
    // an issue with the z-index and the arrow
    // from the header.
    this.props.dispatch(liveActions.hide());
    // for cached data
    this.handleLiveBar(this.props, this.state);

    this.props.dispatch(headerActions.set({}));
    this.props.dispatch(headerActions.hide());
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state !== nextState) return true;
    if (nextProps.devotion.content && this.props.devotion.content) {
      if (nextProps.devotion.content.id === this.props.devotion.content.id) return false;
      this.setState({ selectedIndex: 0 });
      return true;
    }
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    this.handleLiveBar(nextProps, nextState);
  }

  componentWillUnmount() {
    if (process.env.WEB) return;
    this.props.dispatch(liveActions.unfloat());
  }

  onClickLink = event => {
    event.preventDefault();
    this.setState({
      selectedIndex: 1,
      liveSet: false,
      livePush: false,
    });
  }

  getLiveClasses = () => {
    const classes = [];
    if (this.props.live.live && this.state.livePush) {
      classes.push("push-double-top");
    }

    return classes;
  }

  // if has scripture and live re-enabled
  // the live bar
  // else apply float styles to the bar so it
  // will display below the fixed header
  handleLiveBar = (props, state) => {
    const { liveSet } = state;
    const { content } = props.devotion;
    const { live } = props.live;

    if (liveSet || !live || !content) return;

    this.setState({
      liveSet: true,
    });

    if (content.content.scripture) {
      this.props.dispatch(liveActions.float());
      setTimeout(() => {
        this.setState({
          livePush: true,
        });
        this.props.dispatch(liveActions.show());
      }, 1000);
    } else {
      setTimeout(() => {
        this.props.dispatch(liveActions.show());
      }, 1000);
    }
  }

  renderContent = devotion => {
    if (!devotion.content.scripture) {
      return (
        <div title="Devotional">
          <DevotionsSingleContent
            devotion={devotion}
            onClickLink={this.onClickLink}
            classes={this.getLiveClasses()}
          />
        </div>
      );
    }

    return (
      <SwipeViews
        selectedIndex={this.state.selectedIndex}
        disableSwipe
      >

        <div title="Devotional">
          <DevotionsSingleContent
            devotion={devotion}
            onClickLink={this.onClickLink}
            classes={this.getLiveClasses()}
          />
        </div>

        <div title="Scripture">
          <DevotionsSingleScripture
            devotion={devotion}
            classes={this.getLiveClasses()}
          />
        </div>
      </SwipeViews>
    );
  }

  render() {
    const { content } = this.props.devotion;
    if (!content) {
      return (
        <div className="locked-ends locked-sides floating">
          <div className="floating__item">
            <Loading />
          </div>
        </div>
      );
    }

    const devotion = content;
    return (
      <div>
        <Meta
          title={devotion.title}
          id={devotion.id}
          image={
              devotion.content.images && devotion.content.images.length > 0
                ? devotion.content.images[0].url
                : null
          }
          meta={[
            { property: "og:type", content: "article" },
          ]}
        />
        {this.renderContent(devotion)}
      </div>
    );
  }

}

const DEVOTIONAL_QUERY = gql`
  query getDevotional($id: ID!) {
    content: node(id: $id) {
      id
      ... on Content {
        entryId: id
        title
        status
        channelName
        meta {
          urlTitle
          siteId
          date
          channelId
        }
        content {
          body
          tags
          scripture {
            book
            passage
          }
          images(sizes: ["large"]) {
            fileName
            fileType
            fileLabel
            url
          }
        }
      }
    }
  }
`;

const withDevotional = graphql(DEVOTIONAL_QUERY, {
  name: "devotion",
  options: ownProps => ({
    variables: { id: ownProps.params.id },
  }),
});

const mapStateToProps = state => ({
  modal: { visible: state.modal.visible },
  live: state.live,
});

export default connect(mapStateToProps)(
  withDevotional(
    ReactMixin.decorate(Shareable)(
      canLike(
        props => (props.devotion.loading ? null : props.devotion.content.id),
      )(DevotionsSingle),
    ),
  ),
);

export {
  DevotionsSingle as DevotionsSingleWithoutData,
};
