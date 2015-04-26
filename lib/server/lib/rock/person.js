/*

  Do we need this do anything besides exist?
 */
Rock.people = {};


/*

  Rock.person

  @example return empty person

    rockPerson = Rock.person()
 */

Rock.person = function () {
    return Rock.person.translate();
};


/*

  Rock.person.create

  @example create a person on Rock

    Rock.person.update()

  @param person [Object] Person to create
 */

Rock.person.create = function (person) {
    var mongoId;
    mongoId = person._id;
    person = Rock.person.translate(person);
    delete person.Id;
    person.Guid || (person.Guid = Rock.utilities.makeNewGuid());
    Apollos.people.update({
        _id: mongoId
    }, {
        $set: {
            guid: person.Guid,
            updatedBy: Rock.name
        }
    });
    return Rock.apiRequest("POST", "api/People", person, function (error, newId) {
        var query;
        if (error) {
            debug("Rock create failed:");
            debug(error);
            return;
        }
        query = "api/PersonAlias ?$filter= AliasPersonGuid eq guid'" + person.Guid + "' &$select= AliasPersonId";
        return Meteor.setTimeout(function () {
            return Rock.apiRequest("GET", query, function (error, result) {
                var aliasIds;
                if (error) {
                    debug("Rock get failed:");
                    debug(error);
                    return;
                }
                if (result.data && result.data.length) {
                    aliasIds = result.data.map(function (a) {
                        return a.AliasPersonId;
                    });
                    return Apollos.people.update({
                        _id: mongoId
                    }, {
                        $set: {
                            personId: newId,
                            personAliasIds: aliasIds,
                            updatedBy: Rock.name
                        }
                    });
                }
            });
        }, 250);
    });
};


/*

  Rock.person.translate

  @example take data from a service and format it for Rock

    Rock.person.translate([obj, platform])

  @param person [Object] existing object to be translated
  @param platform [String] platform to be translated to
 */

Rock.person.translate = function (person, platform) {
    var anniversary, rockPerson;
    if (!platform) {
        platform = Apollos.name;
    }
    switch (platform.toUpperCase()) {
    case Apollos.name.toUpperCase():
        person || (person = {});
        if (person.weddingYear && person.weddingMonth && person.weddingDay) {
            anniversary = new Date(person.weddingYear, person.weddingMonth - 1, person.weddingDay);
            anniversary = Rock.utilities.getRockDate(anniversary);
        }
        rockPerson = {
            IsSystem: false,
            RecordStatusValueId: person.recordStatusValueId || 3,
            TitleValueId: person.titleValueId || null,
            FirstName: person.firstName || null,
            NickName: person.nickName || null,
            MiddleName: person.middleName || null,
            LastName: person.lastName || null,
            SuffixValueId: person.suffixValueId || null,
            PhotoId: person.photoId || null,
            BirthDay: person.birthDay || null,
            BirthMonth: person.birthMonth || null,
            BirthYear: person.birthYear || null,
            Gender: person.gender || 0,
            MaritalStatusValueId: person.maritalStatusValueId || null,
            AnniversaryDate: anniversary || null,
            GivingGroupId: person.givingGroupId || null,
            Email: person.preferredEmail || null,
            EmailPreference: person.emailPreference || 0,
            Id: person.personId || null,
            Guid: person.guid || null
        };
        return rockPerson;
    }
};


/*

  Rock.person.update

  @example update a person on Rock

    Rock.person.update(personDoc)

  @param person [Object] person to update
 */

Rock.person.update = function (person) {
    var id, rockPerson;
    rockPerson = Rock.person.translate(person);
    if (!rockPerson.Id || !rockPerson.Guid) {
        Rock.person.create(person);
        return;
    } else if (!rockPerson.Id) {
        return;
    }
    id = rockPerson.Id;
    delete rockPerson.Id;
    delete rockPerson.Guid;
    return Rock.apiRequest("PATCH", "api/People/" + id, rockPerson, function (error, result) {
        if (error) {
            debug("Rock update failed:");
            debug(error);
        }
    });
};


/*

  Rock.people.refreshAliases

  @example refesh all people from Rock

    Rock.people.refresh()

  @param throwErrors [Boolean] switch to silence error throwing
 */

Rock.people.refreshAliases = function (throwErrors, wait) {
    var aliasQuery;
    if (wait) {

/*
      Rock pre-save trigger means that if the id is 0, it was a create. We need
      to get the id and the aliases though.  What is a better way to do this?
     */
        Meteor.setTimeout(function () {
            return Rock.people.refreshAliases(throwErrors);
        }, 1500);
        return;
    }
    aliasQuery = "api/PersonAlias ?$select= PersonId, AliasPersonId, AliasPersonGuid";
    return Rock.apiRequest("GET", aliasQuery, function (error, result) {
        var currentGroup, grouped, guid, id, people, personAliasIds, personId, results;
        if (error && throwErrors) {
            throw new Meteor.Error("Rock sync issue", error);
        } else if (error) {
            debug("Rock sync failed:");
            debug(error);
            return;
        }
        grouped = _.groupBy(result.data, "PersonId");
        people = [];
        results = [];
        for (personId in grouped) {
            currentGroup = grouped[personId];
            if (currentGroup.length === 0) {
                continue;
            }
            id = Number(personId);
            guid = currentGroup[0].AliasPersonGuid;
            personAliasIds = currentGroup.map(function (element) {
                return element.AliasPersonId;
            });
            Apollos.people.update({
                guid: RegExp(guid, "i")
            }, {
                $set: {
                    personId: id,
                    personAliasIds: personAliasIds,
                    updatedBy: Rock.name
                }
            });
            results.push(debug("Synced aliases from Rock: " + id));
        }
        return results;
    });
};


/*

  Rock.people.refreshDetails

  @example refesh a person's details from Rock

    Rock.people.refreshDetails person, throwErrors

  @param person [Object|Number|String] exisiting person document, rock.personId,
    or person._id
  @param throwErrors [Boolean] switch to silence error throwing
 */

Rock.people.refresh = function (throwErrors) {
    var peopleQuery;
    peopleQuery = "api/People ?$expand= PhoneNumbers, PhoneNumbers/NumberTypeValue, Photo, RecordTypeValue &$select= AnniversaryDate, PhoneNumbers/Number, PhoneNumbers/NumberTypeValue/Value, BirthDay, BirthMonth, BirthYear, RecordStatusValueId, EmailPreference, Email, SuffixValueId, TitleValueId, MaritalStatusValueId, Gender, Photo/Path, Photo/Id, GivingGroupId, Id, FirstName, LastName, MiddleName, NickName, Guid &$filter= IsSystem eq false and RecordTypeValue/Value eq 'Person'";
    Rock.refreshEntity(peopleQuery, "person", "people", throwErrors);
    return Rock.people.refreshAliases(true, true);
};