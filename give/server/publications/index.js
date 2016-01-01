
import accounts from "./accounts"
import transactions from "./transactions"
import scheduledTransactions from "./scheduled-transactions"
import paymentDetails from "./paymentDetails"

// observers
import { transactions as transactionsObserver } from "../observers"

const publications = {
  accounts,
  transactions,
  scheduledTransactions,
  paymentDetails,
  transactionsObserver
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
