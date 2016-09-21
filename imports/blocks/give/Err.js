import { PropTypes } from "react";
import { Error } from "../../components/icons";

const Err = ({ msg, goToStepOne, additionalMessage }) => (
  <div className="soft soft-double-ends push-double-top one-whole text-center">
    <div className="push-double-top">
      <Error />
      <h3 className="text-alert push-ends">Uh Oh! Looks like there was a problem processing your contribution!</h3>
      <p className="text-left">
        {msg}
      </p>

      {goToStepOne && (
        <div className="one-whole text-center soft-ends">
          <button onClick={goToStepOne} className="btn--small btn--dark-tertiary one-whole">
            Try Again
          </button>
        </div>
        )
      }

      { additionalMessage &&
        (<h5>{additionalMessage}</h5>)
      }

      <p className="test-dark-tertiary text-left"><em>
        If you would like a member of our customer support team to follow up with you regarding this error, click <a target="_blank" rel="noopener noreferrer" href="//rock.newspring.cc/workflows/152?Topic=Stewardship">here</a>
      </em></p>
    </div>
  </div>
);

Err.propTypes = {
  msg: PropTypes.string.isRequired,
  goToStepOne: PropTypes.func.isRequired,
  additionalMessage: PropTypes.string.isRequired,
};

export default Err;
