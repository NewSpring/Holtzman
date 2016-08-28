
import { Component, PropTypes } from "react";
import Meta from "apollos-core/dist/core/components/meta";
import Forms from "apollos-core/dist/core/components/forms";
import Loading from "apollos-core/dist/core/components/loading";

export default class Layout extends Component {

  dynamicItemWidth = () => {

    if (typeof window != "undefined" || window != null) {
      const itemSize = (window.innerWidth - 40) * 0.8; // four-fifths
      return { width: itemSize, height: itemSize }
    }

    return {}

  }

  dynamicWidth = () => {
    let { campuses } = this.props.data;

    if (!campuses) return {};

    if (typeof window != "undefined" || window != null) {
      let itemSize = (window.innerWidth - 40) * 0.8; // four-fifths
      itemSize += 20; // account for margin
      const items = campuses.filter(x => x.location.street1).length;
      const width = (items * itemSize) + 40;
      return { width: `${width}px` }
    }

    return {}
  }

  overflow = {
    overflowX: "scroll",
    overflowY: "hidden",
    "WebkitOverflowScrolling": "touch"
  }

  render() {
    let { campuses } = this.props.data;

    return (
      <div>

        {/* Slider */}
        <div className="background--light-secondary soft-ends text-center">
          <h3 className="push-half-top">Find A Campus</h3>
          <div style={this.overflow}>
            <section   className="soft-half" style={this.dynamicWidth()}>
              {campuses && campuses.filter(x => x.location.street1).map((campus) => (
              <div
                  key={campus.id}
                  className="text-dark-secondary floating ratio--square display-inline-block rounded  push-right card text-left"
                  style={this.dynamicItemWidth()}>
                  <div className="one-whole soft-sides text-left floating__item">
                    <h4>{campus.name}</h4>
                    <h6 className="text-dark-secondary flush-bottom">{campus.location.street1}</h6>
                    <h6 className="text-dark-secondary">{campus.location.city}, {campus.location.state}</h6>
                    <p className="flush">
                      <a href="#">Get Directions</a>
                    </p>
                  </div>
                </div>
              ))}
            </section>
          </div>
        </div>

        {/* Search */}
        <div className="soft soft-double-ends soft-double@lap-and-up text-center background--light-primary">
          <h3 className="push-half-ends">Find Your Closest Campus</h3>
          <Forms.Form
            classes={["hard", "display-inline-block", "one-whole" ]}
            submit={(e) => this.findByQuery(e)}
          >
            <i className="icon-search locked-left soft-half-left"></i>
            {/*<span
              style={{zIndex: 1, paddingTop: "5px", "cursor": "pointer"}}
              className="h7 locked-right flush-bottom"
            >Cancel</span>*/}
            <Forms.Input
              hideLabel={true}
              classes={["hard-bottom"]}
              inputClasses="soft-double-left soft-half-bottom"
              placeholder="Type your search here..."
              type="text"
              onChange={(e) => this.inputOnChange(e)}
            />

          <div className="one-whole text-left">
              <h6><em>Find a campus by city, state, or zip</em></h6>
            </div>
          </Forms.Form>

        </div>
      </div>
    );
  }
}
