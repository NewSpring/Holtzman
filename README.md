<p align="center" >
  <a href="http://newspring.cc">
    <img src="https://s3.amazonaws.com/ns.images/newspring/icons/newspring-church-logo-black.png" alt="NewSpring Church" title="NewSpring Church" />
  </a>
</p>

# Apollos - Core

The internal core of Apollos applications

## Who was Apollos?

* <a href="https://www.biblegateway.com/passage/?search=Acts%2018:24-28&version=NIV">Acts 18:24-28</a>
* <a href="https://www.biblegateway.com/passage/?search=Acts+19:1&version=NIV">Acts 19:1</a>
* <a href="https://www.biblegateway.com/passage/?search=1+Corinthians+1:12-13&version=NIV">1 Corinthians 1:12-13</a>
* <a href="https://www.biblegateway.com/passage/?search=1%20Corinthians%203:6&version=NIV">1 Corinthians 3:6</a>
* <a href="https://www.biblegateway.com/passage/?search=Titus%203:13&version=NIV">Titus 3:13</a>



## Mirrored repositories

Apollos code is stored on GitHub and Bitbucket for the added security found in
redundancy. In order to push changes to both remotes, issue the following
in your local developer console:

```bash
git remote set-url origin --add https://[USERNAME_HERE]@bitbucket.org/NewSpringChurch/newspring-core.git
```

Be sure that you put your own username in that URL! Now that Bitbucket has been
added, commit and push as normal.

## Developer Interface

<!-- ### Rock

This package exposes a Rock object to the client and server:

#### Server Only

* Rock.baseUrl - A string representing a URL something like "http://rock.com/"
and is set in the settings.json
* Rock.tokenName - A string with the value from the settings.json representing
the name by which the token is referred to in API requests to Rock
* Rock.token - A string with the value from the settings.json representing
the token by which API requests to Rock can authenticate
* Rock.users.refresh() - A function that queries Rock for userlogins at
api/UserLogin and upserts users based on the result. This is run at Meteor
startup.
* Rock.apiRequest(method, resource, callback) - A function that makes an API
request to Rock and returns the result in the callback with the parameters:
error and result

#### Client and Server

* Rock.name - A string to identify the server endpoint by name like "Rock"
* Rock.isAlive() - A function that returns true if the server at baseUrl has
responded to the most recent ping (30 second intervals). -->

### Apollos

This package exposes an Apollos object to the client and server:

#### Client and Server

* Apollos.user.create(email, password) - A function that simply exposes
<a href="http://docs.meteor.com/#/full/accounts_oncreateuser">
  Accounts.createUser
</a>
functionality, but only allows email identifiers (no usernames)
* Apollos.user.update(userLogin, platform) - A function that upserts a user based
on the userLogin.Id

### Apollos.validation

* Apollos.validation.isEmail(str) - A function that returns true if the str is a
valid email formatted string
* Apollos.validation.isBcryptHash(str) - A function that returns true if the str
is a valid Bcrypt hash

## API

To use the API, you must have an existing account.

### POST /api/v1/userlogins/

POST the following data to set it on the user that matches the Id:

* ApollosHash: String (bcrypted password)
* PersonId: Number (rock person id)
* UserName: String (should be an email)
* Guid: String (should be an guid)

If the user identified by Id does not yet exist, that user will be created. Note
that since Apollos uses emails as usernames, duplicate emails will cause an
error.
