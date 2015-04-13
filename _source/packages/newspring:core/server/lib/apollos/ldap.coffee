



class _LDAPsession

  constructor: (username, password) ->

    # ensure no email
    username = username.split("@")[0]

    @.opts =
      "url": "ldap://cen-dc001.ad.newspring.cc:389"
      "base": "dc=ad, dc=newspring, dc=cc"
      "timeout": 10000
      "connectTimeout": 10000
      "nameAttribute": "samaccountname"

    @.ldapClient = Npm.require("ldapjs").createClient(
      url: @.opts.url
      timeout: @.opts.timeout
    )


  authenticate: (username, password) =>

    username = "ns\\#{username}"

    # make sync
    _syncLdapBind = Meteor.wrapAsync @.ldapClient.bind, @.ldapClient

    # call
    return _syncLdapBind username, password



###

  Apollos.user.login.ldap

  @example returns true if the given username and password authenticate
    successfully on the NewSpring ldap server, false otherwise

    isSuccess = Apollos.user.login.ldap "bob@example.com", "password123"

  @param username [String] an email or other user identifier used on ldap
  @param password [String] the password used to authenticate the given user
  @param callback [Function] a function to be called with a single parameter of isSuccess.

  See LDAP documentation followed here:
  http://ldapjs.org/client.html

###
Apollos.user.login.ldap = (username, password) ->

  # this will need to be a different check because non newspring emails can be in ldap
  if not username.match /@newspring.cc/
    return

  try
    authenticated = new _LDAPsession(username, password)

    authenticated.ldapClient.unbind( (err) ->

      if err
        console.log err
    )

    return true


  catch error
    debug error
    throw new Meteor.Error(JSON.stringify(error), false)
    return


Meteor.methods
  "Apollos.user.login.ldap": Apollos.user.login.ldap
