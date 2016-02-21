import { Component, PropTypes} from "react"

import SideBySide from "../../../../core/components/cards/SideBySide"

const PopUp = ({}) => (
  <div>
    <h1>Hello World</h1>
  </div>
)

// <button
//   id={group.id}
//   onClick={onClick}
//   key={key}
//   style={{position:"relative"}}
// >
//   <SideBySide
//     image={group.photo ? { url: group.photo } : { url: "//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/fpo/fpo.groups-flipped_1700_850_90_c1.jpg"}}
//     left={["one-whole", "two-thirds@lap-and-up"]}
//     right={["one-whole", "one-third@lap-and-up"]}
//   >
//     <h4 className="push-half-top@portable push-top@anchored">
//       {group.name}
//     </h4>
//     <h6 className="text-dark-secondary">
//       {
//         leaders
//           .map((x, i) => {
//             let string = `${x.person.nickName || x.person.firstName} ${x.person.lastName}`
//
//             if (leaders.length - 1 != i) {
//               string += ", "
//             }
//
//             return <span key={i}>{string}</span>
//           })
//       }
//     </h6>
//     <h6 className="text-dark-tertiary">
//       <em>
//         {group.schedule.scheduleText}
//       </em>
//     </h6>
//     <p className="flush-bottom">
//       <small>
//         {group.description}
//       </small>
//     </p>
//
//   </SideBySide>
// </button>

export default PopUp
