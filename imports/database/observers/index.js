
import transactions from "./transactions"
import schedules from "./scheduledTransactions"


const observers = {
  transactions,
  schedules
}

const observe = () => {
  for (let observer in observers) {
    observers[observer]()
  }
}

export default observe
