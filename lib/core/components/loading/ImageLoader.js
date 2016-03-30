"use strict";

exports.__esModule = true;
exports["default"] = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _debounce = require("./../../util/debounce");

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var span = _react2["default"].DOM.span;


var Status = {
  PENDING: 'pending',
  LOADING: 'loading',
  LOADED: 'loaded',
  FAILED: 'failed'
};

var ImageLoader = (_temp = _class = function (_Component) {
  (0, _inherits3["default"])(ImageLoader, _Component);

  function ImageLoader(props) {
    (0, _classCallCheck3["default"])(this, ImageLoader);

    var _this = (0, _possibleConstructorReturn3["default"])(this, _Component.call(this, props));

    _this.state = { status: props.src ? Status.LOADING : Status.PENDING };
    return _this;
  }

  ImageLoader.prototype.componentDidMount = function componentDidMount() {
    if (this.state.status === Status.LOADING) {
      this.createLoader();
    }
  };

  ImageLoader.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (this.props.src !== nextProps.src) {
      this.setState({
        status: nextProps.src ? Status.LOADING : Status.PENDING
      });
    }
  };

  ImageLoader.prototype.componentDidUpdate = function componentDidUpdate() {
    if (this.state.status === Status.LOADING && !this.img) {
      this.createLoader();
    }
  };

  ImageLoader.prototype.componentWillUnmount = function componentWillUnmount() {
    this.destroyLoader();
  };

  ImageLoader.prototype.getClassName = function getClassName() {
    var className = "imageloader " + this.state.status;
    if (this.props.className) className = className + " " + this.props.className;
    return className;
  };

  ImageLoader.prototype.createLoader = function createLoader() {
    var _this2 = this;

    this.destroyLoader(); // We can only have one loader at a time.

    var makeImage = function makeImage() {
      _this2.img = new Image();
      _this2.img.onload = _this2.handleLoad.bind(_this2);
      _this2.img.onerror = _this2.handleError.bind(_this2);
      _this2.img.src = _this2.props.src;
    };

    if (Meteor.isServer) {
      makeImage();
      return;
    }

    // lazy load only if in view on client
    var el = ReactDOM.findDOMNode(this.refs["loader"]);
    el = el.children[0];

    var isElementInView = function isElementInView(e) {
      var coords = e.getBoundingClientRect();
      return (Math.abs(coords.left) >= 0 && Math.abs(coords.top)) <= (window.innerHeight || document.documentElement.clientHeight);
    };

    var seeIfInView = function seeIfInView() {

      if (isElementInView(el)) {

        // callback to make sure user really intends to view content
        // prevents accidental firing on scrolling past
        var callback = function callback() {

          if (isElementInView(el)) {
            window.removeEventListener("scroll", _this2.debounce, false);
            makeImage();
            return;
          }

          // remove related event listener and add a new one back
          window.removeEventListener("scroll", _this2.debounce, false);
          window.addEventListener("scroll", _this2.debounce, false);
          return;
        };

        // SetTimeout to prevent false calls on scrolling
        setTimeout(callback, 300);

        // remove inital eventlistener to scope a new one inside the timeout function
        window.removeEventListener("scroll", _this2.debounce, false);

        return;
      }
    };

    if (isElementInView(el) || this.props.force) {
      makeImage();
      return;
    }

    this.debounce = new _debounce2["default"](seeIfInView);
    window.addEventListener("scroll", this.debounce, false);
  };

  ImageLoader.prototype.destroyLoader = function destroyLoader() {
    if (this.img) {
      this.img.onload = null;
      this.img.onerror = null;
      this.img = null;
    }

    if (this.debounce) {
      window.removeEventListener("scroll", this.debounce, false);
    }
  };

  ImageLoader.prototype.handleLoad = function handleLoad(event) {
    this.destroyLoader();
    this.setState({ status: Status.LOADED });

    if (this.props.onLoad) this.props.onLoad(event);
  };

  ImageLoader.prototype.handleError = function handleError(error) {
    this.destroyLoader();
    this.setState({ status: Status.FAILED });

    if (this.props.onError) this.props.onError(error);
  };

  ImageLoader.prototype.renderImg = function renderImg() {
    var _props = this.props;
    var src = _props.src;
    var imgProps = _props.imgProps;

    var props = { src: src };

    for (var k in imgProps) {
      if (imgProps.hasOwnProperty(k)) {
        props[k] = imgProps[k];
      }
    }

    return _react2["default"].createElement("img", props);
  };

  ImageLoader.prototype.render = function render() {
    var _props2;

    var wrapperProps = {
      className: this.getClassName()
    };

    if (this.props.style) {
      var style = (0, _extends3["default"])({}, this.props.style);
      delete style.backgroundImage;
      wrapperProps.style = style;

      if (this.state.status === Status.LOADED) {
        wrapperProps.style.backgroundImage = this.props.style.backgroundImage;
      }
    }

    var wrapperArgs = [wrapperProps];

    switch (this.state.status) {
      case Status.LOADED:
        if (this.props.renderElement) {
          wrapperArgs.push(this.props.renderElement());
        } else {
          wrapperArgs.push(this.renderImg());
        }
        break;

      case Status.FAILED:
        if (this.props.children) wrapperArgs.push(this.props.children);
        break;

      default:
        if (this.props.preloader) wrapperArgs.push(this.props.preloader());
        break;
    }

    return _react2["default"].createElement(
      "span",
      { ref: "loader" },
      (_props2 = this.props).wrapper.apply(_props2, wrapperArgs)
    );
  };

  return ImageLoader;
}(_react.Component), _class.propTypes = {
  wrapper: _react.PropTypes.func,
  className: _react.PropTypes.string,
  style: _react.PropTypes.object,
  preloader: _react.PropTypes.func,
  src: _react.PropTypes.string,
  onLoad: _react.PropTypes.func,
  onError: _react.PropTypes.func,
  imgProps: _react.PropTypes.object
}, _class.defaultProps = {
  wrapper: span
}, _temp);
exports["default"] = ImageLoader;
module.exports = exports['default'];