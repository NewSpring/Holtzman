import { PropTypes } from "react";
import Forms from "../../../../components/forms";

const Header = ({ override }) => {
  if (override) return override;
  return (
    <h4 className="text-center">
      Billing Address
    </h4>
  );
};

Header.propTypes = {
  override: PropTypes.object,
};

const StateOrTerritory = ({
  billing,
  states,
  saveState,
}) => {
  if (!billing.country || billing.country === "US" || billing.country === "CA") {
    return (
      <div className="grid__item one-half">
        <Forms.Select
          name="state"
          label="State/Territory"
          errorText="Please enter your state"
          defaultValue={billing.state ? billing.state : "SC"}
          items={states}
          validation={saveState}
          includeBlank
        />
      </div>
    );
  }
  return null;
};

StateOrTerritory.propTypes = {
  billing: PropTypes.object,
  states: PropTypes.array,
  saveState: PropTypes.func,
};

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

const NextButton = ({
  billing,
  next,
}) => {
  const btnClasses = ["push-left"];
  let disabled = false;
  if (!billing.streetAddress || !billing.city) {
    btnClasses.push("btn--disabled");
    disabled = true;
  } else {
    btnClasses.push("btn");
  }

  return (
    <button className={btnClasses.join(" ")} disabled={disabled} type="submit" onClick={next}>
      Next
    </button>
  );
};

NextButton.propTypes = {
  billing: PropTypes.object,
  next: PropTypes.func,
};

const Layout = ({
  back,
  billing,
  children,
  city,
  countries,
  header,
  next,
  saveCountry,
  saveState,
  states,
  streetAddress,
  streetAddress2,
  zip,
}) => (
  <div>
    <div className="push-double@lap-and-up push">
      <Header override={header} />
    </div>

    {children}

    <div className="soft">

      <Forms.Input
        name="streetAddress"
        label="Street Address"
        errorText="Please enter your address"
        validation={streetAddress}
        defaultValue={billing.streetAddress}
        autoFocus
      />
      <Forms.Input
        name="streetAddress2"
        label="Street Address (optional)"
        validation={streetAddress2}
        defaultValue={billing.streetAddress2}
      />

      <Forms.Select
        name="country"
        label="Country"
        errorText="Please enter your country"
        defaultValue={billing.country ? billing.country : "US"}
        items={countries}
        validation={saveCountry}
        includeBlank
      />

      <Forms.Input
        name="city"
        label="City"
        errorText="Please enter your city"
        defaultValue={billing.city}
        validation={city}
      />

      <div className="grid">
        <StateOrTerritory
          billing={billing}
          states={states}
          saveState={saveState}
        />
        <Zip
          billing={billing}
          zip={zip}
        />
      </div>
    </div>

    <div>
      <a href="" tabIndex={-1} onClick={back} className="btn--small btn--dark-tertiary display-inline-block">
        Back
      </a>

      <NextButton
        billing={billing}
        next={next}
      />
    </div>

  </div>
);

Layout.propTypes = {
  back: PropTypes.func,
  billing: PropTypes.object,
  children: PropTypes.object,
  city: PropTypes.func,
  countries: PropTypes.array,
  header: PropTypes.object,
  next: PropTypes.func,
  saveCountry: PropTypes.func,
  saveState: PropTypes.func,
  states: PropTypes.array,
  streetAddress: PropTypes.func,
  streetAddress2: PropTypes.func,
  zip: PropTypes.func,
};

export default Layout;
