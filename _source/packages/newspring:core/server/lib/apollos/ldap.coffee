



class LDAPsession

  constructor: ->

    @.opts =
      "url": "ldap://cen-dc001.ad.newspring.cc:389"
      "base": "dc=ad, dc=newspring, dc=cc"
      "timeout": 10000
      "connectTimeout": 10000
      "bindDn": "ns\\cen.webldap"
      "bindSecret": "ssq5&GXyJ8SzW5"
      # "scope": "one"
      "nameAttribute": "samaccountname"

    @.ldapClient = Npm.require("ldapjs").createClient(
      url: @.opts.url
      timeout: @.opts.timeout
    )

    _syncLdapBind = Meteor.wrapAsync @.ldapClient.bind, @.ldapClient
    _syncLdapBind @.opts.bindDn, @.opts.bindSecret
    # @.ldapClient.bind @.opts.bindDn, @.opts.bindSecret


  searchUser: (email) =>
    Future = Npm.require("fibers/future");
    future = new Future();

    base = @.opts.base

    filter = @.opts.filter or "(mail~=%name)"
    filter = filter.replace(/%name/g, email)

    opts =
      scope: @.opts.scope or "sub"
      filter: filter

    self = @

    # console.log opts, base

    @.ldapClient.search(base, opts, (err, result) ->


      if err
        new Meteor.Error "accounts-ldap-profile: error: #{err.message}"
        future.return()
        return

      result.on "searchReference", (referral) ->
        console.log('referral: ' + referral.uris.join())


      result.on "searchEntry", (entry) ->
        console.log "accounts-ldap-profile: get entry #{entry.object.dn}"

        if not future.isResolved()
          future.return
            name: entry.object[self.opts.nameAttribute or "displayName"] or entry.object.displayName or entry.object.uid

            mail: entry.object[self.opts.mailAttribute or "mail"]
            dn: entry.object.dn

        return

      result.on "error", (err) ->

        new Meteor.Error "accounts-ldap-profile: res error: #{err.message}"

        if not future.isResolved()
          future.return()
        return

      result.on "end", (result) ->
        debug "Status: #{result.status}"
        if not future.isResolved()
          future.return()
        return
    )


session = new LDAPsession()

user = session.searchUser "james.baxley@newspring.cc"
console.log user

ldapLoginAttempt = (attempt) ->
  console.log attempt.methodArguments[0]

  return true

Accounts.validateLoginAttempt ldapLoginAttempt
