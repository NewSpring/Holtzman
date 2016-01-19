import { Component } from "react"
import ReactMixin from "react-mixin"

import FollowingItem from "./Item"

export default class FollowingContainer extends Component {
  contentItems = [
    {
      name:"Articles",
      id:"c-1"
    },
    {
      name:"Devotions",
      id:"c-2"
    },
    {
      name:"Stories",
      id:"c-3"
    },
    {
      name:"Series",
      id:"c-4"
    },
    {
      name:"Sermons",
      id:"c-5"
    },
    {
      name:"Music",
      id:"c-6"
    }
  ]

  h7Classes = `flush outlined--light outlined--bottom display-block soft-sides soft-half-top soft-bottom`

  containerClasses = `cell-wrapper push-half-bottom background--light-primary outlined--light outlined--bottom text-dark-secondary`

  render() {

    return (
      <section className="hard background--light-secondary">

        <h7 className={this.h7Classes}>
          Personalize your NewSpring Home and follow the types of content you care about.
        </h7>

        <div className={this.containerClasses}>

          {this.contentItems.map((contentItem, i) => {
            return <FollowingItem item={contentItem} key={i} />
          })}

        </div>

      </section>
    );

  }

}
