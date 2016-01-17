/*global Meteor, check */
import { api } from "../../../util/rock"

Meteor.methods({
  "rock/auth/login": (Username, password) => {
    check(Username, String)
    check(password, String)

    const email = Username

    // special case for AD lookup
    if (Username.indexOf("@newspring.cc") > -1) {
      Username = Username.replace(/@newspring.cc/, "")
    }

    let isAuthorized = api.post.sync(`Auth/login`, { Username, Password: password })

    if (isAuthorized.statusText) {
      throw new Metoer.Error("Your password is incorrect")
    }


    let userAccount = Accounts.findUserByEmail(email)

    // ensure the users exists if they tried to login
    if (isAuthorized && !userAccount) {
      userAccount =  Accounts.createUser({
        email: email,
        password: password
      })
    }


    api.get(`UserLogins?$filter=UserName eq '${Username}'`, (err, user) => {
      const { PersonId } = user[0]

      api.get(`People/${PersonId}`, (err, person) => {
        const { PrimaryAliasId } = person

        if (userAccount) {
          Meteor.users.update(userAccount._id || userAccount, {
            $set: {
              "services.rock" : {
                PersonId,
                PrimaryAliasId
              }
            }
          })
        }
      })

    })


    return isAuthorized
  },
})
