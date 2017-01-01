// @flow

import { Error } from "../../@primitives/UI/icons";

const ERROR_HEADING = "Uh Oh! Looks like there was a problem processing your contribution!";
const STEP_ONE_MESSAGE = "Try Again";
const CONTACT_MESSAGE = "If you would like a member of our customer support team to follow up with you regarding this error, click";

type IStepOneAction = {
  goToStepOne?: Function,
};

const StepOneAction = ({ goToStepOne }: IStepOneAction) => {
  if (!goToStepOne) return null;
  return (
    <div className="one-whole text-center soft-ends">
      <button onClick={goToStepOne} className="btn--small btn--dark-tertiary one-whole">
        {STEP_ONE_MESSAGE}
      </button>
    </div>
  );
};

type IAdditionalMessage = {
  additionalMessage?: string,
};

const AdditionalMessage = ({ additionalMessage }: IAdditionalMessage) => {
  if (!additionalMessage) return null;
  return <h5>{additionalMessage}</h5>;
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

type IErr = {
  msg: string,
  goToStepOne?: Function,
  additionalMessage?: string,
};

const Err = ({ msg, goToStepOne, additionalMessage }: IErr) => (
  <div className="soft soft-double-ends push-double-top@anchored one-whole text-center">
    <div className="push-double-top">
      <Error />
      <h3 className="text-alert push-ends">{ERROR_HEADING}</h3>
      <p className="text-left">
        {msg}
      </p>

      {goToStepOne && <StepOneAction goToStepOne={goToStepOne} />}

      <AdditionalMessage additionalMessage={additionalMessage} />

      <ContactUs />
    </div>
  </div>
);

export default Err;

export {
  StepOneAction,
  AdditionalMessage,
  ContactLink,
  ContactUs,
};
