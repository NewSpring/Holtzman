// @flow
import { css } from "aphrodite";
import Forms from "../../../../components/@primitives/UI/forms";
import Styles from "./styles-css";
import Svg from "../../../../components/@primitives/UI/svg";

type ICampusSelect = {
  campuses: Object[],
  selectedCampus: string,
  onChange: Function,
  // style: Object,
  // classes: Object,
};

const CampusSelect = ({ campuses, selectedCampus, onChange }: ICampusSelect) =>
  <div className={"soft-double-top text-left soft-half-sides one-whole"}>
    <style>
      {
        ".input--active select { color: #303030 }; .input--focused label { color: #858585 }"
      }
    </style>
    <Forms.Select
      classes={["one-whole", "display-inline-block", `${css(Styles.select)}`]}
      style={{ outline: "none" }}
      inputClasses={`text-dark-tertiary outlined--dotted outlined--light flush-bottom`}
      items={campuses}
      defaultValue={selectedCampus}
      onChange={onChange}
      label="Campus"
      name="campus"
      type="campus"
      selected={selectedCampus}
      includeBlank
    />
  </div>;

export default CampusSelect;
