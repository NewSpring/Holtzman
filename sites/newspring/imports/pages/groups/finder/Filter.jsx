import { Component } from "react";
import { connect } from "react-apollo";
import gql from "apollo-client/gql";

import Loading from "apollos/dist/core/components/loading/index";
import Forms from "apollos/dist/core/components/forms";

import Tag from "../components/Tag";

const mapQueriesToProps = () => ({
  attributes: {
    query: gql`
      query GetGroupAttributes {
        tags: groupAttributes {
          id
          description
          value
        }
      }
    `,
  },
})

let defaultTags = [];
@connect({ mapQueriesToProps })
export default class Filter extends Component {

  state = {
    toggled: false,
    showSearch: false,
    query: null,
  }

  onClick = () => this.setState({
    toggled: !this.state.toggled,
    showSearch: this.state.showSearch,
  });

  onToggleSearch = () => this.setState({
    toggled: this.state.toggled,
    showSearch: !this.state.showSearch,
  });

  findByQuery = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    console.log("submitting...")
  }

  inputOnChange = (value) => {
    this.setState({
      toggled: this.state.toggled,
      showSearch: this.state.showSearch,
      query: value,
    });
  }

  render() {
    const { attributes } = this.props;
    let tags = attributes.tags ? attributes.tags : defaultTags;
    const { toggled, showSearch } = this.state;
    return (
      <div>
        <div
          onClick={this.onClick}
          style={{verticalAlign: "middle"}}
          className="background--light-primary soft-half-bottom soft-top soft-sides soft-double-sides@anchored outlined--light outlined--bottom"
        >
          <h6 className="float-left flush-bottom text-dark-tertiary" style={{verticalAlign: "middle"}}>
            {toggled ? "Hide" : "See"} All Tags
          </h6>
          <span className={`float-right icon-arrow-${toggled ? "up" : "down"}`} style={{verticalAlign: "middle"}}></span>

        </div>

        {/* filter internals */}
        {(() => {
          if (!toggled) return null; // hidden
          if (!tags.length) return null; // XXX loading....
          return (
            <div className="outlined--light outlined--bottom soft-half-sides soft-ends soft-double-ends@anchored text-center background--light-primary">
              <h4 className="soft-half-bottom flush-bottom">
                Featured Tags
              </h4>
              <div className="two-thirds@anchored display-inline-block soft-ends@anchored">
                {tags.map((tag, key) => <Tag key={key} val={tag.value} />)}
              </div>
            </div>
          )
        })()}

        {(() => {
          if (!showSearch) return null;
          return (
            <div className="outlined--light outlined--bottom soft-half-sides soft-ends soft-double-ends@anchored text-left background--light-primary">

              <Forms.Form
                classes={["hard", "display-inline-block", "one-whole" ]}
                submit={(e) => this.findByQuery(e)}
              >
                <i className="icon-search locked-left"></i>
                <i
                  onClick={() => this.onToggleSearch()}
                  className="icon-close locked-right soft-half-right"
                ></i>
                <Forms.Input
                  hideLabel={true}
                  classes={["hard-bottom", "soft-double-right"]}
                  inputClasses={["soft-double-left"]}
                  placeholder="Type your search here..."
                  type="text"
                  onChange={(e) => this.inputOnChange(e)}
                />

                <div className="one-whole text-left">
                  <h6><em>Find a group by zipcode, name, or description</em></h6>
                </div>
              </Forms.Form>

            </div>
          )
        })()}
      </div>
    )
  }

}
