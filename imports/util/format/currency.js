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
const monetize = (value: string | number, fixed?: boolean): string => {
  let amount = typeof value === "number" ? `${value}` : value;

  if (!amount || !amount.length) return "$0.00";

  amount = amount.replace(/[^\d.-]/g, "");

  const decimals = amount.split(".")[1];
  if ((decimals && decimals.length >= 2) || fixed) {
    amount = Number(amount).toFixed(2);
    amount = String(amount);
  }

  amount = amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `$${amount}`;
};

export { monetize };
