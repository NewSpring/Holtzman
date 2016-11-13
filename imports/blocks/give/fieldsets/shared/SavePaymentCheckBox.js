import { PropTypes } from "react";
import Forms from "../../../../components/forms";

const SavePaymentCheckBox = ({
  savedAccount,
  savePayment,
  shouldSaveState,
  schedules,
  transactionType,
}) => {
  if (
    !savedAccount.id &&
    transactionType !== "guest" &&
    Object.keys(schedules).length === 0
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
  }
  return null;
};

SavePaymentCheckBox.propTypes = {
  savedAccount: PropTypes.object,
  savePayment: PropTypes.func,
  shouldSaveState: PropTypes.bool,
  schedules: PropTypes.array,
  transactionType: PropTypes.string,
};

export default SavePaymentCheckBox;
