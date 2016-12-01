// @flow

type ICurrency = {
  amount: string,
};

// eslint-disable-next-line max-len
const currencySymbolRegex = /[\$\xA2-\xA5\u058F\u060B\u09F2\u09F3\u09FB\u0AF1\u0BF9\u0E3F\u17DB\u20A0-\u20BD\uA838\uFDFC\uFE69\uFF04\uFFE0\uFFE1\uFFE5\uFFE6]/;

export const getCurrencySymbol = (amount:string) => amount.match(currencySymbolRegex) || "$";
export const getNegative = (amount:string) => amount.match(/-/);
export const getDollars = (amount:string) => amount.replace(currencySymbolRegex, "").replace("-", "").split(".")[0] || "0";
export const getCents = (amount:string) => amount.split(".")[1] || "00";

const Currency = ({
  amount,
}: ICurrency) => (
  <div className="floating text-left text-dark-primary">
    <h4 className="floating__item flush" style={{ paddingRight: "5px" }}>{getCurrencySymbol(amount)}</h4>
    {getNegative(amount) && <h4 className="floating__item flush" style={{ paddingRight: "3px" }}>{getNegative(amount)}</h4>}
    <h2 className="floating__item flush">{getDollars(amount)}</h2>
    <h4 className="floating__item flush">.{getCents(amount)}</h4>
  </div>
);

export default Currency;

export {
  Currency as MakeItRain,
  Currency as DollaDollaBillYall,
  Currency as TheChurchJustWantsYourMoney,
};
