
import { Component, PropTypes } from "react";
import Meta from "apollos-core/dist/core/components/meta";
import Forms from "apollos-core/dist/core/components/forms";
import Loading from "apollos-core/dist/core/components/loading";
import gql from 'apollo-client/gql';

const campusLookup = gql`
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
`

export default class Layout extends Component {

  state = { value: null, list: null }

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

  findByQuery = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    document.getElementById("search").blur();
    const { value } = document.getElementById("search");

    const campusList = this.props.data.campuses.filter(x => x.location.street1);
    const destinations = campusList.map(campus => (
      `${campus.location.street1} ${campus.location.zip}`
    )).join("|");

    const origin = value;
    // XXX this will break with new react-apollo
    this.props.query({
      query: campusLookup,
      variables: { destinations, origin }
    })
      .then(({ data }) => {
        const byLocations = [...data.geolocate.rows[0].elements];
        return byLocations.map((x, i) => {
          campusList[i].distance = x.distance;
          return campusList[i];
        })
      })
      .then((list) => _.sortBy(list, (x => x.distance.value)))
      .then(list => this.setState({ list }))
  }

  overflow = {
    overflowX: "scroll",
    overflowY: "hidden",
    "WebkitOverflowScrolling": "touch"
  }

  render() {
    let { campuses } = this.props.data;

    if (this.state.list) campuses = this.state.list;

    return (
      <div>

        {/* Slider */}
        <div className="background--light-secondary soft-ends text-center">
          <h3 className="push-half-top">Find A Campus</h3>
          <div style={this.overflow}>
            <section   className="soft-half" style={this.dynamicWidth()}>
              {campuses && campuses.filter(x => x.location.street1).map((campus, i) => {
                let style = this.dynamicItemWidth();
                if (i === 0 && this.state.list) {
                  style.borderColor = "#6bac43";
                  style.borderStyle = "solid";
                  style.borderWidth = "3px";
                }
                return (
                  <div
                    key={campus.id}
                    className={`text-dark-secondary transition floating ratio--square display-inline-block rounded  push-right card text-left`}
                    style={style}>
                    <div className="one-whole soft-sides text-left floating__item">
                      <h4>{campus.name}</h4>
                      {campus.services && campus.services.map((x, key) => <p className="flush-bottom soft-half-bottom" key={key}>{x}</p>)}
                      <a href={campus.url} target="_blank" className="h5 plain">Get Directions <span className="icon-arrow-next text-primary" /></a>
                    </div>
                  </div>
                )
              })}
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
              id="search"
              onChange={({ value }) => this.setState({ value })}
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
