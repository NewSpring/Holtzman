var Ldapjs, _LDAPclient, ldap, ldapCreated, bind = function (fn, me) {
    return function () {
        return fn.apply(me, arguments);
    };
};

Ldapjs = Npm.require("ldapjs");

ldapCreated = false;

ldap = function () {};

_LDAPclient = (function () {
    function _LDAPclient() {
        this.authenticate = bind(this.authenticate, this);
        this.opts = {
            "url": "ldap://cen-dc001.ad.newspring.cc:389",
            "base": "dc=ad, dc=newspring, dc=cc",
            "timeout": 2000,
            "connectTimeout": 2000,
            "nameAttribute": "samaccountname"
        };
        this.ldapClient = Ldapjs.createClient({
            url: this.opts.url,
            timeout: this.opts.timeout
        });
    }

    _LDAPclient.prototype.authenticate = function (username, password) {
        var _syncLdapBind;
        username = username.split("@")[0];
        username = "ns\\" + username;
        _syncLdapBind = Meteor.wrapAsync(this.ldapClient.bind, this.ldapClient);
        return _syncLdapBind(username, password);
    };

    return _LDAPclient;

})();


/*

  Apollos.user.login.ldap

  @example returns true if the given username and password authenticate
    successfully on the NewSpring ldap server, false otherwise

    isSuccess = Apollos.user.login.ldap "bob@example.com", "password123"

  @param username [String] an email or other user identifier used on ldap
  @param password [String] the password used to authenticate the given user
  @param callback [Function] a function to be called with a single parameter of isSuccess.

  See LDAP documentation followed here:
  http://ldapjs.org/client.html
 */

Apollos.user.login.ldap = function (username, password) {
    var authenticated, error;
    if (!ldapCreated) {
        ldap = new _LDAPclient();
    }
    if (!username.match(/@newspring.cc/)) {
        return;
    }
    try {
        authenticated = ldap.authenticate(username, password);
        ldap.ldapClient.unbind(function (err) {
            if (err) {
                return console.log(err);
            }
        });
        return true;
    } catch (_error) {
        error = _error;
        debug(error);
        return false;
    }
};

Meteor.methods({
    "Apollos.user.login.ldap": Apollos.user.login.ldap
});