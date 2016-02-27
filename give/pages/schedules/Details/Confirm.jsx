import { Component, PropTypes} from "react"
import { connect } from "react-redux"

import { Error } from "../../../../core/components/icons"
import { nav as navActions, modal as modalActions } from "../../../../core/store"

@connect()
export default class Err extends Component {

  onClick = () => {

    // follow up action
    if (this.props.onFinished) {
      this.props.onFinished()
    }

    this.back()

  }

  back = () => {
    this.props.dispatch(modalActions.hide())
  }


  render () {

    return (
      <div className="soft soft-double-ends push-double-top one-whole text-center">
        <div className="push-double-top">
          <Error />
          <h3 className="text-alert push-ends">Are you sure?</h3>
          <p className="text-left">
            Want to stop your scheduled gift? You can always create another when you're ready.
          </p>
          <button className="one-whole btn push-ends btn--alert" onClick={this.onClick}>
            Cancel Schedule
          </button>

          <button
            className="btn--thin btn--small btn--dark-tertiary one-whole"
            onClick={this.back}
          >
            Back to Gifts
          </button>

          <p className="test-dark-tertiary text-left">
            <em>
              If you would like a member of our customer support team to follow up with you regarding this gift, click <a href="#">here</a>
            </em>
          </p>
        </div>
      </div>
    )
  }
}
