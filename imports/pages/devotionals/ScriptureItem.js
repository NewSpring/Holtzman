/* eslint-disable react/no-danger */
import PropTypes from "prop-types";

import { Component } from "react";
import { Meteor } from "meteor/meteor";
import Loading from "../../components/@primitives/UI/loading";

export default class ScriptureItem extends Component {

  static propTypes = { scripture: PropTypes.string.isRequired }
  state = { scriptureData: null }

  componentWillMount() {
    Meteor.call("getScripture", this.props.scripture, (err, data) => {
      this.setState({ scriptureData: data });
    });
  }

  render() {
    const { scriptureData } = this.state;
    return (
      <div className="soft push-top">
        <h4 className="soft-bottom display-inline-block">{this.props.scripture}</h4>
        <p className="small push-half-left display-inline-block">ESV</p>
        {(() => {
          if (!scriptureData) return <div className="one-whole text-center"><Loading /></div>;
          return <div dangerouslySetInnerHTML={{ __html: scriptureData }} />;
        })()}
      </div>
    );
  }

}
