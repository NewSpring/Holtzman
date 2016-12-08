// @flow

import SectionHeader from "../../../components/sectionHeader";
import SmallButton from "../../../components/buttons/small";

import Activity from "./Activity";

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
  </div>
);

export default Layout;
