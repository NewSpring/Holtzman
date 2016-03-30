"use strict";

exports.__esModule = true;
exports["default"] = undefined;

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _class, _temp2;

var _react = require("react");

var _reactRouter = require("react-router");

var _velocityReact = require("velocity-react");

var _loading = require("../../components/loading");

var _FeedItemSkeleton = {
  "load-item": "FeedItemSkeleton__load-item___2a44i",
  "fake-text": "FeedItemSkeleton__fake-text___1DR5P",
  "fake-text-small": "FeedItemSkeleton__fake-text-small___1ARkQ",
  "ColorAnimation": "FeedItemSkeleton__ColorAnimation___gr4HE"
};

var _FeedItemSkeleton2 = _interopRequireDefault(_FeedItemSkeleton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ExternalLinkWrapper = function ExternalLinkWrapper(props) {

  var url = props.to;
  if (props.to.match("//") === null) {
    return React.createElement(
      _reactRouter.Link,
      (0, _extends3["default"])({}, props, { to: url }),
      props.children
    );
  }

  if (url[0] != "/") {
    url = "/" + url;
  }
  return React.createElement(
    "a",
    (0, _extends3["default"])({}, props, {
      href: url
    }),
    props.children
  );
};

// context from ImageLoader
function preloader() {
  return React.createElement(
    "div",
    {
      id: this.id,
      className: this.imageclasses.join(" ") + " " + _FeedItemSkeleton2["default"]["load-item"]
    },
    this.children
  );
}

// context from ImageLoader
function renderElement() {
  return React.createElement(
    "div",
    {
      id: this.id,
      className: this.imageclasses.join(" "),
      style: this.style
    },
    this.children
  );
}

var ChildItem = function ChildItem(_ref) {
  var section = _ref.section;
  var go = _ref.go;

  if (!section) {
    return React.createElement(
      "div",
      { className: "one-whole grid__item" },
      React.createElement(
        "div",
        { className: "rounded ratio--landscape" },
        React.createElement("div", { className: "ratio__item" })
      )
    );
  }

  var imageclasses = ["overlay--solid-medium", "background--fill", "background--dark-tertiary", "rounded", "ratio--thin", "floating--bottom", "floating--left"];

  return React.createElement(
    "div",
    { className: "one-whole soft-half-left grid__item push-half-bottom" },
    React.createElement(
      ExternalLinkWrapper,
      {
        to: section.link,
        className: "plain",
        onClick: go,
        id: section.id
      },
      React.createElement(
        _loading.ImageLoader,
        {
          src: section.image,
          preloader: preloader,
          renderElement: renderElement,
          force: true,
          imageclasses: imageclasses,
          style: { backgroundImage: "url(" + section.image + ")" }
        },
        React.createElement(
          "div",
          { className: "overlay__item floating__item ratio__item" },
          React.createElement(
            "h6",
            { className: "text-light-primary soft-left" },
            section.text
          )
        )
      )
    )
  );
};

var Item = function Item(_ref2) {
  var section = _ref2.section;
  var go = _ref2.go;
  var children = _ref2.children;

  if (!section) {
    return React.createElement(
      "div",
      { className: "one-half grid__item" },
      React.createElement(
        "div",
        { className: "rounded ratio--square" },
        React.createElement("div", { className: "ratio__item" })
      )
    );
  }

  var imageclasses = ["overlay--gradient", "background--fill", "background--dark-tertiary", "rounded", "ratio--square", "floating--bottom", "floating--left"];

  return React.createElement(
    "div",
    { className: "one-half soft-half-left grid__item push-half-bottom" },
    React.createElement(
      ExternalLinkWrapper,
      {
        to: section.link,
        className: "plain",
        onClick: go,
        force: true,
        id: section.id
      },
      React.createElement(
        _loading.ImageLoader,
        {
          src: section.image,
          preloader: preloader,
          renderElement: renderElement,

          imageclasses: imageclasses,
          style: { backgroundImage: "url(" + section.image + ")" }
        },
        React.createElement(
          "div",
          { className: "overlay__item floating__item ratio__item" },
          React.createElement(
            "h6",
            { className: "text-light-primary soft-left" },
            section.text
          )
        )
      )
    ),
    children
  );
};

var SectionItem = (_temp2 = _class = function (_Component) {
  (0, _inherits3["default"])(SectionItem, _Component);

  function SectionItem() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, SectionItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      section: null
    }, _this.expandOrGo = function (e) {
      var id = e.currentTarget.id;

      var _loop = function _loop() {
        if (_isArray) {
          if (_i >= _iterator.length) return "break";
          _ref3 = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) return "break";
          _ref3 = _i.value;
        }

        var section = _ref3;

        if (Number(section.id) === Number(id) && section.children.length) {
          e.preventDefault();

          // if a section is open and a different section is clicked
          // then change the opened section to the one clicked
          if (_this.state.section != null && Number(_this.state.section.id) !== Number(id)) {
            _this.setState({ section: null });
            setTimeout(function () {
              _this.setState({ section: section });
            }, 400);
          }

          // if a section is open and that section is clicked
          // then close the section clicked
          else if (_this.state.section != null && Number(section.id) === Number(id)) {
              _this.setState({ section: null });
            }

            // else nothing is open
            // and open the section clicked
            else {
                _this.setState({ section: section });
              }

          return {
            v: void 0
          };
        }
      };

      _loop2: for (var _iterator = _this.props.sections, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref3;

        var _ret2 = _loop();

        switch (_ret2) {
          case "break":
            break _loop2;

          default:
            if ((typeof _ret2 === "undefined" ? "undefined" : (0, _typeof3["default"])(_ret2)) === "object") return _ret2.v;
        }
      }

      _this.props.hide();
    }, _this.renderChildren = function () {
      var section = _this.state.section;


      if (!section) {
        return null;
      }

      var children = [];

      for (var child in section.children) {
        children.push(section.children[child]);
      }

      return React.createElement(
        "div",
        { className: "soft-half-right soft-left soft-top background--dark-primary push-bottom" },
        React.createElement(
          "div",
          { className: "grid " },
          children.map(function (sectionItem, i) {
            return React.createElement(ChildItem, { section: sectionItem, key: i, go: _this.expandOrGo });
          })
        )
      );
    }, _this.renderArrow = function (sectionItem) {
      var section = _this.state.section;


      if (!section) {
        return null;
      }

      if (section.id != sectionItem.id) {
        return null;
      }

      return React.createElement("div", { className: "locked background--dark-primary", style: {
          height: 0,
          width: 0,
          background: "transparent",
          borderWidth: "0 15px 10px 15px",
          borderColor: "transparent transparent #303030 transparent",
          borderStyle: "solid",
          marginBottom: "-10px",
          left: "50%",
          marginLeft: "-10px",
          marginTop: "2px"
        } });
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  SectionItem.prototype.render = function render() {
    var _this2 = this;

    var sections = this.props.sections;


    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "soft-half-right soft-left" },
        React.createElement(
          "div",
          { className: "grid" },
          React.createElement(
            "div",
            { className: "grid__item one-whole" },
            React.createElement(
              "div",
              { className: "grid" },
              sections.map(function (sectionItem, i) {
                return React.createElement(
                  Item,
                  { section: sectionItem, key: i, go: _this2.expandOrGo },
                  _this2.renderArrow(sectionItem)
                );
              })
            )
          )
        )
      ),
      React.createElement(
        "div",
        { className: "one-whole" },
        React.createElement(
          _velocityReact.VelocityTransitionGroup,
          {
            enter: {
              animation: "slideDown", duration: 250
            },
            leave: {
              animation: "slideUp", duration: 250
            }
          },
          this.renderChildren()
        )
      )
    );
  };

  return SectionItem;
}(_react.Component), _class.propTypes = {
  sections: _react.PropTypes.array,
  hide: _react.PropTypes.func.isRequired
}, _temp2);
exports["default"] = SectionItem;
module.exports = exports['default'];