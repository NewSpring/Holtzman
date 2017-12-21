const creditCard = value => {
  if (value) {
    // remove non numbers
    let newValue = value.replace(/[^\d]+/g, "");

    // ensure correct length
    newValue = newValue.substring(0, 16);

    // break apart the value every four numbers
    newValue = newValue.match(/.{1,4}/g);

    // format the new value
    newValue = newValue.join("-");

    return newValue;
  }

  return value;
};

export default creditCard;
