import { Component, PropTypes} from "react"
import { Link } from "react-router"

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

let textItemCount = 0
const Layout = ({ featuredItem, popularItems, recommendedItems, textItems }) => {
  return (
    <div style={{ overflowY: "hidden", height:"100%"}} className="background--light-primary">

      <section className="hard background--light-secondary">
        <h6 className="push-left soft-half-bottom soft-top">Recommended by NewSpring</h6>
      </section>

      {(() => {
        if (featuredItem) {
          return (
            <DiscoverHero
              link={featuredItem.meta.urlTitle}
              image={getImage(featuredItem.content.images, "1:1")}
              topicName={featuredItem.title}
            />
          )
        }
      })()}


      <section className="soft-half background--light-secondary">
        <div className="grid">
          {recommendedItems.map(function(item, i) {
            let formatedObj = {
              link: item.meta.urlTitle,
              image: getImage(item.content.images),
              title: item.title,
              date: item.meta.date,
              category: "Need to know",
              icon: "icon-leaf-outline"
            }

            return (
                <PopularItem like={formatedObj} key={i}/>
            )

          })}
        </div>
      </section>

      <div className="soft-half background--light-secondary">
        <div className="card soft one-whole">
          <div className="card__item">
            <p className="flush">
              <small>
                <em>
                  Are you looking for&nbsp;
                  {textItems.map((x, i) => {
                    let delimeter = ", "
                    if (textItems[i].id == textItems[textItems.length - 1].id) {
                      delimeter = ""
                    } else if (textItems[i].id == textItems[textItems.length - 2].id) {
                      delimeter = " or "
                    }

                    return (
                      <span key={i}>
                        <Link to={x.meta.urlTitle} >{x.title}</Link>
                        {delimeter}
                      </span>
                    )
                  })}?
                </em>
              </small>

            </p>

          </div>
        </div>
      </div>
      {/*
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
      */}
    </div>
  )
}


export default Layout
