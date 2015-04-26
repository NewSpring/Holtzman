/*

  @TODO: Move to NewSpring/apollos-give
 */
var _requiredIfNotFieldSet, amountDetail, giveTransactionSchema;

Apollos.give = {};


/*

  _requiredIfNotFieldSet

  @example check to see if schema is representing the given state

    _requiredIfNotFieldSet(schema, fieldName, value)

  @param schema [SimpleSchema] generally passed as @ or this
  @param fieldName [String] the name of a field within the schema
  @param value [String|Number] the value to check that the field is set to or,
  if ommitted, indicates that the field should simply be falsey
 */

_requiredIfNotFieldSet = function (schema, fieldName, value) {
    var isOfType;
    if (value != null) {
        isOfType = schema.field(fieldName).value === value;
    } else {
        isOfType = schema.field(fieldName).value == null;
    }
    if (isOfType && !schema.isSet && (!schema.operator || schemavalue === null || schema.value === "")) {
        return "required";
    }
};


/*
  Schema used for validating give transaction data
 */

amountDetail = new SimpleSchema({
    Amount: {
        type: Number
    },
    TargetAccountId: {
        type: Number,
        decimal: false
    }
});

giveTransactionSchema = new SimpleSchema({
    SourceAccountId: {
        decimal: false,
        type: Number,
        optional: true
    },
    Email: {
        type: String,
        regEx: Apollos.regex.email
    },
    AccountType: {
        type: String,
        optional: true,
        regEx: /^(checking|savings|credit)$/,
        custom: function () {
            return _requiredIfNotFieldSet(this, "SourceAccountId");
        }
    },
    AmountDetails: {
        type: [amountDetail]
    },
    AccountNumber: {
        type: String,
        optional: true,
        custom: function () {
            return _requiredIfNotFieldSet(this, "SourceAccountId");
        }
    },
    RoutingNumber: {
        type: String,
        optional: true,
        custom: function () {
            return _requiredIfNotFieldSet(this, "AccountType", "checking") || _requiredIfNotFieldSet(this, "AccountType", "savings");
        }
    },
    CCV: {
        type: String,
        optional: true,
        custom: function () {
            return _requiredIfNotFieldSet(this, "AccountType", "credit");
        }
    },
    ExpirationMonth: {
        type: Number,
        optional: true,
        custom: function () {
            return _requiredIfNotFieldSet(this, "AccountType", "credit");
        }
    },
    ExpirationYear: {
        type: Number,
        optional: true,
        custom: function () {
            return _requiredIfNotFieldSet(this, "AccountType", "credit");
        }
    },
    PersonId: {
        type: Number,
        decimal: false,
        optional: true
    },
    FirstName: {
        type: String
    },
    LastName: {
        type: String
    },
    Street1: {
        type: String
    },
    Street2: {
        type: String
    },
    City: {
        type: String
    },
    State: {
        type: String
    },
    PostalCode: {
        type: String
    },
    Country: {
        type: String
    },
    PhoneNumber: {
        type: String
    },
    CampusId: {
        decimal: false,
        type: Number
    }
});


/*

  Apollos.give.charge

  @example validate and pass transaction data to Rock

    Apollos.give.charge(data)

  @param data [Object] give transaction info. see schema
 */

Apollos.give.charge = function (data) {
    var giveContext;
    giveContext = giveTransactionSchema.newContext();
    if (!giveContext.validate(data)) {
        return false;
    }
    return Rock.apiRequest("POST", "api/Give", data, function (error, data) {
        if (error) {
            debug("Apollos give transaction failed:");
            debug(error);
            return false;
        }
        return true;
    });
};