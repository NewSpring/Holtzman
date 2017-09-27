
import PropTypes from 'prop-types';
import React, { Component } from "react";
import { connect } from "react-redux";

class FitTextWithoutData extends Component {
  static propTypes = {
    compressor: PropTypes.number.isRequired,
    maxFontSize: PropTypes.number.isRequired,
    minFontSize: PropTypes.number.isRequired,
    children: PropTypes.object.isRequired,
  }

  static defaultProps = {
    compressor: 1.0,
    minFontSize: Number.NEGATIVE_INFINITY,
    maxFontSize: Number.POSITIVE_INFINITY,
  }

  componentDidMount() {
    this.setFontSize();
  }

  componentDidUpdate() {
    this.setFontSize();
  }

  setFontSize() {
    const element = this.element.children[0];
    const width = element.offsetWidth;
    const max = Math.max(
      Math.min(
        (width / (this.props.compressor * 10)),
        parseFloat(this.props.maxFontSize)),
        parseFloat(this.props.minFontSize),
    );
    element.style.fontSize = `${max}px`;
  }

  render() {
    return <div ref={node => { this.element = node; }}>{this.props.children}</div>;
  }
}

const map = store => ({
  width: store.responsive.width,
});

const FitText = connect(map)(FitTextWithoutData);
export default FitText;

export {
  FitTextWithoutData,
};
