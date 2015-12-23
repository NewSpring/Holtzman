
let PaymentDetails = {}

if (Meteor.isClient) {
  PaymentDetails = new Mongo.Collection("paymentDetails")
}

if (Meteor.isServer) {
  PaymentDetails = new Mongo.Collection(null)
}

export default PaymentDetails
