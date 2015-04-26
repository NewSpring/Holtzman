/*

  Apollos.user.getAccountType

  @example indicates if the given email has a local account. If not, indicates
    if the email belongs to an old F1 account?

    Apollos.user.getAccountType([string])

  @param email [String] the email to evaluate
 */
Apollos.user.getAccountType = function (email) {
    var f1Account, localAccount;
    localAccount = Meteor.users.findOne({
        "emails.address": email
    });
    if (localAccount) {
        return Apollos.enums.accountType.apollos;
    }
    f1Account = Apollos.user.login.f1.hasAccount(email);
    if (f1Account) {
        return Apollos.enums.accountType.f1;
    }
    return Apollos.enums.accountType.none;
};


/*

  Apollos.user.translate

  @example take data from a service and format it for Apollos

    Apollos.user.translate([obj, platform])

  @param user [Object] existing object to be translated
  @param platform [String] platform to be translated to
 */

Apollos.user.translate = function (user, platform) {
    var existingUser;
    if (!platform) {
        platform = Rock.name;
    }
    switch (platform.toUpperCase()) {
    case Rock.name.toUpperCase():
        if (user) {
            existingUser = Apollos.users.findOne({
                "rock.userLoginId": user.Id
            });
        } else {
            user = Rock.user();
        }
        existingUser || (existingUser = {});
        if (!existingUser.rock) {
            existingUser.rock = {};
        }
        if (user.PersonId) {
            existingUser.rock.personId = Number(user.PersonId);
        } else {
            existingUser.rock.personId = null;
        }
        existingUser.rock.guid = user.Guid;
        if (user.Id) {
            existingUser.rock.userLoginId = Number(user.Id);
        } else {
            existingUser.rock.userLoginId = null;
        }
        if (Apollos.validate.isEmail(user.UserName)) {
            existingUser.emails = existingUser.emails || [];
            existingUser.emails[0] = existingUser.emails[0] || {};
            existingUser.emails[0].address = user.UserName;
        }
        if (Apollos.validate.isBcryptHash(user.ApollosHash)) {
            existingUser.services = existingUser.services || {};
            existingUser.services.password = existingUser.services.password || {};
            existingUser.services.password.bcrypt = user.ApollosHash;
        }
        return existingUser;
    }
};


/*

  Apollos.user.delete

  @example take a user and delete it

    Apollos.user.delete(user, [platform])

  @param user [Object|String|Number] existing document, _id, or rock.userLoginId
  @param platform [String] platform initiating the delete
 */

Apollos.user["delete"] = function (user, platform) {
    var entity;
    if (typeof user === "number") {
        entity = Apollos.users.findOne({
            "rock.userLoginId": user
        });
        if (entity) {
            user = entity;
        }
    }
    return Apollos.entityHelpers["delete"]("user", "users", user, platform);
};


/*

  Apollos.user.update

  @example update a usr in apollos with data from Rock

    Apollos.user.update([obj, platform])

  @param user [Object] existing user from other service to be updated
  @param platform [String] platform to be update from
 */

Apollos.user.update = function (user, platform) {
    var hasEmail, ids, query, tempPassword, userId, users, usr;
    user = Apollos.user.translate(user);
    query = {
        $or: [{
            "rock.userLoginId": user.rock.userLoginId
        }]
    };
    if (user.emails && user.emails[0] && user.emails[0].address) {
        hasEmail = true;
        query["$or"].push({
            "emails.address": user.emails[0].address
        });
    }
    users = Apollos.users.find(query).fetch();
    if (users.length > 1) {
        ids = [];
        users.forEach(function (usr) {
            return ids.push(usr._id);
        });
        throw new Meteor.Error("Rock sync issue", "User doc ids " + (ids.join(", ")) + " need investigated because they seem to be duplicates");
    } else if (users.length === 0 && hasEmail) {
        tempPassword = String(Date.now() * Math.random());
        userId = Apollos.user.create(user.emails[0].address, tempPassword);
        usr = Apollos.users.findOne(userId);
    } else {
        usr = users[0];
    }
    if (platform && platform.toUpperCase() === Rock.name.toUpperCase()) {
        user.updatedBy = Rock.name;
    } else {
        user.updatedBy = Apollos.name;
    }
    delete user._id;
    if (usr) {
        Apollos.users.update({
            _id: usr._id
        }, {
            $set: user
        });
        return usr._id;
    }
};

Meteor.startup(function () {
    var initializing;
    initializing = true;
    Apollos.users.find().observe({
        added: function (doc) {
            if (initializing) {
                return;
            }
            if (doc.updatedBy !== Rock.name && doc.updatedBy) {
                return Rock.user.create(doc);
            }
        },
        changed: function (newDoc, oldDoc) {
            if (newDoc.updatedBy !== Rock.name) {
                return Rock.user.update(newDoc);
            }
        },
        removed: function (doc) {
            if (doc.updatedBy !== Rock.name) {
                Rock.user["delete"](doc, Rock.name);
            }
        }
    });
    return initializing = false;
});