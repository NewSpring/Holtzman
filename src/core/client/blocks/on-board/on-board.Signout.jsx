import { Component, PropTypes} from "react"

export default class SignOut extends Component {



  render () {
    return (
      <div>
        <div className="push-double">
          <h4 className="text-center">
            Sign out of your NewSpring profile
          </h4>
        </div>
        <div className="one-whole text-center">
          <button className="btn" onClick={this.props.signout}>
            Sign Out
          </button>
        </div>
      </div>
    )
  }
}
