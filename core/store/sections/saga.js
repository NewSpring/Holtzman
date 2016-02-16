import "regenerator/runtime"

import { take, put } from "redux-saga/effects"


import { GraphQL } from "../../graphql"
import { addSaga } from "../utilities"

// @TODO abstract action creators to file that isn't index
const set = (content) => ({ type: "SECTIONS.SET_CONTENT", content })

addSaga(function* sectionsSaga(getState) {

  // Query to preload the most recent images of the nav type
  const images = GraphQL.createFragment(`
    fragment on Content {
      images {
        cloudfront
        fileLabel
      }
    }
  `)

  let query = `
    {
      series: allContent(limit: 1, channel: "series_newspring") {
        content {
          ...${images}
        }
      }
      articles: allContent(limit: 1, channel: "articles") {
        content {
          ...${images}
        }
      }
      devotions: allContent(limit: 1, channel: "devotionals") {
        content {
          ...${images}
        }
      }
      stories: allContent(limit: 1, channel: "stories") {
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
  let filteredItems = {}

  // parse the results and only get a single usable image
  for (let item in recentItems) {
    filteredItems[item] = extractImage(recentItems[item][0])
  }

  // wait on the sections panel to be expanded
  let sections = yield take("SECTIONS.SET_CONTENT")
  sections = sections.content

  // remap the images of the section panel
  for (let section in sections) {
    let name = sections[section].name.toLowerCase()
    if (filteredItems[name]) {
      sections[section].image = filteredItems[name]
    }
  }

  // update the content and end the saga (not a daemon)
  yield put(set(sections))

})
