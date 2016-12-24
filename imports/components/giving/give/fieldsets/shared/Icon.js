// @flow
import AccountType from "../../../../components/accountType";

type IIcon = {
  cardType: ?string,
  width?: string,
  height?: string,
};

const Icon = ({ cardType, width, height }: IIcon) => (
  <AccountType width={`${width || "30px"}`} height={`${height || "21px"}`} type={cardType} />
);

export default Icon;
