const monetize = (amount, fixed) => {
  let value;

  if (typeof amount === "number") {
    value = `${amount}`;
  }

  if (!value.length) {
    return "$0.00";
  }

  value = value.replace(/[^\d.-]/g, "");

  const decimals = value.split(".")[1];
  if ((decimals && decimals.length >= 1) || fixed) {
    value = Number(value).toFixed(2);
    value = String(value);
  }

  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `$${value}`;
};

export default monetize;
