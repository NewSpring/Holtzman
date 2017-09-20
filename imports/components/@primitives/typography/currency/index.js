// @flow

type ICurrency = {
  amount: string,
  baseHeadingSize?: string,
  className?: string,
  theme?: string,
  roundCurrency?: boolean,
  style?: Object,
};

// eslint-disable-next-line max-len
const currencySymbolRegex = /[\$\xA2-\xA5\u058F\u060B\u09F2\u09F3\u09FB\u0AF1\u0BF9\u0E3F\u17DB\u20A0-\u20BD\uA838\uFDFC\uFE69\uFF04\uFFE0\uFFE1\uFFE5\uFFE6]/;

export const getCurrencySymbol = (amount: string) =>
  amount.match(currencySymbolRegex) || "$";
export const getNegative = (amount: string) => amount.match(/-/);
export const getDollars = (amount: string, roundCurrency?: boolean): string => {
  if (roundCurrency === true) {
    const integerAmount = parseFloat(
      amount.replace(currencySymbolRegex, "").replace("-", "") || "00.00",
    );
    const roundedAmount = Math.round(integerAmount);
    return roundedAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const ints = amount
    .replace(currencySymbolRegex, "")
    .replace("-", "")
    .split(".")[0];
  return (ints && ints.replace(/\B(?=(\d{3})+(?!\d))/g, ",")) || "00";
};
export const getCents = (amount: string) => amount.split(".")[1] || "00";

// needed for testing
// eslint-disable-next-line
export let BaseCurrencySize;
// eslint-disable-next-line
export let ReducedHeadingSize;

export const currencySizeCalc = (baseHeadingSize: string) => {
  const reducedHeadingResult = parseFloat(baseHeadingSize) + 2;

  BaseCurrencySize = `h${baseHeadingSize}`;
  ReducedHeadingSize = `h${reducedHeadingResult}`;
};

export const textTheme = (theme?: string): string => {
  if (theme === "light") return "text-light-primary";

  return "text-dark-primary";
};

const Currency = ({
  amount,
  baseHeadingSize,
  className,
  theme,
  roundCurrency,
  style,
}: ICurrency) =>
  <div className={`floating ${textTheme(theme)} ${className || "text-left"}`}>
    {currencySizeCalc(baseHeadingSize || "2")}
    <ReducedHeadingSize
      className="floating__item flush"
      style={{ paddingRight: "5px" }}
    >
      {getCurrencySymbol(`${amount}`)}
    </ReducedHeadingSize>
    {getNegative(`${amount}`) &&
      <ReducedHeadingSize
        className="floating__item flush"
        style={{ paddingRight: "3px" }}
      >
        {getNegative(`${amount}`)}
      </ReducedHeadingSize>}
    <BaseCurrencySize className="floating__item flush" style={style}>
      {getDollars(`${amount}`, roundCurrency)}
    </BaseCurrencySize>
    {!roundCurrency &&
      <ReducedHeadingSize className="floating__item flush">
        .{getCents(`${amount}`)}
      </ReducedHeadingSize>}
  </div>;

export default Currency;

export {
  Currency as MakeItRain,
  Currency as DollaDollaBillYall,
  Currency as TheChurchJustWantsYourMoney,
};
