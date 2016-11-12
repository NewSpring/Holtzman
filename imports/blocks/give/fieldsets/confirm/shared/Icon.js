import { PropTypes } from "react";
import AccountType from "../../../../../components/accountType";

const Icon = ({ cardType }) => (
  <AccountType width="30px" height="21px" type={cardType} />
);

Icon.propTypes = {
  cardType: PropTypes.string,
};

export default Icon;
