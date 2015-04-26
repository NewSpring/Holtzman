Apollos.entityHelpers = {

/*
  
    Apollos.entityHelpers.update
  
    @example update an entity in apollos with data from a platform
  
      pollos.entityHelpers.update "person", "people", person, "Rock"
  
    @param singular [String] The singular form of the entities name
    @param plural [String] The plural form of the entities name
    @param entity [Object] existing entity from other service to be updated
    @param platform [String] platform to be updated from
   */
    update: function (singular, plural, entity, platform) {
        var existing, ids, matches, mongoId, query, singularIdKeyValue;
        entity = Apollos[singular].translate(entity, platform);
        singularIdKeyValue = {};
        singularIdKeyValue[singular + "Id"] = entity[singular + "Id"];
        if (platform && platform.toUpperCase() === Rock.name.toUpperCase()) {
            entity.updatedBy = Rock.name;
        } else {
            entity.updatedBy = Apollos.name;
        }
        query = {
            $or: [
            singularIdKeyValue,
            {
                guid: RegExp(entity.guid, "i")
            }]
        };
        matches = Apollos[plural].find(query, {
            sort: {
                updatedDate: 1
            }
        });
        if (matches.count() > 1) {
            ids = matches.map(function (m) {
                return m._id;
            });
            ids.pop();
            Apollos[plural].remove({
                _id: {
                    $in: ids
                }
            });
            matches = Apollos[plural].find(query);
        }
        if (matches.count() === 1) {
            existing = matches.fetch()[0];
            mongoId = existing._id;
            Apollos[plural].update({
                _id: mongoId
            }, {
                $set: entity
            });
        } else {
            mongoId = Apollos[plural].insert(entity);
        }
        return mongoId;
    },

/*
  
    Apollos.entityHelpers.delete
  
    @example take an entity and delete it
  
      Apollos.entityHelpers.delete("person", "people", 3, "Rock")
  
    @param singular [String] The singular form of the entities name
    @param plural [String] The plural form of the entities name
    @param transaction [Object|String|Number] existing document, _id, or
      rock.entityId
    @param platform [String] platform initiating the delete
   */
    "delete": function (singular, plural, identifier, platform) {
        var entity, singularIdKeyValue;
        if (typeof identifier === "number") {
            singularIdKeyValue = {};
            singularIdKeyValue[singular + "Id"] = identifier;
            entity = Apollos[plural].findOne(singularIdKeyValue);
        } else if (typeof identifier === "string") {
            entity = Apollos[plural].findOne(identifier);
        } else {
            entity = identifier;
        }
        if (typeof entity !== "object") {
            throw new Meteor.Error("Delete Error", "Could not delete " + singular + " identified by " + identifier);
        }
        if (platform && platform.toUpperCase() === Rock.name.toUpperCase()) {
            entity.updatedBy = Rock.name;
        } else {
            entity.updatedBy = Apollos.name;
        }
        Apollos[plural].update({
            _id: entity._id
        }, {
            $set: {
                "updatedBy": entity.updatedBy
            }
        });
        return Apollos[plural].remove(entity._id);
    }
};