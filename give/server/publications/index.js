
import accounts from "./accounts"
import transactions from "./transactions"
import scheduledTransactions from "./scheduled-transactions"
import paymentDetails from "./paymentDetails"

const publications = {
  accounts,
  transactions,
  scheduledTransactions,
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
  scheduledTransactions,
  paymentDetails,
  publish
}
