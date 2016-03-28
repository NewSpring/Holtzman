/*

  toCurrency
  @param num [Number] convert a number into American Currency

*/
function toCurrency(num : Number) : string {
  return `$${num.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")}`
}

export { toCurrency }
