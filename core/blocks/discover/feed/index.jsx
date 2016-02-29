import { Component, PropTypes} from "react"
import { connect } from "react-redux"
import ReactMixin from "react-mixin"

import { GraphQL } from "../../../graphql"
import { Likes } from "../../../collections"

import {
  modal,
  collections as collectionActions,
} from "../../../store"

import Layout from "./Layout"

const map = (state) => ({
  discover: state.collections.discover
})
@connect(map)
@ReactMixin.decorate(ReactMeteorData)
export default class Discover extends Component {


  componentDidMount() {
    const { dispatch } = this.props

    let query = `
      {
        discover: allLowReorderSets(setName: "promotions_newspring") {
          title
          id
          status
          meta {
            urlTitle
          }
          content {
            images {
              cloudfront
              fileName
              fileLabel
              s3
            }
          }
        }
      }
    `

    GraphQL.query(query)
      .then(({ discover }) => {

        let mappedObj = {}
        for (let entry of discover) {
          mappedObj[entry.id] = entry
        }

        dispatch(collectionActions.insert("discover", mappedObj))

      })

  }


  getMeteorData() {
    Meteor.subscribe("recently-liked")
    const likes = Likes.find({
      userId: {
        $not: Meteor.userId()
      }
    }, { sort: { dateLiked: -1 }}).fetch()

    return {
      popularItems: likes
    }
  }


  render() {

    let { discover } = this.props
    discover || (discover = {})
    let discoverArr = []
    for (let dis in discover ) {
      discoverArr.push(discover[dis])
    }

    const featured = discoverArr.filter((x) => (x.status.toLowerCase() === "featured"))
    const open = discoverArr.filter((x) => (x.status.toLowerCase() === "open"))

    const featuredItem = featured[0]
    const recommendedItems = [...featured.slice(1, featured.length - 1)]
    const popular = this.data.popularItems

    let popularItems = []
    let uniqueIds = []
    for (let item of this.data.popularItems) {
      if (uniqueIds.indexOf(item.entryId) > -1) {
        continue
      }

      uniqueIds.push(item.entryId)
      popularItems.push(item)
    }

    return (
      <Layout
        featuredItem={featuredItem}
        popularItems={popularItems.slice(0, 5)}
        recommendedItems={recommendedItems}
      />
    )

  }

}
