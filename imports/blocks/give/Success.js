import moment from "moment";
import { PropTypes } from "react";
import { Success as SuccessIcon } from "../../components/icons";

const ScheduleThanks = ({ total, schedule }) => {
  if (!schedule) return null;
  return (
    <p className="text-left">
      Thank you for your contribution of {total}
      starting on { moment(schedule.start).format("MMM D, YYYY") }
      to NewSpring Church.
    </p>
  );
};

ScheduleThanks.propTypes = {
  total: PropTypes.string.isRequired,
  schedule: PropTypes.object,
};

const OneTimeThanks = ({ total, email, schedule }) => {
  if (schedule) return null;
  return (
    <p className="text-left">
      Thank you for your contribution of {total} to NewSpring Church.
      We will email a receipt to {email}
    </p>
  );
};

OneTimeThanks.propTypes = {
  total: PropTypes.string,
  email: PropTypes.string,
  schedule: PropTypes.object,
};

const AdditionalMessage = ({ additionalMessage }) => {
  if (!additionalMessage) return null;
  return <h5>{additionalMessage}</h5>;
};

AdditionalMessage.propTypes = {
  additionalMessage: PropTypes.string,
};

const CreateAccountFromGuest = ({ guest, onClick }) => {
  if (!guest) return null;
  return (
    <div>
      <p className="text-left">
        If you would like to view your giving history,
        make it easier to give, and more, create a NewSpring Account!
      </p>
      <button className="btn one-whole push-bottom" onClick={onClick()}>
        Create Account
      </button>
    </div>
  );
};

CreateAccountFromGuest.propTypes = {
  guest: PropTypes.bool,
  onClick: PropTypes.func,
};

const CONTACT_MESSAGE_1 = "If you have any questions please call our Finance Team at 864-965-9990 or";
const CONTACT_MESSAGE_2 = "and someone will be happy to assist you.";

const ContactLink = () => (
  <a
    target="_blank"
    rel="noopener noreferrer"
    href="//rock.newspring.cc/workflows/152?Topic=Stewardship"
  >
    contact us
  </a>
);

const ContactUs = () => (
  <p className="test-dark-tertiary text-left">
    <em>
      {CONTACT_MESSAGE_1} <ContactLink /> {CONTACT_MESSAGE_2}
    </em>
  </p>
);

const Success = ({
  total,
  email,
  guest,
  onClick,
  schedules,
  additionalMessage,
}) => {
  const schedule = (schedules && schedules.length > 0) ? schedules[0] : false;
  return (
    <div className="soft soft-double-ends push-double-top one-whole text-center">
      <div className="push-double-top">
        <SuccessIcon />
        <h3 className="text-primary push-ends">Success!</h3>

        <ScheduleThanks total={total} schedule={schedule} />

        <OneTimeThanks total={total} email={email} />

        <AdditionalMessage additionalMessage={additionalMessage} />

        <CreateAccountFromGuest guest={guest} onClick={onClick} />

        <ContactUs />
      </div>
    </div>
  );
};

Success.propTypes = {
  total: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  guest: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  schedules: PropTypes.array.isRequired,
  additionalMessage: PropTypes.string.isRequired,
};

export default Success;
