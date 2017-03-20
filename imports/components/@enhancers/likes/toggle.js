
// @flow

// $FlowMeteor
import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { connect } from "react-redux";

import { contentCard, groupCard } from "./fragments";
import {
  nav as navActions,
  liked as likedActions,
  modal,
} from "../../../data/store";
import OnBoard from "../../people/accounts";

export const TOGGLE_LIKE_MUTATION = gql`
  mutation ToggleLike($nodeId: String!) {
    toggleLike(nodeId: $nodeId) {
      like {
        ... ContentCard
        ... GroupCard
      }
    }
  }
  ${contentCard}
  ${groupCard}
`;

const withToggleLike = graphql(TOGGLE_LIKE_MUTATION, {});

export const classWrapper = (propsReducer: Function) => (WrappedComponent: any) => {
  type ILikesWrapper = {
    dispatch: Function,
    mutate: Function,
    modal: Object,
  };

  class LikesWrapper extends Component {
    props: ILikesWrapper;

    componentWillMount() {
      if (!process.env.WEB) {
        this.props.dispatch(navActions.setLevel("CONTENT"));
        this.props.dispatch(navActions.setAction("CONTENT", {
          id: 2,
          action: this.toggleLike,
        }));
      }
    }

    componentWillUnmount() {
      if (!process.env.WEB) this.props.dispatch(navActions.setLevel("TOP"));
    }

    getNodeId = () => {
      if (propsReducer && typeof propsReducer === "function") {
        return propsReducer(this.props);
      }
      console.warn("propsReducer was either not passed, or is not a function");
      return null;
    };

    toggleLike = () => {
      const { dispatch, mutate } = this.props;
      // may still be open from user logging in.
      if (Meteor.userId() && this.props.modal && this.props.modal.visible) dispatch(modal.hide());

      if (!Meteor.userId()) { // if not logged in, show login modal
        dispatch(modal.render(OnBoard, {
          coverHeader: true,
          modalBackground: "light",
          onFinished: this.toggleLike,
        }));
      } else { // if logged in, toggle like state in redux, remote with gql query
        const nodeId = this.getNodeId();
        if (nodeId) {
          dispatch(likedActions.toggle({ entryId: nodeId }));
          mutate({ variables: { nodeId } });
        }
      }

      return { type: "FALSY", payload: {} };
    }

    render = () => <WrappedComponent {...this.props} />;
  }

  const mapStateToProps = (state) => ({
    modal: state.modal,
  });

  return connect(mapStateToProps)(withToggleLike(LikesWrapper));
};

export default classWrapper;
