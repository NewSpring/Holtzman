// @flow
// $FlowMeteor
import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { connect } from "react-redux";

import { contentCard, groupCard } from "./fragments";
import { nav as navActions, liked as likedActions, modal } from "../../../data/store";
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

export const classWrapper = (propsReducer: Function = () => null, updateNav: boolean = true) => (
  WrappedComponent: any,
) => {
  type ILikesWrapper = {
    dispatch: Function,
    mutate: Function,
    modal: Object,
    likes: string[]
  };

  class LikesWrapper extends Component {
    props: ILikesWrapper;

    componentWillMount() {
      if (!process.env.WEB && updateNav) {
        this.props.dispatch(navActions.setLevel("CONTENT"));
        this.props.dispatch(
          navActions.setAction("CONTENT", {
            id: 2,
            action: this.toggleLike,
          }),
        );
      }
    }

    componentWillUnmount() {
      if (!process.env.WEB && updateNav) this.props.dispatch(navActions.setLevel("TOP"));
    }

    // has a default propsReducer that returns null if not passed
    getNodeId = () => propsReducer(this.props);

    toggleLike = () => {
      const { dispatch, mutate } = this.props;
      // may still be open from user logging in.
      if (Meteor.userId() && this.props.modal && this.props.modal.visible) dispatch(modal.hide());

      if (!Meteor.userId()) {
        // if not logged in, show login modal
        /*
          XXX removing the auto-like after login because...
          1. User clicks login in modal
          2. redux dispatch toggles the like briefly
          3. meteor person data gets back and resets the likes in the store
          4. a few seconds later (why so long??) the likes mutation gets back and re-likes the item
          XXX until we can fix this, I think it'd be better not to auto-like
        */
        // onFinished: this.toggleLike,
        dispatch(
          modal.render(OnBoard, {
            coverHeader: true,
            modalBackground: "light",
          }),
        );
      } else {
        // if logged in, toggle like state in redux, remote with gql query
        const nodeId = this.getNodeId();
        if (nodeId) {
          dispatch(likedActions.toggle({ entryId: nodeId }));
          mutate({ variables: { nodeId } });
        }
      }

      return { type: "FALSY", payload: {} };
    };

    render() {
      const id = this.getNodeId();
      const { likes } = this.props;
      const isLiked = Boolean(id) && likes.length > 0 && likes.filter(x => id === x).length !== 0;
      return (
        <WrappedComponent
          {...this.props}
          toggleLike={this.toggleLike}
          isLiked={isLiked}
        />
      );
    }
  }

  return LikesWrapper;
};

const mapStateToProps = state => ({
  modal: state.modal,
  likes: state.liked.likes,
});

export default (...args: any[]) => (component: any) =>
  connect(mapStateToProps)(withToggleLike(classWrapper(...args)(component)));
