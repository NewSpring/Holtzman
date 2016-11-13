import { PropTypes } from "react";
import Forms from "../../../../components/forms";

const Zip = ({
  billing,
  zip,
}) => {
  let length = "one-whole";
  if (!billing.country || billing.country === "US" || billing.country === "CA") {
    length = "one-half";
  }
  return (
    <div className={`grid__item ${length}`}>
      <Forms.Input
        name="zip"
        label="Zip/Postal"
        errorText="Please enter your zip"
        defaultValue={billing.zip}
        onChange={zip}
        validation={zip}
      />
    </div>
  );
};

Zip.propTypes = {
  billing: PropTypes.object,
  zip: PropTypes.func,
};

export default Zip;
