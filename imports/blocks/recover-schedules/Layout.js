// @flow
import React from "react";

import Later from "./Later";
import Recover from "./Recover";
import Remind from "./Remind";

type ILayout = {
  reminderDate: string,
  closeFunction: Function,
  onSubmit: Function,
  back: Function,
  schedules: Object[],
  hide: Function,
  recoverOnClick: Function,
  state: string,
};

const Layout = ({
  reminderDate,
  closeFunction,
  onSubmit,
  back,
  schedules,
  hide,
  recoverOnClick,
  state,
}: ILayout) => {
  if (state === "later") {
    return <Later date={reminderDate} onClick={closeFunction} />;
  }

  if (state === "remind") {
    return (
      <Remind
        onSubmit={onSubmit}
        back={back}
      />
    );
  }

  return (
    <Recover
      schedules={schedules}
      hide={hide}
      onClick={recoverOnClick}
    />
  );
};

export default Layout;
