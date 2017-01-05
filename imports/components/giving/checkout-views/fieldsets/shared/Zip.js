// @flow
import Forms from "../../../../@primitives/UI/forms";

type IZip = {
  billing: Object,
  zip: Function,
};

const Zip = ({
  billing,
  zip,
}: IZip) => {
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

export default Zip;
