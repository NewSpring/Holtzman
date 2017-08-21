const zipCode = value => {
  const regex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
  return regex.test(value);
};

const locationBasedZipCode = value => {
  if (value === "Using your location" || value === "") return true;
  const regex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
  return regex.test(value);
};

export { zipCode, locationBasedZipCode };
