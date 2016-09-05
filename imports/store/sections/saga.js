import "regenerator-runtime/runtime"

import { fork, put } from "redux-saga/effects"
import gql from "graphql-tag";
import { addSaga } from "../utilities"
import { GraphQL } from "../../graphql";

// XXX abstract action creators to file that isn't index
const set = (content) => ({ type: "SECTIONS.SET_CONTENT", content })

function* getSectionsData(){
  if (Meteor.isServer) return;

  const site = process.env.NATIVE ? "newspring-app" : "newspring-main";

  // XXX move to sections.graphql and import
  const query = gql`
    fragment NavigationImages on Content {
      content {
        images(sizes: ["medium"]) {
          url
          label
        }
      }
    }

    query GetNavigation($site: String!) {
      navigation(nav: $site) {
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
      sermons: content(limit: 1, channel: "series_newspring") {
        ...NavigationImages
      }
      articles: content(limit: 1, channel: "articles") {
        ...NavigationImages
      }
      devotionals: content(limit: 1, channel: "devotionals") {
        ...NavigationImages
      }
      stories: content(limit: 1, channel: "stories") {
        ...NavigationImages
      }
      studies: content(limit: 1, channel: "studies") {
        ...NavigationImages
      }
      news: content(limit: 1, channel: "news") {
        ...NavigationImages
      }
      music: content(limit: 1, channel: "newspring_albums") {
        ...NavigationImages
      }
    }
  `;

  const variables = { site };

  function extractImage(content) {
    let { images } = content.content

    if (!images.length) return null;

    // prefer 1x1 image
    let oneByOne = _.find(images, (image) => {
      return image.label === "1:1"
    });

    if (oneByOne) return oneByOne.url;

    // then try 2x1, especially for devotions that only have 2x1
    let twoByOne = _.find(images, (image) => {
      return image.label === "2:1"
    });

    if (twoByOne) return twoByOne.url;

    // then try default, for devotions with leather times
    let defaultImage = _.find(images, (image) => {
      return image.label === "default"
    });

    if (defaultImage) return defaultImage.url;

    // finally, just return the first image
    return images[0].url;

  }

  // go ahead and make the query on load (this will be cached on heighliner)
  let { data } = yield GraphQL.query({ query, variables });
  let navigation = data.navigation
  delete data.navigation
  let filteredItems = {}

  // parse the results and only get a single usable image
  for (let item in data) {
    let image = extractImage(data[item][0])
    filteredItems[item] = image
  }

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
      if (process.env.NATIVE && sections[section].image) {

        if (typeof window != "undefined" && window != null) {
          let img = document.createElement("img")
          img.src = sections[section].image
        }
      }

      bindForeignImages(sections[section].children)
    }

  }

  function fixInternaLinks(sections) {

    for (let section in sections) {
      let url = sections[section].link
      let regex = new RegExp(__meteor_runtime_config__.ROOT_URL, "gmi")
      if (url.match(regex)) {
        url = url.replace(regex, "")
        if (url[0] != "/") {
          url = "/" + url
        }

      } else {
        url = "//newspring.cc" + url
      }

      sections[section].link = url

      fixInternaLinks(sections[section].children)
    }

  }

  bindForeignImages(navigation)
  if (process.env.WEB) fixInternaLinks(navigation);

  // update the content and end the saga (not a daemon)
  yield put(set(navigation))
}

addSaga(function* sectionsSaga(getState) {
  yield fork(getSectionsData)
})
