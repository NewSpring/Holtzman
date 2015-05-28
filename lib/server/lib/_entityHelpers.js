Apollos.documentHelpers = {
    translate: function (doc, data, platform) {
        if (!platform) {
            Apollos.debug("must specify platform to translate to");
        }
        if (!Apollos[doc]._dictionary[platform]) {
            Apollos.debug("no translation found for " + platform + " in " + doc);
            return;
        }
        return Apollos[doc]._dictionary[platform](data);
    },

/*
  
    Apollos.documentHelpers.update
  
    @example update a doc in apollos with data from a platform
  
      Apollos.documentHelpers.update "person", "people", person, platform
  
    @param singular [String] The singular form of the entities name
    @param plural [String] The plural form of the entities name
    @param doc [Object] existing doc from other service to be updated
    @param platform [String] platform to be updated from
   */
    update: function (singular, plural, doc, platform) {
        var existing, ids, matches, mongoId, query, singularIdKeyValue;
        doc = Apollos[singular].translate(doc, platform);
        singularIdKeyValue = {};
        singularIdKeyValue[singular + "Id"] = doc[singular + "Id"];
        if (platform) {
            doc.updatedBy = platform.toUpperCase();
        } else {
            doc.updatedBy = Apollos.name;
        }
        query = {
            $or: [
            singularIdKeyValue,
            {
                guid: RegExp(doc.guid, "i")
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
                $set: doc
            });
        } else {
            mongoId = Apollos[plural].insert(doc);
        }
        return mongoId;
    },

/*
  
    Apollos.documentHelpers.delete
  
    @example take an colection and delete it
  
      Apollos.documentHelpers.delete("person", "people", 3, plaform)
  
    @param singular [String] The singular form of the entities name
    @param plural [String] The plural form of the entities name
    @param identifier [Object|String|Number] existing document, _id
    @param platform [String] platform initiating the delete
   */
    "delete": function (singular, plural, identifier, platform) {
        var doc, singularIdKeyValue;
        if (typeof identifier === "number") {
            singularIdKeyValue = {};
            singularIdKeyValue[singular + "Id"] = identifier;
            doc = Apollos[plural].findOne(singularIdKeyValue);
        } else if (typeof identifier === "string") {
            doc = Apollos[plural].findOne(identifier);
        } else {
            doc = identifier;
        }
        if (typeof doc !== "object") {
            throw new Meteor.Error("Delete Error", "Could not delete " + singular + " identified by " + identifier);
        }
        if (platform) {
            doc.updatedBy = platform.toUpperCase();
        } else {
            doc.updatedBy = Apollos.name;
        }
        Apollos[plural].update({
            _id: doc._id
        }, {
            $set: {
                "updatedBy": doc.updatedBy
            }
        });
        return Apollos[plural].remove(doc._id);
    }
};