// @flow
import {
  ButtonText,
  cardType,
  Icon,
} from "./";

import { isIOS } from "../../../../util";

type IActionButton = {
  completeGift: Function,
  payment: Object,
  savedAccount: Object,
  schedules: Object,
  scheduleToRecover: boolean,
};

const ActionButton = ({
  completeGift,
  payment,
  savedAccount,
  schedules,
  scheduleToRecover,
}: IActionButton) => {
  if (isIOS()) {
    return (
      <div>
        <p className="text-dark-secondary">
          <small>
            <em>
              Due to restrictions with your operating system,
              you must complete your gift in the browser.
            </em>
          </small>
        </p>
        <button
          className="btn soft-half-top one-whole"
          onClick={completeGift}
        >
          Complete Gift in Browser
        </button>
      </div>
    );
  }
  return (
    <button className="btn soft-half-top one-whole" type="submit">
      <ButtonText
        payment={payment}
        savedAccount={savedAccount}
        schedules={schedules}
        scheduleToRecover={scheduleToRecover}
      />
      &nbsp;
      <Icon
        cardType={
          cardType(payment, savedAccount)
        }
      />
    </button>
  );
};

export default ActionButton;
