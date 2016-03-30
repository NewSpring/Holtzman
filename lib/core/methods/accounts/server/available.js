"use strict";

var _rock = require("../../../util/rock");

var _validate = require("../../../util/validate");

var _validate2 = _interopRequireDefault(_validate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*global Meteor, check */


function getPhoto() {
  var person = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];


  if (person.Photo && person.Photo.Path) {
    var Path = person.Photo.Path;

    // is relative to Rock

    if (Path[0] === "~") {
      Path = Path.substr(2);
      Path = Meteor.settings["public"].rock.baseURL + Path;

      return Path;
    }

    if (Path.indexOf("?") > -1) {
      Path = Path.slice(0, Path.indexOf("?"));
    }

    // is a storage provider
    return Path;
  }

  if (!person.PhotoUrl) {
    person.PhotoUrl = "//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/all/member_images/members.nophoto_1000_1000_90_c1.jpg";
  }

  return person.PhotoUrl;
}

Meteor.methods({
  "rock/accounts/available": function rockAccountsAvailable(email) {
    check(email, String);

    // special case for AD lookup
    if (email.indexOf("@newspring.cc") > -1) {
      email = email.replace(/@newspring.cc/, "");
    }

    var isAvailable = _rock.api.get.sync("userlogins/available/" + email),
        alternateAccounts = [],
        peopleWithoutAccountEmails = [];

    if (isAvailable) {
      // first see if a person has this email but doesn't have an account
      var People = _rock.api.get.sync("People/GetByEmail/" + email);

      if (!People.length) {
        var SecondaryEmailPeople = _rock.api.get.sync((0, _rock.parseEndpoint)("\n          AttributeValues?\n            $filter=\n              Attribute/Key eq 'SecondaryEmail' and\n              Value eq '" + email + "'\n            &$top=1\n            &$expand=\n              Attribute\n            &$select=\n              Value,\n              EntityId\n        "));

        // showing more than 5 possible people in this case
        // would be confusing to a user so lets limit our lookup
        var realisticReturnAmounts = 5;
        var ids = SecondaryEmailPeople.map(function (x) {
          return "(Id eq " + x.EntityId + ")";
        }).slice(0, realisticReturnAmounts).join(" and ");

        /*
           what we want to pass back is a list of emails
          that are primary on file, and prompt the person
          to create an account based on that person record
         */
        People = _rock.api.get.sync("People?$filter=" + ids + "&$expand=Photo");
      }

      var peopleToCheck = [];

      if (People.length) {
        for (var _iterator = People, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
          }

          var person = _ref;

          peopleWithoutAccountEmails.push({
            email: person.Email,
            firstName: person.NickName || person.FirstName,
            lastName: person.LastName,
            photo: getPhoto(person),
            id: person.Id
          });

          if (person.Users) {

            alternateAccounts = alternateAccounts.concat(person.Users.map(function (x) {
              return x.UserName;
            })).filter(_validate2["default"].isEmail);
          } else {
            peopleToCheck.push(person.Id);
          }
        }
      }

      // if we found some people with that secondary email
      // lets see if they have any user logins to the
      // user can go ahead and try to login with that account
      if (peopleToCheck.length) {
        for (var _iterator2 = peopleToCheck, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
          var _ref2;

          if (_isArray2) {
            if (_i2 >= _iterator2.length) break;
            _ref2 = _iterator2[_i2++];
          } else {
            _i2 = _iterator2.next();
            if (_i2.done) break;
            _ref2 = _i2.value;
          }

          var personId = _ref2;

          var emailsForPerson = _rock.api.get.sync("UserLogins?$filter=PersonId eq " + personId);
          if (emailsForPerson.length) {
            for (var _iterator3 = emailsForPerson, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
              var _ref3;

              if (_isArray3) {
                if (_i3 >= _iterator3.length) break;
                _ref3 = _iterator3[_i3++];
              } else {
                _i3 = _iterator3.next();
                if (_i3.done) break;
                _ref3 = _i3.value;
              }

              var UserLogin = _ref3;

              if (_validate2["default"].isEmail(UserLogin.UserName)) {
                alternateAccounts.push(UserLogin.UserName);
              }
            }
          }
        }
      }
    }

    return {
      isAvailable: isAvailable,
      alternateAccounts: alternateAccounts,
      peopleWithoutAccountEmails: peopleWithoutAccountEmails
    };
  }
});