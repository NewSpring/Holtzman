// @flow

import moment from "moment";
import { Success as SuccessIcon } from "../../@primitives/UI/icons";

type IScheduleThanks = {
  total: string,
  schedule: Object | false,
};

const ScheduleThanks = ({ total, schedule }: IScheduleThanks) => {
  if (!schedule || !schedule.start) return null;
  return (
    <p className="text-left">
      Thank you for your contribution of {total}{" "}
      starting on { moment(schedule.start).format("MMM D, YYYY") }{" "}
      to NewSpring Church.
    </p>
  );
};

type IOneTimeThanks = {
  total: string,
  email: string,
  schedule: Object | boolean,
};

const OneTimeThanks = ({ total, email, schedule }: IOneTimeThanks) => {
  if (schedule) return null;
  return (
    <p className="text-left">
      Thank you for your contribution of {total} to NewSpring Church.
      We will email a receipt to {email}
    </p>
  );
};

type IAdditionalMessage = {
  additionalMessage?: string,
};

const AdditionalMessage = ({ additionalMessage }: IAdditionalMessage) => {
  if (!additionalMessage) return null;
  return <h5>{additionalMessage}</h5>;
};

type ICreateAccountFromGuest = {
  guest: boolean,
  onClick?: Function,
};

const CreateAccountFromGuest = ({ guest, onClick }: ICreateAccountFromGuest) => {
  if (!guest || !onClick) return null;
  return (
    <div>
      <p className="text-left">
        If you would like to view your giving history,
        make it easier to give, and more, create a NewSpring Account!
      </p>
      <button className="btn one-whole push-bottom" onClick={onClick}>
        Create Account
      </button>
    </div>
  );
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

type ISuccess = {
  total: string,
  email: string,
  guest: boolean,
  onClick?: Function,
  schedule: Object,
  additionalMessage?: string,
};

const Success = ({
  total,
  email,
  guest,
  onClick,
  schedule,
  additionalMessage,
}: ISuccess) => (
  <div className="soft soft-double-ends push-double-top@anchored one-whole text-center">
    <div className="push-double-top">
      <SuccessIcon />
      <h3 className="text-primary push-ends">Success!</h3>

      <ScheduleThanks total={total} schedule={schedule || false} />

      <OneTimeThanks total={total} email={email} schedule={schedule || false} />

      <AdditionalMessage additionalMessage={additionalMessage} />

      <CreateAccountFromGuest guest={guest} onClick={onClick} />

      <ContactUs />
    </div>
  </div>
);

export default Success;

export {
  ScheduleThanks,
  OneTimeThanks,
  AdditionalMessage,
  CreateAccountFromGuest,
  ContactLink,
  ContactUs,
};
