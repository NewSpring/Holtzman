
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
*/

export class LikesWrapper extends Component {
  constructor(props){
    super(props);
    this.state = { liked: false, id: null }
    this.toggleLike = this.toggleLike.bind(this);
  }

  componentWillMount(){
    // TODO get whether already liked and set the button state
  }

  componentWillReceiveProps(nextProps){
    // gets the node id from gql data passed in. sets the local state `id`
    this.getNodeId(nextProps);
    console.log("PROPS", nextProps);
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
    console.log("TOGGLE LIKE CLICKED");
    //if not logged in, show login modal
    if (!Meteor.userId()) {
      this.props.dispatch(modal.render(OnBoard, {
        coverHeader: true,
        modalBackground: "light",
      }));
    } else { // if logged in, toggle like state in redux, remote with gql query
      this.props.dispatch(likedActions.toggle({
        entryId: this.state.id,
      }));
      // this.updateDatabase(entry);
      // this.props.mutate
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

// wrap the wrapper class in a gql HOC
export const WithMutation = withToggleLike(LikesWrapper);

//wrap the data-wrapped class with a function
export default (WrappedComponent) => {
  return WithMutation;
};
