
import transactions from "./transactions";
import schedules from "./scheduledTransactions";


const observers = {
  transactions,
  schedules,
};

const observe = () => {
  for (const observer in observers) { // eslint-disable-line
    observers[observer]();
  }
};

export default observe;
