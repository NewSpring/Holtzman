import PropTypes from 'prop-types';
import { Component } from "react";

export default class ProgressStep extends Component {

  static propTypes = {
    steps: PropTypes.number.isRequired,
    active: PropTypes.number.isRequired,
  }

  getLayer = (count) =>
    ((this.props.steps + 2) - count);

  steps = () => {
    const { steps } = this.props;

    const stepsArray = [];
    for (let i = 0; i < steps; i += 1) {
      stepsArray.push(i);
    }

    return stepsArray.map((value, count) =>
      ({ count })
    );
  }

  render() {
    const steps = this.steps();

    return (
      <div className="progress-bar text-center">
        <div className="progress">

          {steps.map((step, key) => {
            const classes = [];
            const style = { zIndex: 1 };

            if (step.count + 1 <= this.props.active) {
              classes.push("progress__item--active");
            } else {
              classes.push("progress__item");
            }

            return (
              <div
                className={classes.join(" ")}
                style={style}
                key={key}
              />
            );
          })}

        </div>
        <p className="flush-bottom">
          <small className="italic display-inline-block push-half-top">
            Step {this.props.active} of {this.props.steps}
          </small>
        </p>
      </div>
    );
  }
}
