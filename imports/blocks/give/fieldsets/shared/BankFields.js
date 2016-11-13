import { PropTypes } from "react";
import Forms from "../../../../components/forms";

const BankFields = ({
  payment,
  saveData,
  validate,
}) => {
  if (payment.type !== "ach") return null;
  return (
    <div>
      <Forms.Input
        id="routingNumber"
        name="billing-routing-number"
        label="Routing Number"
        type="tel"
        errorText="Please enter your routing number"
        defaultValue={payment.routingNumber}
        onChange={saveData}
        validation={validate}
        autoFocus
      />

      <Forms.Input
        id="accountNumber"
        name="billing-account-number"
        label="Account Number"
        type="tel"
        errorText="Please enter your account number"
        defaultValue={payment.accountNumber}
        onChange={saveData}
        validation={validate}
      />


      <div className="grid">

        <div className="grid__item one-whole">
          <Forms.Select
            name="billing-account-type"
            id="accountType"
            label="Account Type"
            onChange={saveData}
            validation={validate}
            defaultValue={payment.accountType}
            errorText="Please choose your account type"
            includeBlank
            items={[
              { value: "checking", label: "Checking" },
              { value: "savings", label: "Savings" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

BankFields.propTypes = {
  payment: PropTypes.object,
  saveData: PropTypes.func,
  validate: PropTypes.func,
};

export default BankFields;
