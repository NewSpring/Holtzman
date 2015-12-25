import { Component, PropTypes} from "react"

export default class Progress extends Component {

  static propTypes = {
    steps: PropTypes.number.isRequired,
    active: PropTypes.number.isRequired
  }

  steps = () => {
    const { steps } = this.props

    let stepsArray = []
    for(var i = 0; i < steps; i++) {
      stepsArray.push(i)
    }

    return stepsArray.map((value, count) => {
      return { count }
    })
  }

  getLayer = (count) => {
    return (this.props.steps + 2 - count)
  }

  render () {

    const steps = this.steps()

    return (
      <div className="progress-bar text-center">
        <div className="progress">

          {steps.map((step, key) => {

            let classes = []
            const style = { zIndex: 1 }

            if (step.count + 1 <= this.props.active) {
              classes.push("progress__item--active")
            } else {
              classes.push("progress__item")
            }

            return (
              <div
                className={classes.join(" ")}
                style={style}
                key={key}
              >
              </div>
            )
          })}

        </div>
        <p>
          <small className="italic display-inline-block push-half-top">
            Step {this.props.active} of {this.props.steps}
          </small>
        </p>
      </div>
    )
  }
}
