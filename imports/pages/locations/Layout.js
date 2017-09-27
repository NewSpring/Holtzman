
import PropTypes from 'prop-types';
import { Component } from "react";
import gql from "graphql-tag";

import { Link } from "react-router";
import inAppLink from "../../util/inAppLink";

import Meta from "../../components/shared/meta";
import Forms from "../../components/@primitives/UI/forms";

export const campusLookup = gql`
  query GeoLocate($origin: String, $destinations: String) {
    geolocate(origin: $origin, destinations: $destinations) {
      rows {
        elements {
          distance {
            text
            value
          }
          duration {
            text
            value
          }
          status
        }
      }
    }
  }
`;

export default class Layout extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    client: PropTypes.object,
  }

  state = { value: null, list: null }

  dynamicItemWidth = () => {
    if (typeof window !== "undefined" || window !== null) {
      const ratio = window.isTablet ? 0.4 : 0.8;
      const itemSize = (window.innerWidth - 40) * ratio; // four-fifths
      return { width: itemSize, height: itemSize };
    }

    return {};
  }

  dynamicWidth = () => {
    const { campuses } = this.props.data;

    if (!campuses) return {};

    if (typeof window !== "undefined" || window !== null) {
      const ratio = window.isTablet ? 0.4 : 0.8;
      let itemSize = (window.innerWidth - 40) * ratio; // four-fifths
      itemSize += 20; // account for margin
      const items = campuses.filter(x => x.location.street1).length;
      const width = (items * itemSize) + 40;
      return { width: `${width}px` };
    }

    return {};
  }

  findByQuery = e => {
    if (e && e.preventDefault) e.preventDefault();
    document.getElementById("search").blur();
    const { value } = document.getElementById("search");

    const campusList = this.props.data.campuses.filter(x => x.location.street1);
    const destinations = campusList.map(campus => (
      `${campus.location.street1} ${campus.location.zip}`
    )).join("|");

    const origin = value;
    // XXX this will break with new react-apollo
    this.props.client.query({
      query: campusLookup,
      variables: { destinations, origin },
    })
      .then(({ data }) => {
        const byLocations = [...data.geolocate.rows[0].elements];
        return byLocations.map((x, i) => {
          campusList[i].distance = x.distance;
          return campusList[i];
        });
      })
      .then(list => _.sortBy(list, (x => x.distance.value)))
      .then(list => this.setState({ list }))
      .then(() => {
        const element = this.slider;
        element.children[0].scrollIntoView({ block: "end", behavior: "smooth" });
        element.parentElement.scrollLeft += -20;
      })
      .catch(() => { /* do nothing */ });
  }

  overflow = {
    overflowX: "scroll",
    overflowY: "hidden",
    WebkitOverflowScrolling: "touch",
  }

  render() {
    let { campuses } = this.props.data;

    if (this.state.list) campuses = this.state.list;

    return (
      <div>
        <Meta title="Locations" />
        {/* Search */}
        <div
          className={
            "soft soft-double-ends soft-double@palm-wide-and-up " +
            "text-center background--light-primary"
          }
        >
          <h3 className="push-half-ends">Find Your Closest Campus</h3>
          <Forms.Form
            classes={["hard", "display-inline-block", "one-whole"]}
            submit={e => this.findByQuery(e)}
          >
            <i className="icon-search locked-left soft-half-left" />
            {/* <span
              style={{zIndex: 1, paddingTop: "5px", "cursor": "pointer"}}
              className="h7 locked-right flush-bottom"
            >Cancel</span>*/}
            <Forms.Input
              hideLabel
              classes={["hard-bottom"]}
              inputClasses="soft-double-left soft-half-bottom"
              placeholder="Type your search here..."
              type="text"
              id="search"
              onChange={({ value }) => this.setState({ value })}
            />

            <div className="one-whole text-left">
              <h6><em>Find a campus by city, state, or zip</em></h6>
            </div>
          </Forms.Form>

        </div>
        {/* End Search */}

        {/* Slider */}
        <div className="background--light-secondary soft-ends text-center">
          <h3 className="push-half-top">Campus Directory</h3>
          <div style={this.overflow} className="soft-left@palm-wide-and-up">
            <section
              className="soft-half"
              style={this.dynamicWidth()}
              ref={n => { this.slider = n; }}
            >
              {campuses && campuses.filter(x => x.location.street1).map((campus, i) => {
                const style = this.dynamicItemWidth();
                if (i === 0 && this.state.list) {
                  style.borderColor = "#6bac43";
                  style.borderStyle = "solid";
                  style.borderWidth = "3px";
                }
                return (
                  <Link
                    key={campus.id || i}
                    to={campus.url}
                    className={
                      "text-dark-secondary transition floating ratio--square " +
                      "display-inline-block rounded  push-right card text-left"
                    }
                    style={style}
                    onClick={inAppLink}
                  >
                    <div className="one-whole soft-sides text-left floating__item">
                      <h4>{campus.name}</h4>
                      {(() => {
                        if (!campus.distance || !campus.distance.value) return null;
                        return (
                          <h7 className="italic display-block">
                            {(campus.distance.value * 0.000621371192).toFixed(2)} miles away
                          </h7>
                        );
                      })()}
                      {campus.services && campus.services.map((x, key) =>
                        (<p className="flush-bottom soft-half-bottom" key={key}>{x}</p>))
                      }
                      <h5 className="text-primary plain">
                        Learn More <span className="icon-arrow-next text-primary" />
                      </h5>
                    </div>
                  </Link>
                );
              })}
            </section>
          </div>
        </div>
        {/* End Slider */}

      </div>
    );
  }
}
