import moment from "moment";

function date(contentItem) {
  // Dec 19, 2015
  const actualDate = contentItem.meta.actualDate;

  return moment(new Date(actualDate)).format("MMM D, YYYY");
}

export default date;
