// @flow
import Forms from "../../../../components/forms";
import { isIOS } from "../../../../util";

type ISavePaymentCheckBox = {
  savedAccount: Object,
  savePayment: Function,
  shouldSaveState: boolean,
  schedule: Object,
  transactionType: string,
};

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
    !schedule.start &&
    !isIOS()
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
