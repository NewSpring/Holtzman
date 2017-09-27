import PropTypes from 'prop-types';
import React, { Component } from "react";
import Debouncer from "../../../../util/debounce";

const { span } = React.DOM;

const Status = {
  PENDING: "pending",
  LOADING: "loading",
  LOADED: "loaded",
  FAILED: "failed",
};

export default class ImageLoader extends Component {
  static propTypes = {
    wrapper: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
    preloader: PropTypes.func,
    src: PropTypes.string,
    onLoad: PropTypes.func,
    onError: PropTypes.func,
    imgProps: PropTypes.object,
    force: PropTypes.bool,
    renderElement: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  };

  static defaultProps = {
    wrapper: span,
  };

  constructor(props) {
    super(props);
    this.state = { status: props.src ? Status.LOADING : Status.PENDING };
  }

  componentDidMount() {
    if (this.state.status === Status.LOADING) {
      this.createLoader();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.src !== nextProps.src) {
      this.setState({
        status: nextProps.src ? Status.LOADING : Status.PENDING,
      });
    }
  }

  componentDidUpdate() {
    if (this.state.status === Status.LOADING && !this.img) {
      this.createLoader();
    }
  }

  componentWillUnmount() {
    this.destroyLoader();
  }

  getClassName() {
    let className = `imageloader ${this.state.status}`;
    if (this.props.className) className = `${className} ${this.props.className}`;
    return className;
  }

  createLoader() {
    this.destroyLoader();  // We can only have one loader at a time.

    const makeImage = () => {
      this.img = new Image();
      this.img.onload = ::this.handleLoad;
      this.img.onerror = ::this.handleError;
      this.img.src = this.props.src;
    };

    if (Meteor.isServer) {
      makeImage();
      return;
    }


    // lazy load only if in view on client
    let el = this.loader;
    el = el.children[0];

    const isElementInView = e => {
      const coords = e.getBoundingClientRect();
      return (
        // if item is left of the screen's left side
        Math.abs(coords.left) >= 0 &&
        // if item is within two screens
        Math.abs(coords.top) <= (window.innerHeight || document.documentElement.clientHeight) * 2
      );
    };

    const seeIfInView = () => {
      if (isElementInView(el)) {
        // callback to make sure user really intends to view content
        // prevents accidental firing on scrolling past
        const callback = () => {
          if (isElementInView(el)) {
            window.removeEventListener("scroll", this.debounce, false);
            makeImage();
            return;
          }
          // remove related event listener and add a new one back
          window.removeEventListener("scroll", this.debounce, false);
          window.addEventListener("scroll", this.debounce, false);
          return;
        };
        // SetTimeout to prevent false calls on scrolling
        setTimeout(callback, 300);
        // remove inital eventlistener to scope a new one inside the timeout function
        window.removeEventListener("scroll", this.debounce, false);
        return;
      }
    };

    if (isElementInView(el) || this.props.force) {
      makeImage();
      return;
    }

    this.debounce = new Debouncer(seeIfInView);
    window.addEventListener("scroll", this.debounce, false);
  }

  destroyLoader() {
    if (this.img) {
      this.img.onload = null;
      this.img.onerror = null;
      this.img = null;
    }

    if (this.debounce) {
      window.removeEventListener("scroll", this.debounce, false);
    }
  }

  handleLoad(event) {
    this.destroyLoader();
    this.setState({ status: Status.LOADED });

    if (this.props.onLoad) this.props.onLoad(event);
  }

  handleError(error) {
    this.destroyLoader();
    this.setState({ status: Status.FAILED });

    if (this.props.onError) this.props.onError(error);
  }

  renderImg() {
    const { src, imgProps } = this.props;
    const props = { src };

    // eslint-disable-next-line no-restricted-syntax
    for (const k in imgProps) {
      // eslint-disable-next-line no-prototype-builtins
      if (imgProps.hasOwnProperty(k)) {
        props[k] = imgProps[k];
      }
    }

    return <img role="presentation" {...props} />;
  }

  render() {
    const wrapperProps = {
      className: this.getClassName(),
    };

    if (this.props.style) {
      const style = { ...this.props.style };
      delete style.backgroundImage;
      wrapperProps.style = style;

      if (this.state.status === Status.LOADED) {
        wrapperProps.style.backgroundImage = this.props.style.backgroundImage;
      }
    }

    const wrapperArgs = [wrapperProps];

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

    return (
      <span ref={node => { this.loader = node; }}>
        {this.props.wrapper(...wrapperArgs)}
      </span>
    );
  }
}
