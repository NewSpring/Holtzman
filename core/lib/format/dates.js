
/*

  toDateString

*/
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]

function toDateString(dateObj, abbreviated) {
  const year = dateObj.getFullYear()
  const date = dateObj.getDate()
  const month = dateObj.getMonth()
  let monthName = monthNames[month]

  if (abbreviated) {
    monthName = monthName.substring(0, 3);
  }


  return `${monthName} ${date}, ${year}`
}

export { toDateString }
