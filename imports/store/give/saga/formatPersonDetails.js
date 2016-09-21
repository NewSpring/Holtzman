import moment from "moment";

const formatPersonDetails = (give) => {
  const { data, transactions, total, schedules, savedAccount } = give;

  // here we format data for the NMI processing
  const joinedData = {
    amount: total,
    billing: {
      "first-name": data.personal.firstName,
      "last-name": data.personal.lastName,
      email: data.personal.email,
      address1: data.billing.streetAddress,
      address2: data.billing.streetAddress2 || "",
      city: data.billing.city,
      state: data.billing.state,
      postal: data.billing.zip,
    },
  };

  const campusId = data.personal.campusId;
  joinedData["merchant-defined-field-2"] = campusId;

  if (schedules && Object.keys(schedules).length) {
    // // @TODO allow custom start dates
    // joinedData["start-date"] = moment().format("YYYYMMDD")
    // @TODO allow number of payments
    joinedData.plan = {
      payments: 0,
      amount: total,
    };

    delete joinedData.amount;
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const key in schedules) {
      const schedule = schedules[key];
      switch (schedule.frequency) {
        case "One-Time":
          joinedData.plan.payments = 1;
          joinedData.plan["month-frequency"] = 12;
          joinedData.plan["day-of-month"] = schedule.start ?
            moment(schedule.start).date() :
            moment().date()
          ;
          break;
        case "Weekly":
          joinedData.plan["day-frequency"] = 7;
          break;
        case "Bi-Weekly":
          joinedData.plan["day-frequency"] = 14;
          break;
        // case "Twice a Month":
        //   joinedData.plan["month-frequency"] =
        //   break;
        case "Monthly":
          joinedData.plan["month-frequency"] = 1;
          joinedData.plan["day-of-month"] = schedule.start ?
            moment(schedule.start).date() :
            moment().date()
          ;
          break;
        default:
          break;
      }

      joinedData["start-date"] = schedule.start ?
        moment(schedule.start).format("YYYYMMDD") :
        moment().add(1, "days").format("YYYYMMDD")
      ;
      joinedData["merchant-defined-field-3"] = joinedData["start-date"];

      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const transaction in transactions) {
        joinedData["merchant-defined-field-1"] = transaction;
        break;
      }

      // @TODO support multiple accounts at once
      break;
    }
  } else if (transactions && Object.keys(transactions).length) {
    joinedData.product = [];
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const transaction in transactions) {
      joinedData.product.push({
        quantity: 1,
        "product-code": transaction,
        description: transactions[transaction].label,
        "total-amount": transactions[transaction].value,
      });
    }
  }

  if (savedAccount.id) {
    joinedData.savedAccount = savedAccount.id;
    joinedData.savedAccountName = savedAccount.name;
  }

  return joinedData;
};

export default formatPersonDetails;
