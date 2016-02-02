import Moment from "moment"

const formatPersonDetails = (give) => {
  const { data, transactions, total, schedules, savedAccount } = give

  // here we format data for the NMI processing
  let joinedData = {
    amount: total,
    billing: {
      "first-name": data.personal.firstName,
      "last-name": data.personal.lastName,
      email: data.personal.email,
      address1: data.billing.streetAddress,
      address2: data.billing.streetAddress2 || "",
      city: data.billing.city,
      state: data.billing.state,
      postal: data.billing.zip
    }

  }


  if (Object.keys(schedules).length) {
    // @TODO allow custom start dates
    joinedData["start-date"] = Moment().add(1, "days").format("YYYYMMDD")
    // @TODO allow number of payments
    joinedData.plan = {
      payments: 0,
      amount: total
    }

    delete joinedData.amount

    for (let key in schedules) {
      let schedule = schedules[key]
      switch (schedule.frequency) {
        case "One Time":
          joinedData.plan["day-of-month"] = schedule.start ? schedule.start : Moment().date()
          break;
        case "Weekly":
          joinedData.plan["day-frequency"] = 7
          break;
        case "Bi-Weekly":
          joinedData.plan["day-frequency"] = 14
          break;
        // case "Twice a Month":
        //   joinedData.plan["month-frequency"] =
        //   break;
        case "Monthly":
          joinedData.plan["month-frequency"] = 1
          joinedData.plan["day-of-month"] = schedule.start ? schedule.start : Moment().date()
          break;
      }

      for (let transaction in transactions) {
        joinedData["merchant-defined-field-1"] = transaction
        break
      }

      // @TODO support multiple accounts at once
      break
    }


  } else {

    joinedData.product = []
    for (let transaction in transactions) {
      joinedData.product.push({
        "quantity": 1,
        "product-code": transaction,
        description: transactions[transaction].label,
        "total-amount": transactions[transaction].value
      })
    }
  }

  if (savedAccount.id) {
    joinedData.savedAccount = savedAccount.id
    joinedData.savedAccountName = savedAccount.name
  }

  return joinedData
}

export default formatPersonDetails
