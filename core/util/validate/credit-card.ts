import defaultRegex from "../regex/defaults"

const creditCard = (value : string) : boolean => {

  value = value.replace(/-/g, "")

  if (defaultRegex.startOfVisa.test(value)) {

    let regex = /^4[0-9]{12}(?:[0-9]{3})?$/

    return regex.test(value)

  } else if (defaultRegex.startOfMastercard.test(value)) {

    const regex = /^5[1-5][0-9]{14}$/
    return regex.test(value)

  } else if (defaultRegex.startOfAmEx.test(value)) {

    const regex = /^3[47][0-9]{13}$/
    return regex.test(value)

  } else if (defaultRegex.startOfDiscover.test(value)) {

    const regex = /^6(?:011|5[0-9]{2})[0-9]{12}$/
    return regex.test(value)

  } else {

    return false

  }

}

const creditExpiry = (value : string) : boolean => {

  const regex = /^((0[1-9])|(1[0-2]))\/((2009)|(20[1-2][0-9]))$/
  return regex.test(value)

}

const creditCVV = (value : string) : boolean => {

  const regex = /^[0-9]{3,4}$/
  return regex.test(value)

}

export {
  creditCard,
  creditExpiry,
  creditCVV
}
