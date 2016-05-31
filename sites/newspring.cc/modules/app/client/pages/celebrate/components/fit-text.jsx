
import { Component, PropTypes } from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";

const map = (store) => ({
  width: store.responsive.width
})

@connect(map)
export default class FitText extends Component {

  static defaultProps = {
    compressor: 1.0,
    minFontSize: Number.NEGATIVE_INFINITY,
    maxFontSize: Number.POSITIVE_INFINITY
  }

  static propTypes: {
    children: PropTypes.element.isRequired,
    compressor: PropTypes.number,
    minFontSize: PropTypes.number,
    maxFontSize: PropTypes.number,
  }

  componentDidUpdate() {
    this.setFontSize()
  }

  componentDidMount() {
    this.setFontSize()
  }

  setFontSize = () => {
    const element = ReactDOM.findDOMNode(this);
    const width = element.offsetWidth;

    element.style.fontSize = Math.max(
      Math.min(
        (width / (this.props.compressor * 10)),
        parseFloat(this.props.maxFontSize)),
        parseFloat(this.props.minFontSize)
      ) + "px";
  }

  render() {
    return this.props.children;
  }
}
