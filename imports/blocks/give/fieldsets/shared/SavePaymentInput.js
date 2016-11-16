// @flow
import Forms from "../../../../components/forms";

type ISavePaymentInput = {
  saveName: Function,
  savedAccount: Object,
  schedules: Object,
  shouldSaveState: boolean,
  payment: Object,
  transactionType: string,
};

const SavePaymentInput = ({
  saveName,
  savedAccount,
  schedules,
  shouldSaveState,
  payment,
  transactionType,
}: ISavePaymentInput) => {
  if (
    shouldSaveState &&
    !savedAccount.id &&
    transactionType !== "guest" &&
    Object.keys(schedules).length === 0
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
