
import { Component, PropTypes} from "react"
import { connect } from "react-redux";

import FitText from "./fit-text";


const getRatio = (width) => {
  if (width < 480) {
    return 0.8
  }

  if (width < 768) {
    return 0.6
  }

  if (width < 1025) {
    return 0.4
  }

  return 0.2

}

const dynamicWidthContainer = (count) => {

  if (typeof window != "undefined" && window != null) {
    let itemSize = (window.innerWidth - 40) * getRatio(window.innerWidth); // four-fifths
    itemSize += 20; // account for margin
    const width = (count * itemSize) + 40;
    return {
      width: `${width}px`
    }
  }

  return {}
}

const dynamicWidth = () => {

  if (typeof window != "undefined" && window != null) {
    const itemSize = (window.innerWidth - 40) * getRatio(window.innerWidth); // four-fifths
    return {
      width: itemSize,
      height: itemSize
    }
  }

  return {}

}

const dynamicSize = (text) => {

  if (text.length < 4) {
    return .2
  }

  if (text.length < 6) {
    return .35
  }

  if (text.length < 8) {
    return .4
  }

  if (text.length < 10) {
    return .5
  }


  if (text.length < 12) {
    return .6
  }

  return .7
}

const ListItem = ({ item, padding }) => (
  <div className={`card floating display-inline-block ${padding ? "push-right": ""}`} style={dynamicWidth()}>
    <div className="floating__item one-whole soft" >
      <FitText compressor={dynamicSize(item.count)}>
        <h1 className="uppercase flush-bottom soft-half-bottom" style={{
          fontWeight: "900",
        }}>
          {item.count}
        </h1>
      </FitText>
      <FitText compressor={1.75}>
        <h5 className="flush-bottom">
          {item.label}
        </h5>
      </FitText>
    </div>
  </div>
)


const map = (store) => ({
  width: store.responsive.width
})
@connect(map)
export default class List extends Component {
  render () {
    const { items } = this.props;
    let count = 0;
    return (
      <div style={{
        overflowX: "scroll",
        overflowY: "hidden",
        "WebkitOverflowScrolling": "touch"
      }}>
        <section style={dynamicWidthContainer(items.length)}>
          {items.map((x, key) => {
            count ++
            return (
              <ListItem item={x} key={key} padding={items.length != count}/>
            )

          })}

        </section>
      </div>
    )
  }
}
