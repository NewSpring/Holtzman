const zipCode = value => {
  const regex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
  return regex.test(value);
};

const locationBasedZipCode = value => {
  console.log("value = ", value);
  if (value === "Using your location") return true;
  const regex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
  return regex.test(value);
};

export { zipCode, locationBasedZipCode };
