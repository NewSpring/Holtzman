import Moment from "moment";

Moment.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past:   "%s ago",
    s:  "s",
    m:  "m",
    mm: "%dm",
    h:  "1h",
    hh: "%dh",
    d:  "1d",
    dd: "%dd",
    M:  "1mo",
    MM: "%dmo",
    y:  "1y",
    yy: "%dy"
  }
});

function relativeTime(contentItem) {
  let date = contentItem.meta.date;

  let time = Moment(new Date(date));
  return time.fromNow(true) // true omits "ago"
}

export default relativeTime
