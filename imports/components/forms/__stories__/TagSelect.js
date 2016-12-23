
// import {
//   select,
// } from "@kadira/storybook-addon-knobs";

import Forms from "./";

import TagSelect from "../TagSelect";

Forms
  .add("TagSelect", () => {
    // set channel name options
    const GIVING_SCHEDULES = [
      { label: "One time", value: "One-Time" },
      { label: "Every Month", value: "Monthly" },
      { label: "Every Week", value: "Weekly" },
      { label: "Every 2 Weeks", value: "Bi-Weekly" },
    ];

    return (
      <div className={"floating"}>
        <div className={"grid__item text-left"} style={{ maxWidth: "480px" }}>
          <TagSelect
            items={GIVING_SCHEDULES}
          />
        </div>
      </div>);
  });
