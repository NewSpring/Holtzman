// @flow

import { Success as SuccessIcon } from "../../../../components/icons";

const CONTACT_MESSAGE_1 = "If you have any questions please call our Finance Team at 864-965-9990 or";
const CONTACT_MESSAGE_2 = "and someone will be happy to assist you.";

export const ContactLink = () => (
  <a
    target="_blank"
    rel="noopener noreferrer"
    href="//rock.newspring.cc/workflows/152?Topic=Stewardship"
  >
    contact us
  </a>
);

export const ContactUs = () => (
  <p className="test-dark-tertiary text-left">
    <em>
      {CONTACT_MESSAGE_1} <ContactLink /> {CONTACT_MESSAGE_2}
    </em>
  </p>
);

type ISuccess = {
  type: string,
  onClick?: Function,
};

export default ({
  onClick,
  type,
}: ISuccess) => (
  <div className="soft soft-double-ends push-double-top@anchored one-whole text-center">
    <div className="push-double-top">
      <SuccessIcon />
      <h3 className="text-primary push-ends">Success!</h3>

      {type === "update" && <p>Thank you for updating your saved account!</p>}
      {type !== "update" && <p>Your account has been removed!</p>}

      <button className="btn one-whole push-bottom" onClick={onClick}>
        Back To Dashboard
      </button>

      <ContactUs />
    </div>
  </div>
);
