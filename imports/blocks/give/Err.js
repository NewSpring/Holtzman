import { PropTypes } from "react";
import { Error } from "../../components/icons";

const ERROR_HEADING = "Uh Oh! Looks like there was a problem processing your contribution!";
const STEP_ONE_MESSAGE = "Try Again";
const CONTACT_MESSAGE = "If you would like a member of our customer support team to follow up with you regarding this error, click";

const StepOneAction = ({ goToStepOne }) => {
  if (!goToStepOne) return null;
  return (
    <div className="one-whole text-center soft-ends">
      <button onClick={goToStepOne} className="btn--small btn--dark-tertiary one-whole">
        {STEP_ONE_MESSAGE}
      </button>
    </div>
  );
};

StepOneAction.propTypes = {
  goToStepOne: PropTypes.function,
};

const AdditionalMessage = ({ additionalMessage }) => {
  if (!additionalMessage) return null;
  return <h5>{additionalMessage}</h5>;
};

AdditionalMessage.propTypes = {
  additionalMessage: PropTypes.string,
};

const ContactLink = () => (
  <a
    target="_blank"
    rel="noopener noreferrer"
    href="//rock.newspring.cc/workflows/152?Topic=Stewardship"
  >
    here
  </a>
);

const ContactUs = () => (
  <p className="test-dark-tertiary text-left">
    <em>
      {CONTACT_MESSAGE} <ContactLink />
    </em>
  </p>
);

const Err = ({ msg, goToStepOne, additionalMessage }) => (
  <div className="soft soft-double-ends push-double-top one-whole text-center">
    <div className="push-double-top">
      <Error />
      <h3 className="text-alert push-ends">{ERROR_HEADING}</h3>
      <p className="text-left">
        {msg}
      </p>

      <StepOneAction goToStepOne={goToStepOne} />

      <AdditionalMessage additionalMessage={additionalMessage} />

      <ContactUs />
    </div>
  </div>
);

Err.propTypes = {
  msg: PropTypes.string.isRequired,
  goToStepOne: PropTypes.func.isRequired,
  additionalMessage: PropTypes.string.isRequired,
};

export default Err;
