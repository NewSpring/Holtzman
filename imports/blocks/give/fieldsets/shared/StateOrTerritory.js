import { PropTypes } from "react";
import Forms from "../../../../components/forms";

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

export default StateOrTerritory;
