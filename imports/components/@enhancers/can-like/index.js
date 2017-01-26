
import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

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

/*
  THIS NEEDS TO BE WRAPPED IN A CONNECT CALL TO WORK
  THE CONNECT CALL MUST REVEAL

  How this works:
    it's a function.
    inside the function, I'm declaring a class
      * it has to be inside the function so I have access to the `WrappedComponent`
      the class (LikesWrapper) returns the WrappedComponent with prop for toggling like (onLike)
    at the bottom of the function I return:
      the LikesWrapper class wrapped in a gql mutation.
    So the export is...
      a function that takes a React Component, and returns that component wrapped in
      a LikesWrapper HOC which is wrapped in a GraphQl HOC that allows the toggleLike mutation
*/
export default (WrappedComponent) => {
  class LikesWrapper extends Component {
    constructor(props){
      super(props);
      this.state = { liked: false, id: null }
      this.toggleLike = this.toggleLike.bind(this);
    }

    componentWillReceiveProps(nextProps){
      // gets the node id from gql data passed in. sets the local state `id`
      this.getNodeId(nextProps);
    }

    getNodeId(props) {
      if(props){
        const keys = Object.keys(props);
        const contentKey = keys.find((key) => {
          return props[key] && props[key].content
        });

        if(!contentKey) return null;
        const id = props[contentKey].content.id || props[contentKey].content.entryId;
        if(this.state.id != id){
          this.setState({ id: id });
        }
        return id;
      }
    }

    toggleLike() {
      if (!Meteor.userId()) { //if not logged in, show login modal
        this.props.dispatch(modal.render(OnBoard, {
          coverHeader: true,
          modalBackground: "light",
        }));
      } else { // if logged in, toggle like state in redux, remote with gql query
        this.props.dispatch(likedActions.toggle({
          entryId: this.state.id,
        }));
        this.props.mutate({ variables: { nodeId: this.state.id } })
      }

      return {
        type: "FALSY",
        payload: {},
      };
    }

    render() {
      return <WrappedComponent {...this.props} onLike={this.toggleLike} />
    }
  }
  return withToggleLike(LikesWrapper); // the actual component to be wrapped in a function
}
