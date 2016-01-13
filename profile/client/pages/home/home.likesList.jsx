import { Component } from "react"
import ReactMixin from "react-mixin"

import { Likes } from "../../../../core/lib/collections"

import { Loading } from "../../../../core/client/components"
import LikesItem from "./home.likesItem"

@ReactMixin.decorate(ReactMeteorData)
export default class LikesList extends Component {

  getMeteorData() {
    Meteor.subscribe("likes")
    const likes = Likes.find().fetch()

    return {
      likes
    }
  }

  render() {

    if (!this.data.likes) {
      <Loading />
    }

    const likes = this.data.likes

    return(
      <div>
        {likes.map((like, i) => {
          return <LikesItem like={like} key={i} />
        })}
      </div>
    );

  }

}
