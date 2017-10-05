import PropTypes from "prop-types";
import { Component } from "react";
import { connect } from "react-redux";

import { Error } from "../../../../components/@primitives/UI/icons";

import { modal as modalActions } from "../../../../data/store";

class ConfirmWithoutData extends Component {

  static propTypes = {
    onFinished: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  onClick = () => {
    // follow up action
    if (this.props.onFinished) {
      this.props.onFinished();
    }

    this.back();
  }

  back = () => {
    this.props.dispatch(modalActions.hide());
  }


  /* eslint-disable max-len */
  render() {
    return (
      <div className="soft soft-double-ends push-double-top one-whole text-center">
        <div className="push-double-top">
          <Error />
          <h3 className="text-alert push-ends">Are you sure?</h3>
          <p className="text-left">
            Want to stop your scheduled contributions? You can always create another when you&#39;re ready.
          </p>
          <button className="one-whole btn push-ends btn--alert" onClick={this.onClick}>
            Cancel Schedule
          </button>

          <button
            className="btn--thin btn--small btn--dark-tertiary one-whole"
            onClick={this.back}
          >
            Back to Contributions
          </button>

          <p className="test-dark-tertiary text-left">
            <em>
              If you would like a member of our customer support team to follow up with you regarding your contributions, click <a rel="noopener noreferrer" target="_blank" href="//rock.newspring.cc/workflows/152?Topic=Stewardship">here</a>
            </em>
          </p>
        </div>
      </div>
    );
  }
  /* eslint-enable max-len */
}

export default connect()(ConfirmWithoutData);

export {
  ConfirmWithoutData,
};
