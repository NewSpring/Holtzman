// @flow
import Forms from "../../../../@primitives/UI/forms";

type ISavePaymentCheckBox = {
  savedAccount: Object,
  savePayment: Function,
  shouldSaveState: boolean,
  schedule: Object,
  transactionType: string,
};

/* eslint-disable max-len */
const SavePaymentCheckBox = ({
  savedAccount,
  savePayment,
  shouldSaveState,
  schedule,
  transactionType,
}: ISavePaymentCheckBox) => {
  if (
    !savedAccount.id &&
    transactionType !== "guest" &&
    !schedule.start
  ) {
    return (
      <Forms.Checkbox
        name="savePayment"
        defaultValue={shouldSaveState}
        clicked={savePayment}
      >
        Save this payment for future contributions
      </Forms.Checkbox>
    );
  } else if (schedule.start) {
    return (
      <div>
        <p><small><em>Our payment provider does not allow creating a saved payment when setting up a contribution schedule. To save a payment, please give a one time contribution. We are sorry for any inconvenience this may cause</em></small></p>
      </div>
    );
  }
  return null;
};

export default SavePaymentCheckBox;
