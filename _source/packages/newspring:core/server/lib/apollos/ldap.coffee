



class LDAPsession

  constructor: (username, password) ->

    @.opts =
      "url": "ldap://cen-dc001.ad.newspring.cc:389"
      "base": "dc=ad, dc=newspring, dc=cc"
      "timeout": 10000
      "connectTimeout": 10000
      "bindDn": "ns\\#{username}"
      "bindSecret": "#{password}"
      # "scope": "one"
      "nameAttribute": "samaccountname"

    @.ldapClient = Npm.require("ldapjs").createClient(
      url: @.opts.url
      timeout: @.opts.timeout
    )

    _syncLdapBind = Meteor.wrapAsync @.ldapClient.bind, @.ldapClient
    _syncLdapBind @.opts.bindDn, @.opts.bindSecret



try
  authenticated = new LDAPsession("james.baxley", "Liamgray@")
  console.log "success!"
  authenticated.ldapClient.unbind( (err) ->

    if err
      console.log err
  )

catch error
  if error
    console.log error
    console.log "not authenticated"

# user = session.searchUser "james.baxley@newspring.cc"
# console.log user

ldapLoginAttempt = (attempt) ->
  if attempt.methodArguments[0]?.user?.email.match /@newspring.cc/
    console.log "newspring email"
  
  console.log attempt.methodArguments[0]

  return true

Accounts.validateLoginAttempt ldapLoginAttempt
