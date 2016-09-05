
import { Component, PropTypes} from "react"

export default class Offline extends Component {
  render () {
    return (
      <div className="soft-ends text-left soft-sides floating outlined--light outlined">
        <h6 className="text-dark-secondary three-quarters flush floating__item">Save for offline listening</h6>
        <div className="float-right toggle-wrap floating__item">
          <input type="checkbox" name="toggle-switch" className="toggle-switch" id="offline"></input>
          <label htmlFor="offline"></label>
        </div>
      </div>
    )
  }
}
