// @flow
import AccountType from "../../../../components/accountType";

type IIcon = {
  cardType: ?string,
};

const Icon = ({ cardType }: IIcon) => (
  <AccountType width="30px" height="21px" type={cardType} />
);

export default Icon;
