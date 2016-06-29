import { Component } from "react"
import ReactMixin from "react-mixin"

import { Likes } from "../../../core/collections"
import { Loading } from "../../../core/components"

import LikesItem from "./Item"

// @ReactMixin.decorate(ReactMeteorData)
export default class LikesContainer extends Component {

  getMeteorData() {
    Meteor.subscribe("likes")
    const likes = Likes.find({
      userId: Meteor.userId()
    }, { sort: { dateLiked: -1 }}).fetch()

    const recentLikes = Likes.find({
      userId: {
        $not: Meteor.userId()
      }
    }, { sort: { dateLiked: -1 }}).fetch()

    return {
      likes,
      recentLikes
    }
  }

  render() {

    if (!this.data.likes) {
      <Loading />
    }

    const { likes, recentLikes } = this.data

    let ids = []
    return(
      <div className="grid soft-top background--light-secondary soft-half-sides soft-double@lap-and-up " style={ {marginTop: "-20px"} }>
        {likes.map((like, i) => {
          return <LikesItem like={like} key={i} />
        })}
        {(() => {

          if (!likes.length) {
            return (
              <div>
                <p className="soft text-center">
                  <em>
                    <small>
                      Check out some of the latest things from NewSpring
                    </small>
                  </em>
                </p>

                {recentLikes.map((like, i) => {

                  if (ids.indexOf(like.entryId) > -1) {
                    return
                  }

                  ids.push(like.entryId)
                  return <LikesItem like={like} key={i} />
                })}
              </div>

            )
          }

        })()}
      </div>
    );

  }

}
