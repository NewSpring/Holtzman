// @flow
import Forms from "../../../../@primitives/UI/forms";

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
    !schedule.start
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
