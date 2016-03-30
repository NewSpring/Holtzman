"use strict";

exports.__esModule = true;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

var _react = require("react");

var _reactRedux = require("react-redux");

var _store = require("../../../core/store");

var _client = require("../../../core/methods/files/client");

var _graphql = require("../../../core/graphql");

var _Layout = require("./Layout");

var _Layout2 = _interopRequireDefault(_Layout);

var _Menu = require("./Menu");

var _Menu2 = _interopRequireDefault(_Menu);

var _ChangePassword = require("./ChangePassword");

var _ChangePassword2 = _interopRequireDefault(_ChangePassword);

var _PersonalDetails = require("./PersonalDetails");

var _PersonalDetails2 = _interopRequireDefault(_PersonalDetails);

var _HomeAddress = require("./HomeAddress");

var _HomeAddress2 = _interopRequireDefault(_HomeAddress);

var _Payments = require("./Payments");

var _Payments2 = _interopRequireDefault(_Payments);

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

var Template = (_dec = (0, _reactRedux.connect)(map), _dec(_class = function (_Component) {
  (0, _inherits3["default"])(Template, _Component);

  function Template() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, Template);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.onUpload = function (e) {
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

  Template.fetchData = function fetchData(getStore, dispatch) {

    var id = Meteor.userId();

    if (id) {
      return updateUser(id, dispatch);
    }
  };

  Template.prototype.componentDidMount = function componentDidMount() {
    var dispatch = this.props.dispatch;

    var id = Meteor.userId();

    if (id) {
      return updateUser(id, dispatch);
    }
  };

  Template.prototype.componentWillMount = function componentWillMount() {
    this.props.dispatch(_store.nav.setLevel("TOP"));
  };

  Template.prototype.render = function render() {
    var person = this.props.person;
    var photo = person.photo;
    // photo = photo ? `//core-rock.newspring.cc/${photo}` : null

    var mobile = !Meteor.isCordova;

    if (this.props.location.pathname.split("/").length > 3) {
      mobile = false;
    }
    return React.createElement(
      _Layout2["default"],
      { photo: photo, person: person, mobile: mobile, onUpload: this.onUpload },
      this.props.children
    );
  };

  return Template;
}(_react.Component)) || _class);


var Routes = [{
  path: "settings",
  component: Template,
  indexRoute: {
    component: _Menu2["default"]
  },
  childRoutes: [{ path: "change-password", component: _ChangePassword2["default"] }, { path: "personal-details", component: _PersonalDetails2["default"] }, { path: "home-address", component: _HomeAddress2["default"] }, { path: "saved-accounts", component: _Payments2["default"] }]
}];

exports["default"] = {
  Template: Template,
  Routes: Routes
};
module.exports = exports['default'];