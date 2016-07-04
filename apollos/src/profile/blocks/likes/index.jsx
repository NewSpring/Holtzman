import { Component } from "react"
import { createContainer } from "../../../core/blocks/meteor/react-meteor-data"
import { Likes } from "../../../core/collections"
import { Loading } from "../../../core/components"

import LikesItem from "./Item"

// XXX make this dynamic via heighliner
class LikesContainer extends Component {

  render() {
    console.log(this.props)
    if (!this.props.likes) {
      <Loading />
    }

    const { likes, recentLikes } = this.props

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

export default createContainer(() => {
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
}, LikesContainer);
