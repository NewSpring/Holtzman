"use strict";

exports.__esModule = true;

var _objectDestructuringEmpty2 = require("babel-runtime/helpers/objectDestructuringEmpty");

var _objectDestructuringEmpty3 = _interopRequireDefault(_objectDestructuringEmpty2);

var _react = require("react");

var _SideBySide = require("../../../../core/components/cards/SideBySide");

var _SideBySide2 = _interopRequireDefault(_SideBySide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PopUp = function PopUp(_ref) {
  (0, _objectDestructuringEmpty3["default"])(_ref);
  return React.createElement(
    "div",
    null,
    React.createElement(
      "h1",
      null,
      "Hello World"
    )
  );
};

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

exports["default"] = PopUp;
module.exports = exports['default'];