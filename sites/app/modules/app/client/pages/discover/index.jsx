import { Component } from "react"
import ReactMixin from "react-mixin"
import { connect } from "react-redux"

import { nav as navActions, comingsoon as comingsoonActions } from "apollos/core/store"

import Search from "./discover.Search"
import DiscoverHero from "./discover.Hero"
import DiscoverItem from "./discover.Item"
import RecommendedItem from "./discover.Recommendeditem"

const map = (state) => ({ modal: state.modal })
@connect()
export default class Discover extends Component {

  setNav = () => {
    this.props.dispatch(navActions.setLevel("TOP"))
  }

  componentWillMount() {
    this.setNav()

    this.props.dispatch(comingsoonActions.toggle());
  }

  componentWillReceiveProps() {
    this.setNav()
  }

  componentWillUnmount() {
    this.props.dispatch(comingsoonActions.toggle());
  }

  featuredItem = {
    link: "//newspring.cc/store",
    image: "//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/all/promotions/newspring/9288.perry.cen.tmewtl.availablenowads-01_1700_1700_90_c1.jpg",
    topicName: "Flood SC With Love",
    tags:["shop","leadership","#tmewtl"]
  }

  popularItems = [
    {
      link:"//newspring.cc/anger",
      image:"//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/editorial/articles/newspring.blog.hero.woman.backbonfire_1700_850_90_c1_1700_850_90_c1.jpg",
      topicName:"Anger",
      tags:["mad","betrayal","forgiveness"]
    },
    {
      link:"//newspring.cc/serving",
      image:"//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/serving/carecoffee.2to1_1700_850_90_c1.jpg",
      topicName:"Serving",
      tags:["find your niche","difference makers","volunteering"]
    },
    {
      link:"//newspring.cc/relationships",
      image:"//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/editorial/articles/newspring.blog.hero.ring_2200_1100_90_c1.jpg",
      topicName:"Relationships",
      tags:["marriage", "relationships", "divorce"]
    },
    {
      link:"//newspring.cc/money",
      image:"//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/editorial/articles/newspring.blog.hero.goprocameraphonecarkey_1700_849_90_c1_1700_849_90_c1.jpg",
      topicName:"Money",
      tags:["debt","money","finances"]
    }
  ]

  recommendedItems = [
    {
      link:"https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      image:"//media.giphy.com/media/xTiTnrXFSsd0I8quMU/giphy.gif",
      title:"Once Upon A Pumpkin Pie",
      icon:"icon-category-text",
      category:"Article",
      time:"4h"
    },
    {
      link:"https://www.youtube.com/watch?v=_OBlgSz8sSM",
      image:"//media2.giphy.com/media/cPxRDvlSj9QKA/200.gif",
      title:"Better Together",
      icon:"icon-category-video",
      category:"Series",
      time:"7d"
    },
    {
      link:"https://www.youtube.com/watch?v=5_sfnQDr1-o",
      image:"//i.imgur.com/k2GYxYW.gif",
      title:"Sunday Night Group Study",
      icon:"icon-category-audio",
      category:"Devotional",
      time:"10d"
    },
    {
      link:"https://www.youtube.com/watch?v=EAcdvmnZ_GM",
      image:"//i.imgur.com/WIo04oj.gif",
      title:"Can't Lose",
      icon:"icon-category-video",
      category:"Series",
      time:"12d"
    },
    {
      link:"https://www.youtube.com/watch?v=txqiwrbYGrs",
      image:"//media.giphy.com/media/xTiTnlU8vQabayTAeA/giphy.gif",
      title:"Learning How To Crank That Roy",
      icon:"icon-category-video",
      category:"Story",
      time:"12d"
    }
  ]


  wrapperStyle = {
    overflowY: "hidden",
    height:"100%"
  }


  render() {
    return (
      <div style={this.wrapperStyle} className="background--light-primary">

        <Search />

        <section className="hard background--light-secondary">
          <h6 className="push-left soft-half-bottom soft-top">Popular Topics</h6>
        </section>

        <DiscoverHero
          link={this.featuredItem.link}
          image={this.featuredItem.image}
          topicName={this.featuredItem.topicName}
          tags={this.featuredItem.tags}
        />

        <section className="soft-half background--light-secondary">
          <div className="grid">
            {this.popularItems.map(function(item, i) {
              return <DiscoverItem item={item} key={i} />
            })}
          </div>
        </section>

        <section className="hard background--light-secondary">
          <h6 className="push-left soft-half-bottom soft-top">Recommended by NewSpring</h6>
        </section>

        <section className="soft-half background--light-secondary">
          <div className="grid">
            {this.recommendedItems.map(function(item, i) {
              return <RecommendedItem item={item} key={i} />
            })}
          </div>
        </section>
      </div>
    )
  }
}
