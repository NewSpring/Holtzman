
import { api } from "../../../../rock/lib/api"
import { charge as gatewayCharge } from "../nmi"

const charge = (token) => {

  let response = {}

  try {
    response = Meteor.wrapAsync(gatewayCharge)(token)
  } catch (e) {
    console.log(e.Error)
    throw new Meteor.Error(e)
  }


  const user = Meteor.user()

  if (user) {
    Meteor.users.upsert(user._id,{
      $set: {
        "services.nmi": {
          customerId: response["customer-id"],
          // customerVaultId: response["customer-vault-id"],
        }
      }
    }, (err, data) => {
      console.log(err, data)
    })
    console.log("Async create record in Rock now")
  }

  return response

}

Meteor.methods({ "Give.charge": charge })

export default charge
