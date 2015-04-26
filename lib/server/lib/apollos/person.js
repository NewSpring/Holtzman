/*

  Apollos.person.translate

  @example take data from a service and format it for Apollos

    Apollos.person.translate([obj, platform])

  @param person [Object] existing object to be translated
  @param platform [String] platform to be translated to
 */
Apollos.person.translate = function (person, platform) {
    var date, existingPerson, i, len, phone, photoPath, ref;
    if (!platform) {
        platform = Rock.name;
    }
    switch (platform.toUpperCase()) {
    case Rock.name.toUpperCase():
        if (person) {
            existingPerson = Apollos.people.findOne({
                $or: [{
                    guid: RegExp(person.Guid, "i")
                },
                {
                    personId: person.Id
                }]
            });
        } else {
            person = Rock.person();
        }
        existingPerson || (existingPerson = {
            personId: person.Id
        });
        existingPerson.guid = person.Guid;
        existingPerson.firstName = person.FirstName;
        existingPerson.middleName = person.MiddleName;
        existingPerson.lastName = person.LastName;
        existingPerson.nickName = person.NickName;
        existingPerson.preferredEmail = person.Email;
        existingPerson.birthDay = person.BirthDay;
        existingPerson.birthMonth = person.BirthMonth;
        existingPerson.birthYear = person.BirthYear;
        existingPerson.gender = person.Gender;
        existingPerson.recordStatusValueId = person.RecordStatusValueId;
        existingPerson.titleValueId = person.TitleValueId;
        existingPerson.suffixValueId = person.SuffixValueId;
        existingPerson.maritalStatusValueId = person.MaritalStatusValueId;
        existingPerson.givingGroupId = person.GivingGroupId;
        existingPerson.emailPreference = person.EmailPreference;
        if (person.Photo) {
            photoPath = person.Photo.Path;
            existingPerson.photoId = person.Photo.Id;
            if (photoPath.indexOf("~/" === 0)) {
                photoPath = photoPath.substring(2);
            }
            existingPerson.photoURL = photoPath;
        } else {
            existingPerson.photoURL = null;
            existingPerson.photoId = null;
        }
        if (person.AnniversaryDate) {
            date = Rock.utilities.getJavaScriptDate(person.AnniversaryDate);
            existingPerson.weddingYear = date.getFullYear();
            existingPerson.weddingMonth = date.getMonth() + 1;
            existingPerson.weddingDay = date.getDate();
        } else {
            existingPerson.weddingYear = null;
            existingPerson.weddingMonth = null;
            existingPerson.weddingDay = null;
        }
        existingPerson.cellPhone = null;
        existingPerson.homePhone = null;
        existingPerson.workPhone = null;
        ref = person.PhoneNumbers;
        for (i = 0, len = ref.length; i < len; i++) {
            phone = ref[i];
            switch (phone.NumberTypeValue.Value) {
            case "Mobile":
                existingPerson.cellPhone = phone.Number;
                break;
            case "Home":
                existingPerson.homePhone = phone.Number;
                break;
            case "Work":
                existingPerson.workPhone = phone.Number;
            }
        }
        existingPerson.personAliasIds || (existingPerson.personAliasIds = []);
        return existingPerson;
    }
};


/*

  Apollos.person.update

  @example update a person in apollos with data from Rock

    Apollos.person.update([obj, platform])

  @param person [Object] existing person from other service to be updated
  @param platform [String] platform to be update from
 */

Apollos.person.update = function (person, platform) {
    return Apollos.entityHelpers.update("person", "people", person, platform);
};


/*

  Apollos.person.delete

  @example take a person and delete it

    Apollos.person.delete(user, [platform])

  @param person [Object|String|Number] existing document, _id, or rock.personId
  @param platform [String] platform initiating the delete
 */

Apollos.person["delete"] = function (person, platform) {
    return Apollos.entityHelpers["delete"]("person", "people", person, platform);
};


/*

  Update bindings
 */

Meteor.startup(function () {
    var initializing;
    initializing = true;
    Apollos.people.find().observe({
        added: function (doc) {
            if (initializing) {
                return;
            }
            if (doc.updatedBy !== Rock.name) {
                return Rock.person.create(doc);
            }
        },
        changed: function (newDoc, oldDoc) {
            if (newDoc.updatedBy !== Rock.name) {
                return Rock.person.update(newDoc);
            }
        },
        removed: function (doc) {}
    });
    return initializing = false;
});