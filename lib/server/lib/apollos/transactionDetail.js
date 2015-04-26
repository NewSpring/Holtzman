/*

  @TODO: Move to NewSpring/apollos-give
 */
Apollos.transactionDetail = {};


/*

  Apollos.transactionDetail.translate

  @example take data from a service and format it for Apollos

    Apollos.transactionDetail.translate([obj, platform])

  @param transactionDetail [Object] existing object to be translated
  @param platform [String] platform to be translated from
 */

Apollos.transactionDetail.translate = function (transactionDetail, platform) {
    var existingDetail;
    if (!transactionDetail) {
        throw new Meteor.Error("Translation Error", "There is no default transactionDetail setup because transactionDetails are a one-way sync from Rock");
    }
    if (!platform) {
        platform = Rock.name;
    }
    switch (platform.toUpperCase()) {
    case Rock.name.toUpperCase():
        existingDetail = Apollos.transactionDetails.findOne({
            $or: [{
                guid: RegExp(transactionDetail.Guid, "i")
            },
            {
                transactionDetailId: transactionDetail.Id
            }]
        });
        existingDetail || (existingDetail = {});
        existingDetail.transactionDetailId = transactionDetail.Id;
        existingDetail.guid = transactionDetail.Guid;
        existingDetail.transactionId = transactionDetail.TransactionId;
        existingDetail.accountId = transactionDetail.AccountId;
        existingDetail.amount = transactionDetail.Amount;
        return existingDetail;
    }
};


/*

  Apollos.transactionDetail.update

  @example update a transactionDetail in apollos with data from the platform

    Apollos.transactionDetail.update([obj, platform])

  @param transactionDetail [Object] existing transactionDetail from other service
  @param platform [String] platform to be update from
 */

Apollos.transactionDetail.update = function (transactionDetail, platform) {
    return Apollos.entityHelpers.update("transactionDetail", "transactionDetails", transactionDetail, platform);
};


/*

  Apollos.transactionDetail.delete

  @example take a transactionDetail and delete it

    Apollos.transactionDetail.delete(transactionDetail, [platform])

  @param transactionDetail [Object|String|Number] existing document, _id, or rock.transactionDetailId
  @param platform [String] platform initiating the delete
 */

Apollos.transactionDetail["delete"] = function (transactionDetail, platform) {
    return Apollos.entityHelpers["delete"]("transactionDetail", "transactionDetails", transactionDetail, platform);
};