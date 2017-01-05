// @flow
import Forms from "../../../../@primitives/UI/forms";

type IStateOrTerritory = {
  billing: Object,
  states: Object[],
  saveState: Function,
};

const StateOrTerritory = ({
  billing,
  states,
  saveState,
}: IStateOrTerritory) => {
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

export default StateOrTerritory;
