Meteor.publish("definedValues", function () {
    return Apollos.definedValues.find();
});

Meteor.publish("people", function () {
    return Apollos.people.find({
        recordStatusValueId: 3
    });
});

Meteor.publish("userData", function () {
    if (this.userId) {
        return Meteor.users.find({
            _id: this.userId
        }, {
            fields: {
                "rock.personId": 1
            }
        });
    } else {
        return this.ready();
    }
});