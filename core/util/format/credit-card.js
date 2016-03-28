const creditCard = (value : string) => {

  if (value) {

    // remove non numbers
    let newValue = value.replace(/[^\d]+/g, "")

    // ensure correct length
    newValue = newValue.substring(0, 16)

    // break apart the value every four numbers
    let regexResult = newValue.match(/.{1,4}/g)

    // format the new value
    newValue = regexResult.join("-")

    return newValue
  }

  return value
}

export default { creditCard }
