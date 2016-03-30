"use strict";

exports.__esModule = true;
exports["default"] = undefined;

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

var _react = require("react");

var _reactRedux = require("react-redux");

var _graphql = require("../../../../core/graphql");

var _encode = require("../../../../core/util/encode");

var _routing = require("../../../../core/store/routing");

var _split = require("../../../../core/blocks/split");

var _split2 = _interopRequireDefault(_split);

var _states = require("../../../../core/components/states");

var _map = require("../../../../core/components/map");

var _map2 = _interopRequireDefault(_map);

var _PopUp = require("./PopUp");

var _PopUp2 = _interopRequireDefault(_PopUp);

var _store = require("../../../../core/store");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getGroups(param, dispatch) {

  var params = "";
  if (Object.keys(param).length) {
    params += "(";
    for (var key in param) {
      if (isNaN(Number(param[key]))) {
        params += " " + key + ": \"" + param[key] + "\",";
      } else {
        params += " " + key + ": " + param[key] + ",";
      }
    }
    params += ")";
  }

  var query = "\n    {\n      topics: allDefinedValues(id: 52) {\n        id\n        description\n        value\n      }\n\n      groups: allGroups" + params + " {\n        count\n        items {\n          id\n          name\n          description\n          photo\n          childCare\n          ageRange\n          demographic\n          maritalStatus\n          campusId\n          locations {\n            id\n            location {\n              latitude\n              longitude\n              city\n              state\n              distance\n            }\n          }\n          schedule {\n            id\n            name\n            time\n            day\n            description\n            scheduleText\n          }\n          members {\n            role\n            person {\n              firstName\n              nickName\n              lastName\n              photo\n            }\n          }\n        }\n      }\n    }\n  ";
  return _graphql.GraphQL.query(query).then(function (_ref) {
    var groups = _ref.groups;
    var topics = _ref.topics;


    dispatch(_store.collections.upsertBatch("groups", groups.items, "id"));
    dispatch(_store.collections.upsertBatch("topics", topics, "id"));

    return { groups: groups, topics: topics };
  });
}

var map = function map(state) {
  return {
    groups: state.collections.groups,
    topics: state.collections.topics,
    filters: state.filters
  };
};
var ListContainer = (_dec = (0, _reactRedux.connect)(map), _dec(_class = function (_Component) {
  (0, _inherits3["default"])(ListContainer, _Component);

  function ListContainer() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, ListContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      status: "default",
      active: null,
      hover: null,
      home: null,
      count: null,
      done: false,
      filters: {
        topic: -1,
        days: [0, 1, 2, 3, 4, 5, 6],
        childCare: -1,
        campus: _this.props.filters.campus || -1
      }
    }, _this.onShowMore = function (e) {
      e.preventDefault();
      var loc = (0, _extends3["default"])({}, _this.state.query, {
        after: Object.keys(_this.props.groups).length
      });

      if (_this.state.count === Object.keys(_this.props.groups).length) {
        _this.setState({
          done: true
        });
        return;
      }
      _this.setState({
        status: "partial-load"
      });

      return getGroups(loc, _this.props.dispatch).then(function (_ref2) {
        var groups = _ref2.groups;
        var topics = _ref2.topics;

        _this.setState({
          status: "default"
        });
      });
    }, _this.onClick = function (e) {
      e.preventDefault();
      var id = e.currentTarget.id;
      // const { groups } = this.props

      var hash = _this.props.params.hash ? _this.props.params.hash : "all";

      _this.props.dispatch(_routing.routeActions.push("/groups/finder/list/" + hash + "/" + id));
      // for (let group in groups) {
      //   group = groups[group]
      //
      //   if (`${group.id}` === `${id}`) {
      //     this.setState({ active: id })
      //     break
      //   }
      // }
    }, _this.onChildClick = function (marker) {
      _this.setState({ active: marker.id });
      var hash = _this.props.params.hash ? _this.props.params.hash : "all";
      _this.props.dispatch(_routing.routeActions.push("/groups/finder/list/" + hash + "/" + marker.id));
    }, _this.onMarkerHover = function (marker) {
      _this.setState({ hover: marker.id });
    }, _this.onHover = function (e) {
      var id = e.currentTarget.id;
      var groups = _this.props.groups;


      if (groups[Number(id)]) {
        _this.setState({ hover: id });
      }
    }, _this.filter = function (value, target) {

      // special case for checkbox groups
      // @TODO, make this eaiser
      if ((typeof value === "undefined" ? "undefined" : (0, _typeof3["default"])(value)) === "object") {
        target = value.target;
        var _target = target;
        var _name = _target.name;


        var day = Number(target.id.replace(/days_/gmi, ""));

        var days = _this.state.filters.days;

        // Array Remove - By John Resig (MIT Licensed)
        var remove = function remove(arr, from, to) {
          var rest = arr.slice((to || from) + 1 || arr.length);
          arr.length = from < 0 ? arr.length + from : from;
          return arr.push.apply(arr, rest);
        };

        if (days.indexOf(day) > -1) {
          remove(days, days.indexOf(day));
        } else {
          days.push(day);
        }

        value = days;
      }

      var _target2 = target;
      var name = _target2.name;


      var currentFilters = _this.state.filters;

      if (currentFilters[name]) {
        currentFilters[name] = value;
      }

      _this.setState({ filters: currentFilters });
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  ListContainer.prototype.componentWillMount = function componentWillMount() {
    var _this2 = this;

    var dispatch = this.props.dispatch;
    var _props$params = this.props.params;
    var hash = _props$params.hash;
    var groupId = _props$params.groupId;


    var loc = hash ? hash : "";

    if (loc === "all") {
      loc = "";
    }

    loc = (0, _encode.base64Decode)(decodeURI(loc));

    try {
      loc = JSON.parse(loc);
    } catch (e) {}

    if (typeof loc === "string") {
      loc = {};
    }

    if (groupId) {
      loc.includeGroup = groupId;
    }

    this.setState({ status: "loading" });
    return getGroups(loc, dispatch).then(function (_ref3) {
      var groups = _ref3.groups;
      var topics = _ref3.topics;

      _this2.setState({
        status: "default",
        home: [loc.lat, loc.lng],
        query: loc,
        count: groups.count
      });
    });
  };

  ListContainer.prototype.render = function render() {
    var _this3 = this;

    var groups = [];
    var markers = [];
    var groupData = [];
    if (this.props.groups) {
      for (var group in this.props.groups) {
        groupData.push(this.props.groups[group]);
      }
    }

    groupData = _.sortBy(groupData, function (group) {
      return group.locations ? group.locations[0].location.distance : -1;
    });

    var _loop = function _loop() {
      if (_isArray) {
        if (_i >= _iterator.length) return "break";
        _ref4 = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) return "break";
        _ref4 = _i.value;
      }

      var group = _ref4;
      var filters = _this3.state.filters;


      function convert(num) {
        if (Number(num)) {
          return Number(num) === 1;
        }
        return false;
      }

      var filter = (Number(filters.childCare) === -1 || convert(filters.childCare) === group.childCare) && (Number(filters.topic) === -1 || filters.topic === group.demographic) && (Number(filters.campus) === -1 || Number(filters.campus) === Number(group.campusId)) && filters.days.indexOf(Number(group.schedule.day)) > -1;

      if (!filter) {
        return "continue";
      }

      groups.push(group);

      if (group.locations && group.locations.length) {
        for (var loc in group.locations) {
          loc = group.locations[loc];
          var _loc$location = loc.location;
          var latitude = _loc$location.latitude;
          var longitude = _loc$location.longitude;

          markers.push({
            id: group.id,
            latitude: latitude,
            longitude: longitude
          });
        }
      }
    };

    _loop2: for (var _iterator = groupData, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref4;

      var _ret2 = _loop();

      switch (_ret2) {
        case "break":
          break _loop2;

        case "continue":
          continue;}
    }

    var topics = [{
      value: -1,
      label: "All Topics"
    }];

    if (this.props.topics) {
      for (var topic in this.props.topics) {
        topics.push({
          label: this.props.topics[topic].value
        });
      }
    }

    var children = React.Children.map(this.props.children, function (x) {
      return React.cloneElement(x, {
        topics: topics,
        filter: _this3.filter,
        groups: groups,
        hover: _this3.state.hover,
        onHover: _this3.onHover,
        actvie: _this3.state.active,
        onClick: _this3.onClick,
        hash: _this3.props.params.hash,
        count: _this3.state.count,
        showMore: _this3.onShowMore,
        status: _this3.state.status,
        done: _this3.state.done
      });
    });

    return React.createElement(
      "div",
      null,
      React.createElement(
        _split2["default"],
        { nav: true, classes: ["background--light-primary"] },
        React.createElement(
          _split.Right,
          { mobile: false },
          React.createElement(
            "div",
            { className: "locked-ends locked-sides", style: { zIndex: 5 } },
            function () {
              switch (_this3.state.status) {
                case "loading":
                  return null;
              }

              if (typeof window != "undefined" && window != null) {
                if (window.matchMedia("(min-width: 769px)").matches) {

                  if (!markers.length) {
                    React.createElement(_map2["default"], null);
                  }

                  return React.createElement(_map2["default"], {
                    markers: markers,
                    onMarkerHover: _this3.onMarkerHover,
                    onChildClick: _this3.onChildClick,
                    active: _this3.state.active,
                    hover: _this3.state.hover,
                    popUp: _PopUp2["default"],
                    autoCenter: true
                  });
                }
              }

              return null;
            }()
          )
        )
      ),
      React.createElement(
        _split.Left,
        { scroll: true, classes: ["background--light-primary"] },
        function () {
          switch (_this3.state.status) {
            case "error":
              return React.createElement(Err, { msg: "Looks like there was a problem finding a group" });
            case "loading":
              return React.createElement(_states.Loading, { msg: "Searching for nearby groups..." });

          }

          return React.createElement(
            "div",
            null,
            children
          );
        }()
      )
    );
  };

  return ListContainer;
}(_react.Component)) || _class);
exports["default"] = ListContainer;
module.exports = exports['default'];