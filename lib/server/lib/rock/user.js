/*

  Rock.user

  @example return current logged in user in Rock format

    rockUser = Rock.user()
 */
Rock.user = function () {
    return Rock.user.translate();
};


/*

  Rock.user.translate

  @example take data from a service and format it for Rock

    Rock.user.translate([obj, platform])

  @param user [Object] existing object to be translated
  @param platform [String] platform to be translated to
 */

Rock.user.translate = function (user, platform) {
    var rockUser;
    if (!platform) {
        platform = Apollos.name;
    }
    switch (platform.toUpperCase()) {
    case Apollos.name.toUpperCase():
        user || (user = {
            emails: [{
                address: null
            }],
            services: {
                password: {
                    bcrypt: null
                }
            }
        });
        rockUser = {
            UserName: user.emails[0].address,
            ApollosHash: user.services.password.bcrypt
        };
        if (user.rock) {
            rockUser.PersonId = user.rock.personId;
            rockUser.Guid = user.rock.guid;
            rockUser.Id = user.rock.userLoginId;
        }
        return rockUser;
    }
};


/*

  Rock.user.delete

  @example delete a user from Rock

    Rock.user.delete Apollos.users.findOne()

  @param user [Object] an existing user document to be deleted
 */

Rock.user["delete"] = function (user) {
    user = Rock.user.translate(user);
    if (!user.Id) {
        return;
    }
    debug(user, "id for delete is " + user.Id);
    return Rock.apiRequest("DELETE", "api/UserLogins/" + user.Id, function (error, result) {
        if (error) {
            debug("Rock delete failed:");
            debug(error);
        }
    });
};


/*

  Rock.user.update

  @example update a user on Rock

    Rock.user.update(userDoc)

  @param user [Object] User to update
 */

Rock.user.update = function (user) {
    var rockUser;
    rockUser = Rock.user.translate(user);
    if (!rockUser.Id || !rockUser.Guid) {
        Rock.user.create(user);
        return;
    }
    return Rock.apiRequest("POST", "api/UserLogins/" + rockUser.Id, rockUser, function (error, result) {
        if (error) {
            debug("Rock update failed:");
            debug(error);
        }
    });
};


/*

  Rock.user.create

  @example create a user on Rock

    Rock.user.update()

  @param user [Object] User to create
 */

Rock.user.create = function (user) {
    user = Rock.user.translate(user);
    return Rock.apiRequest("POST", "api/UserLogins", user, function (error, result) {
        if (error) {
            debug("Rock create failed:");
            debug(error);
            return;
        }
        return Apollos.user.update(result.data);
    });
};


/*

  Rock.users

  @example return all users synced to Rock

    Rock.users()

  @todo write lookup
 */

Rock.users = function () {
    throw new Meteor.Error("Unimplemented", "This method is unimplemented!");
};


/*

  Rock.users.refresh

  @example refesh all users from Rock

    Rock.user.refresh()

  @param throwErrors [Boolean] switch to silence error throwing
 */

Rock.users.refresh = function (throwErrors) {
    return Rock.refreshEntity("api/UserLogins", "user", "users", throwErrors);
};