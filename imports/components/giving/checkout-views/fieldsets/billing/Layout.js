// @flow

import Forms from "../../../../@primitives/UI/forms";
import { StateOrTerritory, Zip } from "../shared";

type IHeader = {
  override?: React$Element<any>,
};

const Header = ({ override }: IHeader) => {
  if (override) return override;
  return <h4 className="text-center">Billing Address</h4>;
};

type INextButton = {
  billing: Object,
  next: Function,
  className: string,
};

const NextButton = ({ billing, next, className = "" }: INextButton) => {
  const btnClasses = [className].concat(["push-left"]);
  let disabled = false;
  if (!billing.streetAddress || !billing.city) {
    btnClasses.push("btn--disabled");
    disabled = true;
  } else {
    btnClasses.push("btn");
  }

  return (
    <button
      className={btnClasses.join(" ")}
      disabled={disabled}
      type="submit"
      onClick={next}
    >
      Next
    </button>
  );
};

type ILayout = {
  back: Function,
  billing: Object,
  children?: React$Element<any>,
  city: Function,
  countries: Object[],
  header?: React$Element<any>,
  next: Function,
  saveCountry: Function,
  saveState: Function,
  states: Object[],
  streetAddress: Function,
  streetAddress2: Function,
  zip: Function,
  transactionType: string,
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
  transactionType,
}: ILayout) =>
  <div>
    <div className="push-double@lap-and-up push">
      <Header override={header} />
    </div>

    {children}

    <div className="soft-sides">
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

      {countries &&
        countries.length > 0 &&
        <Forms.Select
          name="country"
          label="Country"
          errorText="Please enter your country"
          defaultValue={billing.country ? billing.country : "US"}
          items={countries}
          validation={saveCountry}
          includeBlank
        />}

      <Forms.Input
        name="city"
        label="City"
        errorText="Please enter your city"
        defaultValue={billing.city}
        validation={city}
      />

      <div className="grid">
        {states &&
          states.length > 0 &&
          <StateOrTerritory
            billing={billing}
            states={states}
            saveState={saveState}
          />}
        <Zip billing={billing} zip={zip} />
      </div>
    </div>

    <div>
      {transactionType !== "savedPayment" &&
        <a
          href=""
          tabIndex={-1}
          onClick={back}
          className="btn--small btn--dark-tertiary display-inline-block"
        >
          Back
        </a>}

      <NextButton
        billing={billing}
        next={next}
        className={`${transactionType !== "savedPayment" ? "" : "flush-left"}`}
      />
    </div>
  </div>;

export default Layout;

export { Header, NextButton };
