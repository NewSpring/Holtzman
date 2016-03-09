import "regenerator/runtime"

import { take, put } from "redux-saga/effects"


import { GraphQL } from "../../graphql"
import { addSaga } from "../utilities"

// @TODO abstract action creators to file that isn't index
const set = (content) => ({ type: "SECTIONS.SET_CONTENT", content })

addSaga(function* sectionsSaga(getState) {

  // Query to preload all of the menu items and a
  // query to preload the most recent images of the nav type
  const images = GraphQL.createFragment(`
    fragment on Content {
      images {
        s3
        cloudfront
        fileLabel
      }
    }
  `)

  let site = "newspring-main"
  if (Meteor.isCordova) {
    site = "newspring-app"
  }

  let query = `
    {
      navigation(nav: "${site}") {
        id
        link
        text
        image
        sort
        children {
          id
          link
          text
          image
          sort
        }
      }

      sermons: allContent(limit: 1, channel: "series_newspring") {
        content {
          ...${images}
        }
      }
      articles: allContent(limit: 1, channel: "articles") {
        content {
          ...${images}
        }
      }
      devotionals: allContent(limit: 1, channel: "devotionals") {
        content {
          ...${images}
        }
      }
      stories: allContent(limit: 1, channel: "stories") {
        content {
          ...${images}
        }
      }
      studies: allContent(limit: 1, channel: "studies") {
        content {
          ...${images}
        }
      }
      news: allContent(limit: 1, channel: "news") {
        content {
          ...${images}
        }
      }
      music: allContent(limit: 1, channel: "albums") {
        content {
          ...${images}
        }
      }
    }
  `

  function extractImage(content) {
    let { images } = content.content

    let finalImage;

    for (let image of images) {
      let l = image.fileLabel
      if (l === "1:1" || l === "default") {
        finalImage = image.cloudfront ? image.cloudfront : image.s3
        break
      }

      finalImage = image.cloudfront ? image.cloudfront : image.s3
      if (finalImage) {
        break
      }

    }

    return finalImage

  }

  // go ahead and make the query on load (this will be cached on heighliner)
  let recentItems = yield GraphQL.query(query)
  let navigation = recentItems.navigation
  delete recentItems.navigation
  let filteredItems = {}

  // parse the results and only get a single usable image
  for (let item in recentItems) {
    let image = extractImage(recentItems[item][0])
    filteredItems[item] = image
  }

  // wait on the sections panel to be expanded
  // let sections = yield take("SECTIONS.SET_CONTENT")
  // sections = sections.content
  function bindForeignImages(sections) {
    // remap the images of the section panel
    for (let section in sections) {

      let name = sections[section].text.toLowerCase()
      if (filteredItems[name]) {
        sections[section].image = filteredItems[name]
      }

      // ensure protocol relative
      sections[section].image = sections[section].image.replace(/^http:|^https:/i, "");

      // pre download images for super speed
      // if (sections[section].image) {
      //
      //   if (typeof window != "undefined" && window != null) {
      //     let img = document.createElement("img")
      //     img.src = sections[section].image
      //   }
      // }

      bindForeignImages(sections[section].children)
    }

  }

  function fixInternaLinks(sections) {

    for (let section in sections) {
      let url = sections[section].link
      let regex = new RegExp(__meteor_runtime_config__.ROOT_URL, "gmi")
      if (url.match(regex)) {
        url = url.replace(regex, "/")
        if (url[0] != "/") {
          url = "/" + url
        }
      }

      sections[section].link = url

      fixInternaLinks(sections[section].children)
    }

  }

  bindForeignImages(navigation)
  fixInternaLinks(navigation)

  // update the content and end the saga (not a daemon)
  yield put(set(navigation))

})
