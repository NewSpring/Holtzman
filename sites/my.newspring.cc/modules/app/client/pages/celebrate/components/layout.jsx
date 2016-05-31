
import { Component, PropTypes} from "react"

import ImageLoader from "../../../../../../../../apollos/core/components/loading/ImageLoader"
import Styles from "../../../../../../../../apollos/core/components/loading/FeedItemSkeleton.css"

export const Stats = ({ children, className }) => (
  <div className={`soft-top soft-sides soft-double-top@lap-and-up ${className}`}>
    <div className="text-center one-whole two-thirds@lap one-half@lap-wide-and-up display-inline-block">
      {children}
    </div>
  </div>
)

export const Leaves = ({ children }) => (
  <div className="relative one-whole soft-double-top soft-bottom push-double-top">
    {children}
  </div>
)



export class Image extends Component {

  preloader(){
    return (
      <div className={`${this.imageclasses.join(" ")} ${Styles["load-item"]}`}>
      </div>
    )
  }

  renderElement(){
    return (
      <div className={`${this.imageclasses.join(" ")}`} style={this.style}>
      </div>
    )
  }

  render() {
    const { url } = this.props
    return (
      <div className="grid__item one-whole one-half@lap-wide-and-up" style={{ verticalAlign: "middle" }}>
        <div className="text-center push-double-top">
          <div className="three-quarters one-half@lap ratio--square display-inline-block">
            <ImageLoader
              src={url}
              preloader={this.preloader}
              renderElement={this.renderElement}
              imageclasses={["ratio__item", "one-whole", "round", "background--fill"]}
              style={{
                backgroundImage: `url(${url})`
              }}
            />
          </div>
        </div>
      </div>
    )

  }
}

export const Body = ({ children, rev }) => {

  if (rev) {
    return (
      <div className="grid__item one-whole one-half@lap-wide-and-up soft-double-left@lap-and-up" style={{ verticalAlign: "middle" }}>
        <div className="soft-double-sides@lap soft-double-left@lap-and-up soft-double-ends text-left">
          {children}
        </div>
      </div>
    )
  }
  return (
    <div className="grid__item one-whole one-half@lap-wide-and-up soft-double-right@lap-and-up" style={{ verticalAlign: "middle" }}>
      <div className="soft-double-sides@lap soft-double-right@lap-and-up soft-double-ends text-left">
        {children}
      </div>
    </div>
  )
}
