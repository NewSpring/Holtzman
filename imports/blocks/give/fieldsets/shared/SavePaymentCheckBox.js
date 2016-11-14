// @flow
import Forms from "../../../../components/forms";

type ISavePaymentCheckBox = {
  savedAccount: Object,
  savePayment: Function,
  shouldSaveState: boolean,
  schedules: Object,
  transactionType: string,
};

const SavePaymentCheckBox = ({
  savedAccount,
  savePayment,
  shouldSaveState,
  schedules,
  transactionType,
}: ISavePaymentCheckBox) => {
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

export default SavePaymentCheckBox;
