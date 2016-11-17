// @flow

/*

  toCurrency
  @param num [Number] convert a number into American Currency

*/
function toCurrency(num: number): string {
  return `$${num.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")}`;
}

export default toCurrency;

/*

  monetize
  @param value: the dollar value to format and place a $ in front of
  @param fixed: whether or not to enforce decimal places

*/
const monetize = (amount: number | string, fixed?: boolean): string => {
  let value = typeof amount === "number" ? `${amount}` : amount;

  if (!value || !value.length) return "$0.00";

  value = value.replace(/[^\d.-]/g, "");

  const decimals = value.split(".")[1];
  if ((decimals && decimals.length >= 1) || fixed) {
    value = Number(value).toFixed(2);
    value = String(value);
  }

  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `$${value}`;
};

export { monetize };
