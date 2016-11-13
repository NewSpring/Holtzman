import { PropTypes } from "react";
import Forms from "../../../../components/forms";

const SavePaymentInput = ({
  saveName,
  savedAccount,
  schedules,
  shouldSaveState,
  payment,
  transactionType,
}) => {
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

SavePaymentInput.propTypes = {
  saveName: PropTypes.func,
  savedAccount: PropTypes.object,
  schedules: PropTypes.array,
  shouldSaveState: PropTypes.bool,
  payment: PropTypes.object,
  transactionType: PropTypes.string,
};

export default SavePaymentInput;
