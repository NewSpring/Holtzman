
import accounts from "./accounts"
import transactions from "./transactions"
import paymentDetails from "./paymentDetails"

const publications = {
  accounts,
  transactions,
  paymentDetails
}

const publish = () => {
  for (let publication in publications) {
    publications[publication]()
  }
}

export default {
  accounts,
  transactions,
  paymentDetails,
  publish
}
