import "regenerator/runtime"

import { take, put, cps } from "redux-saga/effects"

import { Sections } from "../../collections"
import { GraphQL } from "../../graphql"
import { addSaga } from "../utilities"

// @TODO abstract action creators to file that isn't index
const set = (content) => ({ type: "SECTIONS.SET_CONTENT", content })

const bindSections = (callback) => {
  Tracker.autorun((computation) => {

    // subscribe to sections
    Meteor.subscribe("sections")

    // pull all the sections data
    let sections = Sections.find({}, { sort: { order: 1 }}).fetch()

    if (sections.length) {
      let _sections = {}
      for (let _item of sections) { _sections[_item._id] = _item }

      // persist in the store
      callback(null, _sections)
      computation.stop()
    }

  })

}

addSaga(function* sectionPreLoader(getState) {

  let sections = yield cps(bindSections)
  yield put(set(sections))

})

addSaga(function* sectionImageDownload(getState) {

  // Query to preload the most recent images of the nav type
  const images = GraphQL.createFragment(`
    fragment on Content {
      images {
        s3
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
    let image = extractImage(recentItems[item][0])
    filteredItems[item] = image
    if (typeof window != "undefined" && window != null) {
      let img = document.createElement("img")
      img.src = image
    }
  }

  let { sections } = getState()
  if (!sections.content || !Object.keys(sections.content).length) {
    sections = yield take("SECTIONS.SET_CONTENT")
  }
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
