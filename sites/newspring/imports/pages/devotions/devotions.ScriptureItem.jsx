import { Component, PropTypes } from "react";

export default class ScriptureItem extends Component {

  static propTypes = {
    scripture: PropTypes.string.isRequired
  }

  state = {
    scriptureData: ""
  }

  getScriptureData = () => {
    Meteor.call("getScripture", this.props.scripture, function(err, data) {
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
        <h4 className="soft-bottom display-inline-block">{this.props.scripture}</h4>
        <p className="small push-half-left display-inline-block">ESV</p>
        {() => {
          if (scriptureData.length === 0) {
            return <p>Loading...</p>
          } else {
            return <div dangerouslySetInnerHTML={this.createMarkup()} />
          }
        }()}
      </div>
    );

  }

}
