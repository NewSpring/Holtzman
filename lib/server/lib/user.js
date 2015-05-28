Apollos.user.hasAccount = function (email) {
    var usr;
    usr = Meteor.users.findOne({
        "emails.address": email
    });
    if (usr) {
        return true;
    }
    return false;
};

Meteor.methods({
    "Apollos.user.hasAccount": Apollos.user.hasAccount
});


/*

  Apollos.user.translate

  @example take data from a service and format it for Apollos

    Apollos.user.translate([obj, platform])

  @param user [Object] existing object to be translated
  @param platform [String] platform to be translated to
 */

Apollos.user.translate = function (user, platform) {
    return Apollos.documentHelpers.translate("user", user, platform);
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
    return Apollos.documentHelpers["delete"]("user", "users", user, platform);
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
    user = Apollos.user.translate(user, platform);
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
    if (platform) {
        user.updatedBy = platform.toUpperCase();
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
    return Apollos.observe("users");
});