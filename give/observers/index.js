
import transactions from "./transactions"
import schedules from "./scheduledTransactions"


const observers = {
  transactions,
  schedules
}

const observe = () => {
  for (let publication in observers) {
    publications[publication]()
  }
}

export {
  observe
}
