"use strict";

exports.__esModule = true;

var _react = require("react");

var _reactRouter = require("react-router");

var _Hero = require("./Hero");

var _Hero2 = _interopRequireDefault(_Hero);

var _Item = require("./../../../../profile/blocks/likes/Item");

var _Item2 = _interopRequireDefault(_Item);

var _Item3 = require("./Item");

var _Item4 = _interopRequireDefault(_Item3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getImage(images) {
  var label = arguments.length <= 1 || arguments[1] === undefined ? "2:1" : arguments[1];


  var selectedImage = false;

  for (var _iterator = images, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var image = _ref;

    if (image.fileLabel === label) {
      selectedImage = image.cloudfront ? image.cloudfront : image.s3;
      break;
    }
    selectedImage = image.cloudfront ? image.cloudfront : image.s3;
  }
  return selectedImage;
}

var textItemCount = 0;
var Layout = function Layout(_ref2) {
  var featuredItem = _ref2.featuredItem;
  var popularItems = _ref2.popularItems;
  var recommendedItems = _ref2.recommendedItems;
  var textItems = _ref2.textItems;

  return React.createElement(
    "div",
    { style: { overflowY: "hidden", height: "100%" }, className: "background--light-primary" },
    React.createElement(
      "section",
      { className: "hard background--light-secondary" },
      React.createElement(
        "h6",
        { className: "push-left soft-half-bottom soft-top" },
        "Recommended by NewSpring"
      )
    ),
    function () {
      if (featuredItem) {
        return React.createElement(_Hero2["default"], {
          link: featuredItem.meta.urlTitle,
          image: getImage(featuredItem.content.images, "1:1"),
          topicName: featuredItem.title
        });
      }
    }(),
    React.createElement(
      "section",
      { className: "soft-half background--light-secondary" },
      React.createElement(
        "div",
        { className: "grid" },
        recommendedItems.map(function (item, i) {
          var formatedObj = {
            link: item.meta.urlTitle,
            image: getImage(item.content.images),
            title: item.title,
            date: item.meta.date,
            category: "Need to know",
            icon: "icon-leaf-outline"
          };

          return React.createElement(_Item2["default"], { like: formatedObj, key: i });
        })
      )
    ),
    React.createElement(
      "div",
      { className: "soft-half background--light-secondary" },
      React.createElement(
        "div",
        { className: "card soft one-whole" },
        React.createElement(
          "div",
          { className: "card__item" },
          React.createElement(
            "p",
            { className: "flush" },
            React.createElement(
              "small",
              null,
              React.createElement(
                "em",
                null,
                "Are you looking for ",
                textItems.map(function (x, i) {
                  var delimeter = ", ";
                  if (textItems[i].id == textItems[textItems.length - 1].id) {
                    delimeter = "";
                  } else if (textItems[i].id == textItems[textItems.length - 2].id) {
                    delimeter = " or ";
                  }

                  return React.createElement(
                    "span",
                    { key: i },
                    React.createElement(
                      _reactRouter.Link,
                      { to: x.meta.urlTitle },
                      x.title
                    ),
                    delimeter
                  );
                }),
                "?"
              )
            )
          )
        )
      )
    )
  );
};

exports["default"] = Layout;
module.exports = exports['default'];