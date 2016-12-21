// @flow
import Forms from "../../../../components/forms";

import { isIOS } from "../../../../util";


type ISavePaymentInput = {
  saveName: Function,
  savedAccount: Object,
  schedule: Object,
  shouldSaveState: boolean,
  payment: Object,
  transactionType: string,
};

const SavePaymentInput = ({
  saveName,
  savedAccount,
  schedule,
  shouldSaveState,
  payment,
  transactionType,
}: ISavePaymentInput) => {
  if (
    shouldSaveState &&
    !savedAccount.id &&
    transactionType !== "guest" &&
    !schedule.start &&
    (transactionType === "savedPayment" || !isIOS())
  ) {
    return (
      <Forms.Input
        name="accountName"
        label="Saved Account Name"
        classes={["soft-bottom", "flush-bttom"]}
        errorText="Please enter a name for the account"
        validation={saveName}
        defaultValue={payment.type === "ach" ? "Bank Account" : "Credit Card"}
      />
    );
  }
  return null;
};

export default SavePaymentInput;
