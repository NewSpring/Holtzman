import { Component, PropTypes } from "react"
import { Link } from "react-router"

export default class SearchItem extends Component {

  render() {

    return (
      <div className="background--light-primary push-half-bottom outlined--light" style={{ position: "relative", maxHeight: "144px" }}>
        <div className="grid flush">

          <div className="grid__item three-fifths soft-half">
            <h6>{this.props.item.title}</h6>
            <p className="small">{this.props.item.description}</p>
          </div>

          <div
            className="grid__item two-fifths ratio--square hard soft-half-left background--cover"
            style={{
              backgroundImage: `url(${this.props.item.image})`
            }}
            >
          </div>

        </div>
      </div>
    );

  }

}
