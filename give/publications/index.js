
import accounts from "./accounts"
import transactions from "./transactions"
import scheduledTransactions from "./scheduledTransactions"
import paymentDetails from "./paymentDetails"

// observers
import {
  transactions as transactionsObserver,
  schedules as scheduledTransactionsObserver
} from "../observers"

const publications = {
  accounts,
  transactions,
  scheduledTransactions,
  paymentDetails,
  transactionsObserver,
  scheduledTransactionsObserver
}

const publish = () => {
  for (let publication in publications) {
    publications[publication]()
  }
}

export {
  publish
}
