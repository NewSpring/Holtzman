import { Component, PropTypes } from "react";

export default class ScriptureItem extends Component {

  static propTypes = {
    scripture: PropTypes.string.isRequired
  }

  state = {
    scriptureData: ""
  }

  formatScripture = () => {
    return `${this.props.scripture.book} ${this.props.scripture.passage}`
  }

  getScriptureData = () => {
    Meteor.call("getScripture", this.formatScripture(), function(err, data) {
      this.setState({ scriptureData: data });
    }.bind(this));
  }

  componentWillMount() {
    this.getScriptureData()
  }

  createMarkup = () => {
    return {
      __html: this.state.scriptureData
    }
  }

  render() {

    const { scriptureData } = this.state

    return (
      <div className="soft push-top">
        <h4 className="soft-bottom display-inline-block">{this.formatScripture()}</h4>
        <p className="small push-half-left display-inline-block">ESV</p>
        {(() => {
          if (scriptureData.length === 0) return <p>Loading...</p>
          return <div dangerouslySetInnerHTML={this.createMarkup()} />
        })()}
      </div>
    );

  }

}
