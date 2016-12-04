
import { PropTypes } from "react";
import styled from "styled-components";

import { Accounts } from "../icons";

const AccountType = ({ width, height, type }) => {
  const bottom = Number(height) / 10;
  // const style = {
  //   marginBottom: `-${bottom}px`,
  //   marginRight: "-6px",
  //   marginLeft: "6px",
  // };

  let inputType = type;

  if (type === "American Express") {
    inputType = "AmEx";
  } else if (type === "ACH") {
    inputType = "Bank";
  }

  const Icon = Accounts[inputType];
  const StyledIcon = styled(Icon)`
    margin-bottom: -${bottom}px;
    margin-right: -6px;
    margin-left: 6px;
  `;

  return <StyledIcon width={width} height={height} />;
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
