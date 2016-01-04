/*global Meteor */

import { voidTransaction } from '../nmi'

const voidPurchase = (transactionId) => {

  return Meteor.wrapAsync(voidTransaction)(transactionId)

}

Meteor.methods({ 'Give.void': voidPurchase })

export default voidPurchase
