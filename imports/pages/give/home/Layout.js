// @flow

import Activity from "./Activity";
import Schedules from "./Schedules";
import SavedPayments from "./SavedPayments";

const Layout = () => (
  <div className="soft@palm-wide soft-double-bottom@lap-and-up soft-bottom soft-double-sides@lap-and-up">
    <Activity />
    <Schedules />
    <SavedPayments />
  </div>
);

export default Layout;
