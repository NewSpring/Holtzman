
import PropTypes from 'prop-types';

import { Accounts } from "../../@primitives/UI/icons";

const AccountType = ({ width, height, type }) => {
  const bottom = Number(height) / 10;
  const style = {
    marginBottom: `-${bottom}px`,
    marginRight: "-6px",
    marginLeft: "6px",
  };

  let inputType = type;

  if (type === "American Express") {
    inputType = "AmEx";
  } else if (type === "ACH") {
    inputType = "Bank";
  }

  const Icon = Accounts[inputType];
  return <Icon width={width} height={height} style={style} />;
};

AccountType.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  type: PropTypes.string.isRequired,
};

AccountType.defaultProps = {
  type: "Bank",
  width: 54,
  height: 40,
};

export default AccountType;
