var Future, OAuth, _F1Session, f1, oAuthCreated, bind = function (fn, me) {
    return function () {
        return fn.apply(me, arguments);
    };
};

OAuth = Npm.require("oauth").OAuth;

Future = Npm.require("fibers/future");

oAuthCreated = false;

f1 = function () {};

_F1Session = (function () {
    function _F1Session() {
        this.authenticate = bind(this.authenticate, this);
        var consumerKey, consumerSecret, headers, signatureMethod, version;
        oAuthCreated = true;
        consumerKey = Meteor.settings.f1.consumerKey;
        consumerSecret = Meteor.settings.f1.consumerSecret;
        version = "1.0A";
        signatureMethod = "HMAC-SHA1";
        headers = {
            Accept: "application/json",
            "Content-type": "application/json"
        };
        this.oauthClient = new OAuth(null, null, consumerKey, consumerSecret, version, null, signatureMethod, null, headers);
    }

    _F1Session.prototype.authenticate = function (username, password) {
        var baseUrl, body, future, url;
        future = new Future();
        baseUrl = Meteor.settings.f1.baseURL;
        url = baseUrl + "v1/WeblinkUser/AccessToken";
        body = Rock.utilities.base64Encode(username + " " + password);
        this.oauthClient.post(url, null, null, body, "application/json", function (error) {
            if (error) {
                future["return"](false);
                return;
            }
            return future["return"](true);
        });
        return future.wait();
    };

    return _F1Session;

})();


/*

  Apollos.user.login.f1

  @example returns true if the given username and password authenticate
    successfully on the FellowshipOne API, false otherwise

    isSuccess = Apollos.user.login.f1 "bob@example.com", "password123"

  @param username [String] an email or other user identifier used on F1
  @param password [String] the password used to authenticate the given user

  See F1 API documentation followed here:
  https://developer.fellowshipone.com/docs/v1/Util/AuthDocs.help#2creds
 */

Apollos.user.login.f1 = function (username, password) {
    var authenticated, error;
    if (!oAuthCreated) {
        f1 = new _F1Session();
    }
    try {
        authenticated = f1.authenticate(username, password);
        return authenticated;
    } catch (_error) {
        error = _error;
        debug(error);
        throw new Meteor.Error(error);
    }
};


/*

  Apollos.user.login.f1.hasAccount

  @example returns true if the given email previously was associated with a F1
    account

    hasF1Account = Apollos.user.login.f1.hasAccount "bob@example.com"

  @param email [String] an email used on F1
  @param callback [Function] a function to be called with a single parameter of
    hasF1Account. Omit to run synchronously.
 */

Apollos.user.login.f1.hasAccount = function (email, callback) {
    var future;
    future = new Future();
    Meteor.setTimeout(function () {
        var hasAccount;
        hasAccount = false;
        if (!callback) {
            return future["return"](hasAccount);
        } else {
            return callback(hasAccount);
        }
    }, 250);
    if (!callback) {
        return future.wait();
    }
};

Meteor.methods({
    "Apollos.user.login.f1": Apollos.user.login.f1
});