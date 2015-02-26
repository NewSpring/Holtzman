# newspring:core
The main NewSpring namespace and utilities for all newspring packages.

## Mirrored repositories

Apollos code is stored on GitHub and Bitbucket for the added security found in
redundancy. In order to push changes to both remotes, issue the following
in your local developer console:

```bash
git remote set-url origin --add https://[USERNAME_HERE]@bitbucket.org/NewSpring-Apollos/view-newspring.git
```

Be sure that you put your own username in that URL! Now that Bitbucket has been
added, commit and push as normal.

## Developer Interface

### Rock

This package exposes a Rock object to the client and server:

#### Server Only

* Rock.baseUrl - A string representing a URL something like "http://rock.com/"

#### Client and Server

* Rock.name - A string to identify the server endpoint by name like "Rock"
* Rock.isAlive() - A function that returns true if the server at baseUrl has
responded to the most recent ping (30 second intervals).

### Apollos

This package exposes an Apollos object to the client and server:

#### Client and Server

* Apollos.createUser(email, password) - A function that simply exposes
<a href="http://docs.meteor.com/#/full/accounts_oncreateuser">
  Accounts.createUser
</a>
functionality, but only allows email identifiers (no usernames)
* Apollos.Validation.isEmail(str) - A function that returns true if the str is a
valid email formatted string

## API

To use the API, you must have an existing account.

### POST /api/v1/auth/

Use this endpoint to POST your credentials. Credentials are the email and
password combination that you use to login to Apollos normally. Upon success,
Apollos will send a token and to be used for further interaction with the API.

### GET /api/v1/auth/

Use this endpoint to test your API token. The token should be sent in the header
of a GET request. Use the key ".apollos" to identify the token. Apollos
will respond and tell you who he thinks you are based on the token you sent.

### POST /api/v1/userlogins/

POST the following data to set it on the user that matches the userLoginId:

* password: String (bcrypted password)
* personAliasId: Number (rock person alias id)
* userName: String (should be an email)

If the user identified by :userLoginId does not yet exist, that user will be created. Note that since Apollos uses emails as usernames, duplicate emails will cause an error.
