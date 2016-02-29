import { Component } from "react"

import DiscoverHero from "./DiscoverHero"
import DiscoverItem from "./DiscoverItem"

export default class Discover extends Component {

  featuredItem = {
    link: "//newspring.cc/store",
    image: "//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/all/promotions/newspring/9288.perry.cen.tmewtl.availablenowads-01_1700_1700_90_c1.jpg",
    topicName: "The Most Excellent Way To Lead",
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

  render () {

    return (
      <div>
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
      </div>
    );

  }

}
