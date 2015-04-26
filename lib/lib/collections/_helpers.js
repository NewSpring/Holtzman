Apollos.generateSchema = function (schema) {
    schema.createdDate || (schema.createdDate = {
        type: Date,
        autoValue: function () {
            if (this.isInsert) {
                return new Date;
            } else if (this.isUpsert) {
                return {
                    $setOnInsert: new Date
                };
            } else {
                return this.unset();
            }
        }
    });
    schema.updatedDate || (schema.updatedDate = {
        type: Date,
        autoValue: function () {
            return new Date;
        }
    });
    schema.updatedBy || (schema.updatedBy = {
        type: String,
        optional: true
    });
    return new SimpleSchema(schema);
};