"use strict";

exports.__esModule = true;
exports["default"] = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

var _react = require("react");

var _reactRedux = require("react-redux");

var _graphql = require("../../../core/graphql");

var _Layout = require("./Layout");

var _Layout2 = _interopRequireDefault(_Layout);

var _blocks = require("../../blocks");

var _store = require("../../../core/store");

var _client = require("../../../core/methods/files/client");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function updateUser(id, dispatch) {
  var personQuery = "\n    {\n      person(mongoId: \"" + id + "\", cache: false) {\n        age\n        birthdate\n        birthDay\n        birthMonth\n        birthYear\n        campus {\n          name\n          shortCode\n          id\n        }\n        home {\n          city\n          country\n          id\n          zip\n          state\n          street1\n          street2\n        }\n        firstName\n        lastName\n        nickName\n        email\n        phoneNumbers {\n          number\n          formated\n        }\n        photo\n      }\n    }\n  ";

  return _graphql.GraphQL.query(personQuery).then(function (person) {
    dispatch(_store.accounts.person(person.person));
  });
}

var map = function map(state) {
  return { person: state.accounts.person };
};
var Home = (_dec = (0, _reactRedux.connect)(map), _dec(_class = function (_Component) {
  (0, _inherits3["default"])(Home, _Component);

  function Home() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, Home);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      content: 0,
      photo: null
    }, _this.content = [React.createElement(_blocks.Likes, null), React.createElement(_blocks.Following, null)], _this.getContent = function () {
      return _this.content[_this.state.content];
    }, _this.onToggle = function (toggle) {
      _this.setState({
        content: toggle
      });
    }, _this.onUpload = function (e) {
      var _headers;

      var files = e.target.files;

      if (!Meteor.settings["public"].rock) {
        return;
      }

      var data = new FormData();
      data.append('file', files[0]);

      var _Meteor$settings$publ = Meteor.settings["public"].rock;
      var baseURL = _Meteor$settings$publ.baseURL;
      var token = _Meteor$settings$publ.token;
      var tokenName = _Meteor$settings$publ.tokenName;


      fetch(baseURL + "api/BinaryFiles/Upload?binaryFileTypeId=5", {
        method: 'POST',
        headers: (_headers = {}, _headers[tokenName] = token, _headers),
        body: data
      }).then(function (response) {
        return response.json();
      }).then(function (id) {
        (0, _client.avatar)(id, function (err, response) {
          updateUser(Meteor.userId(), _this.props.dispatch);
        });
      });

      var save = function save(url) {
        _this.setState({
          photo: url
        });
      };

      for (var file in files) {
        // console.log(files[file])
        var name = files[file].name;

        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = function (theFile) {
          return function (e) {
            // Render thumbnail.
            return save(e.target.result);
          };
        }(files[file]);

        // Read in the image file as a data URL.
        reader.readAsDataURL(files[file]);

        break;
      }
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  // we need to fork react-router-ssr to allow cascading
  // fetch datas

  Home.fetchData = function fetchData(getStore, dispatch) {

    var id = Meteor.userId();

    if (id) {
      return updateUser(id, dispatch);
    }
  };

  Home.prototype.componentDidMount = function componentDidMount() {
    this.props.dispatch(_store.nav.setLevel("TOP"));
  };

  Home.prototype.render = function render() {
    var person = this.props.person;
    var photo = person.photo;

    // photo = photo ? `//core-rock.newspring.cc/${photo}` : null

    if (this.state.photo) {
      photo = this.state.photo;
    }

    return React.createElement(_Layout2["default"], {
      photo: photo,
      person: person,
      onToggle: this.onToggle,
      content: this.getContent(),
      onUpload: this.onUpload
    });
  };

  return Home;
}(_react.Component)) || _class);
exports["default"] = Home;
module.exports = exports['default'];