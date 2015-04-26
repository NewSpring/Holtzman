/*

  @TODO: Allow this to be extended easily
 */
Rock.definedValues = {
    definedTypeGuids: {
        suffix: "16F85B3C-B3E8-434C-9094-F3D41F87A740",
        title: "4784CD23-518B-43EE-9B97-225BF6E07846",
        maritalStatus: "B4B92C3F-A935-40E1-A00B-BA484EAD613B",
        status: "8522BADD-2871-45A5-81DD-C76DA07E2E7E",
        phoneType: "8345DD45-73C6-4F5E-BEBD-B77FC83F18FD",
        transactionSource: "4F02B41E-AB7D-4345-8A97-3904DDD89B01",
        creditCardTypes: "2BD4FFB0-6C7F-4890-8D08-00F0BB7B43E9",
        currencyType: "1D1304DE-E83A-44AF-B11D-0C66DD600B81"
    }
};


/*

  Apollos.definedValues.refresh

  @example refesh defined values from Rock

    Apollos.definedValues.refresh throwErrors

  @param throwErrors [Boolean] switch to silence error throwing
 */

Rock.definedValues.refresh = function (throwErrors) {
    var filters, query, ref, typeGuid, typeName;
    filters = [];
    ref = Rock.definedValues.definedTypeGuids;
    for (typeName in ref) {
        typeGuid = ref[typeName];
        filters.push("Guid eq guid'" + typeGuid + "'");
    }
    query = "api/DefinedTypes ?$expand= DefinedValues &$select= Id, Guid, DefinedValues/Id, DefinedValues/Guid, DefinedValues/Value, DefinedValues/Description &$filter=" + (filters.join(' or '));
    return Rock.apiRequest("GET", query, function (error, result) {
        var definedType, definedTypes, definedValue, errorType, i, j, len, len1, message, newCount, oldCount, ref1;
        if (error) {
            message = (query.substring(0, 25)) + "...: " + error;
            errorType = "Rock sync issue";
            if (throwErrors) {
                throw new Meteor.Error(errorType, message);
            } else {
                debug(errorType);
                debug(message);
            }
            return;
        }
        definedTypes = result.data;
        oldCount = Apollos.definedValues.find().count();
        debug("Removing " + oldCount + " defined values in anticipation of sync");
        Apollos.definedValues.remove({});
        for (i = 0, len = definedTypes.length; i < len; i++) {
            definedType = definedTypes[i];
            ref1 = definedType.DefinedValues;
            for (j = 0, len1 = ref1.length; j < len1; j++) {
                definedValue = ref1[j];
                Apollos.definedValues.insert({
                    definedTypeGuid: definedType.Guid,
                    definedTypeId: definedType.Id,
                    definedValueId: definedValue.Id,
                    value: definedValue.Value,
                    description: definedValue.Description,
                    definedValueGuid: definedValue.Guid
                });
            }
        }
        newCount = Apollos.definedValues.find().count();
        return debug("Synced " + newCount + " defined values from Rock");
    });
};