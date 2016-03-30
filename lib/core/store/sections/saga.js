"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

require("regenerator-runtime/runtime");

var _effects = require("redux-saga/effects");

var _graphql = require("../../graphql");

var _utilities = require("../utilities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// @TODO abstract action creators to file that isn't index
var set = function set(content) {
  return { type: "SECTIONS.SET_CONTENT", content: content };
};

(0, _utilities.addSaga)(_regenerator2["default"].mark(function sectionsSaga(getState) {
  var images, site, query, extractImage, recentItems, navigation, filteredItems, item, image, bindForeignImages, fixInternaLinks;
  return _regenerator2["default"].wrap(function sectionsSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          fixInternaLinks = function fixInternaLinks(sections) {

            for (var section in sections) {
              var url = sections[section].link;
              var regex = new RegExp(__meteor_runtime_config__.ROOT_URL, "gmi");
              if (url.match(regex)) {
                url = url.replace(regex, "");
                if (url[0] != "/") {
                  url = "/" + url;
                }
              } else {
                url = "//newspring.cc" + url;
              }

              sections[section].link = url;

              fixInternaLinks(sections[section].children);
            }
          };

          bindForeignImages = function bindForeignImages(sections) {
            // remap the images of the section panel
            for (var section in sections) {

              var name = sections[section].text.toLowerCase();
              if (filteredItems[name]) {
                sections[section].image = filteredItems[name];
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

              bindForeignImages(sections[section].children);
            }
          };

          extractImage = function extractImage(content) {
            var images = content.content.images;


            if (!images.length) {
              return null;
            }

            // prefer 1x1 image
            var oneByOne = _.find(images, function (image) {
              return image.fileLabel === "1:1";
            });

            if (oneByOne) return oneByOne.cloudfront ? oneByOne.cloudfront : oneByOne.s3;

            // then try 2x1, especially for devotions that only have 2x1
            var twoByOne = _.find(images, function (image) {
              return image.fileLabel === "2:1";
            });

            if (twoByOne) return twoByOne.cloudfront ? twoByOne.cloudfront : twoByOne.s3;

            // then try default, for devotions with leather times
            var defaultImage = _.find(images, function (image) {
              return image.fileLabel === "default";
            });

            if (defaultImage) return defaultImage.cloudfront ? defaultImage.cloudfront : defaultImage.s3;

            // finally, just return the first image
            return images[0].cloudfront ? images[0].cloudfront : images[0].s3;
          };

          // Query to preload all of the menu items and a
          // query to preload the most recent images of the nav type
          images = _graphql.GraphQL.createFragment("\n    fragment on Content {\n      images {\n        s3\n        cloudfront\n        fileLabel\n      }\n    }\n  ");
          site = "newspring-main";

          if (Meteor.isCordova) {
            site = "newspring-app";
          }

          query = "\n    {\n      navigation(nav: \"" + site + "\") {\n        id\n        link\n        text\n        image\n        sort\n        children {\n          id\n          link\n          text\n          image\n          sort\n        }\n      }\n\n      sermons: allContent(limit: 1, channel: \"series_newspring\") {\n        content {\n          ..." + images + "\n        }\n      }\n      articles: allContent(limit: 1, channel: \"articles\") {\n        content {\n          ..." + images + "\n        }\n      }\n      devotionals: allContent(limit: 1, channel: \"devotionals\") {\n        content {\n          ..." + images + "\n        }\n      }\n      stories: allContent(limit: 1, channel: \"stories\") {\n        content {\n          ..." + images + "\n        }\n      }\n      studies: allContent(limit: 1, channel: \"studies\") {\n        content {\n          ..." + images + "\n        }\n      }\n      news: allContent(limit: 1, channel: \"news\") {\n        content {\n          ..." + images + "\n        }\n      }\n      music: allContent(limit: 1, channel: \"albums\") {\n        content {\n          ..." + images + "\n        }\n      }\n    }\n  ";
          _context.next = 9;
          return _graphql.GraphQL.query(query);

        case 9:
          recentItems = _context.sent;
          navigation = recentItems.navigation;

          delete recentItems.navigation;
          filteredItems = {};

          // parse the results and only get a single usable image

          for (item in recentItems) {
            image = extractImage(recentItems[item][0]);

            filteredItems[item] = image;
          }

          // wait on the sections panel to be expanded
          // let sections = yield take("SECTIONS.SET_CONTENT")
          // sections = sections.content


          bindForeignImages(navigation);
          if (!Meteor.isCordova) {
            fixInternaLinks(navigation);
          }

          // update the content and end the saga (not a daemon)
          _context.next = 18;
          return (0, _effects.put)(set(navigation));

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, sectionsSaga, this);
}));