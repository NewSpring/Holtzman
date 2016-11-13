import { PropTypes } from "react";

const AccountNumber = ({ accountNumber }) => (
  <span>
    {accountNumber
      .slice(0, accountNumber.length - 5)
      .replace(/./gmi, "*")
    }
    {accountNumber.slice(-4)}
  </span>
);

AccountNumber.propTypes = {
  accountNumber: PropTypes.string,
};

export default AccountNumber;
