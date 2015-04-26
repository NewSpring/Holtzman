/*

  @TODO: Move to NewSpring/apollos-give
 */
Apollos.transaction = {};


/*

  Apollos.transaction.translate

  @example take data from a service and format it for Apollos

    Apollos.transaction.translate([obj, platform])

  @param transaction [Object] existing object to be translated
  @param platform [String] platform to be translated from
 */

Apollos.transaction.translate = function (transaction, platform) {
    var dateTime, existingTransaction;
    if (!transaction) {
        throw new Meteor.Error("Translation Error", "There is no default transaction setup because transactions are a one-way sync from Rock");
    }
    if (!platform) {
        platform = Rock.name;
    }
    switch (platform.toUpperCase()) {
    case Rock.name.toUpperCase():
        existingTransaction = Apollos.transactions.findOne({
            $or: [{
                guid: RegExp(transaction.Guid, "i")
            },
            {
                transactionId: transaction.Id
            }]
        });
        dateTime = transaction.TransactionDateTime;
        dateTime = Rock.utilities.getJavaScriptDate(dateTime);
        existingTransaction || (existingTransaction = {});
        existingTransaction.transactionId = transaction.Id;
        existingTransaction.guid = transaction.Guid;
        existingTransaction.sourceTypeValueId = transaction.SourceTypeValueId;
        existingTransaction.creditCardTypeValueId = transaction.CreditCardTypeValueId;
        existingTransaction.currencyTypeValueId = transaction.CurrencyTypeValueId;
        existingTransaction.transactionDateTime = dateTime;
        return existingTransaction;
    }
};


/*

  Apollos.transaction.update

  @example update a transaction in apollos with data from the platform

    Apollos.transaction.update([obj, platform])

  @param transaction [Object] existing transaction from other service
  @param platform [String] platform to be update from
 */

Apollos.transaction.update = function (transaction, platform) {
    return Apollos.entityHelpers.update("transaction", "transactions", transaction, platform);
};


/*

  Apollos.transaction.delete

  @example take a transaction and delete it

    Apollos.transaction.delete(transaction, [platform])

  @param transaction [Object|String|Number] existing document, _id, or rock.transactionId
  @param platform [String] platform initiating the delete
 */

Apollos.transaction["delete"] = function (transaction, platform) {
    return Apollos.entityHelpers["delete"]("transaction", "transactions", transaction, platform);
};