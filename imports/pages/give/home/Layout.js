// @flow

import SectionHeader from "../../../components/sectionHeader";
import SmallButton from "../../../components/buttons/small";

import Activity from "./Activity";
import Schedules from "./Schedules";

const Layout = () => (
  <div>
    <SectionHeader
      title="Activity"
      link={
        <SmallButton
          text="See All"
          linkUrl="/give/history"
          className="btn--dark-tertiary flush"
        />
      }
    />
    <Activity />

    <Schedules />

  </div>
);

export default Layout;
