import { Component, PropTypes} from "react"

import DiscoverHero from "./Hero"
import PopularItem from "./../../../../profile/blocks/likes/Item"
import DiscoverItem from "./Item"


function getImage(images, label = "2:1") {

  let selectedImage = false

  for (let image of images) {
    if (image.fileLabel === label) {
      selectedImage = image.cloudfront ? image.cloudfront : image.s3
      break
    }
    selectedImage = image.cloudfront ? image.cloudfront : image.s3
  }
  return selectedImage

}


const Layout = ({ featuredItem, popularItems, recommendedItems }) => {
  return (
    <div style={{ overflowY: "hidden", height:"100%"}} className="background--light-primary">

      <section className="hard background--light-secondary">
        <h6 className="push-left soft-half-bottom soft-top">Recommended by NewSpring</h6>
      </section>

      {() => {
        if (featuredItem) {
          return (
            <DiscoverHero
              link={featuredItem.meta.urlTitle}
              image={getImage(featuredItem.content.images)}
              topicName={featuredItem.title}
            />
          )
        }
      }()}


      <section className="soft-half background--light-secondary">
        <div className="grid">
          {recommendedItems.map(function(item, i) {
            let formatedObj = {
              link: item.meta.urlTitle,
              image: getImage(item.content.images),
              topicName: item.title
            }
            return <DiscoverItem item={formatedObj} key={i} />
          })}
        </div>
      </section>

      <section className="hard background--light-secondary">
        <h6 className="push-left soft-half-bottom soft-top">Popular Content</h6>
      </section>

      <section className="soft-half background--light-secondary">
        <div className="grid">
          {popularItems.map(function(item, i) {
            return (
              <div className="grid__item one-whole" key={i}>
                <PopularItem like={item} />
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}


export default Layout
