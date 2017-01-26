
import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { connect } from "react-redux";

import { liked as likedActions, modal } from "../../../data/store";
import OnBoard from "../../people/accounts";

const TOGGLE_LIKE_MUTATION = gql`
  mutation ToggleLike($nodeId: String!) {
    toggleLike(nodeId: $nodeId) {
      like {
        id
      }
    }
  }
`;

const withToggleLike = graphql(TOGGLE_LIKE_MUTATION);

export const ClassWrapper = (propsReducer) => (WrappedComponent) => {
  export class LikesWrapper extends Component {
    getNodeId = () => propsReducer(this.props);

    toggleLike = () => {
      const { dispatch, mutate } = this.props;
      if (!Meteor.userId()) { //if not logged in, show login modal
        dispatch(modal.render(OnBoard, {
          coverHeader: true, modalBackground: "light",
        }));
      } else { // if logged in, toggle like state in redux, remote with gql query
        dispatch(likedActions.toggle({ entryId: this.getNodeId() }));
        mutate({ variables: { nodeId: this.getNodeId() } });
      }

      return { type: "FALSY", payload: {} };
    }

    render = () => <WrappedComponent {...this.props} onLike={this.toggleLike} />;
  }
  return withToggleLike(LikesWrapper); // the actual component to be wrapped in a function
}

export default ClassWrapper;
