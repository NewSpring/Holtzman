import { Component } from "react"
import ReactMixin from "react-mixin"
import { connect, gql } from "apollos/core/graphql/apollo";
import { Likeable, Shareable } from "app/client/mixins"
import Hammer from "react-hammerjs";
import { VelocityComponent } from "velocity-react"

import Helpers from "app/client/helpers"

import { Loading } from "apollos/core/components"

import { nav as navActions } from "apollos/core/store"
import headerActions from "apollos/core/store/header"

// can we use the core toggle here? Is it ready @jbaxleyiii?
import DevotionsSingleContent from "./devotions.SingleContent"
import DevotionsSingleScripture from "./devotions.SingleScripture"

// TODO: integrate this with ../apollos core toggle
import SwipeViews from "react-swipe-views"

import DevotionQuery from "./queries/single"

const mapQueriesToProps = ({ ownProps, state }) => {
  const pathParts = state.routing.location.pathname.split("/");
  return {
    devotion: {
      query: gql`${DevotionQuery}`,
      variables: {
        entryId: Number(pathParts[2]),
      },
      forceFetch: false,
      returnPartialData: false,
    },
  };
};

const mapStateToProps = (state) => {
  return {
    modal: {
      visible: state.modal.visible
    }
  }
};

@connect({ mapQueriesToProps, mapStateToProps })
@ReactMixin.decorate(Likeable)
@ReactMixin.decorate(Shareable)
export default class SeriesSingle extends Component {

  state = {
    selectedIndex: 0
  }

  onClickLink = (event) => {
    event.preventDefault();
    this.setState({
      selectedIndex: 1
    });
  }

  componentWillMount() {
    if(Meteor.isCordova) {
      this.props.dispatch(navActions.setLevel("CONTENT"));
      this.props.dispatch(navActions.setAction("CONTENT", {
        id: 2,
        action: this.likeableAction
      }));
    }

    this.props.dispatch(headerActions.hide());
  }

  renderContent = (devotion) => {

    if (devotion.content.scripture === "") {
      return (
        <div title="Devotional">

          <DevotionsSingleContent
            devotion={devotion}
            onClickLink={this.onClickLink}
          />

        </div>
      );
    }
    return (
      <SwipeViews selectedIndex={this.state.selectedIndex} disableSwipe={true} className="background--light-primary">

        <div title="Devotional">

          <DevotionsSingleContent
            devotion={devotion}
            onClickLink={this.onClickLink}
          />

        </div>

        <div title="Scripture">

          <DevotionsSingleScripture devotion={devotion} />

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
            <Loading/>
          </div>
        </div>
      );
    }

    const devotion = content;

    return (
        <VelocityComponent
          animation={"transition.fadeIn"}
          duration={1000}
          runOnMount={true}
          display={"flex"}
        >

          {this.renderContent(devotion)}

        </VelocityComponent>
    )

  }

};
