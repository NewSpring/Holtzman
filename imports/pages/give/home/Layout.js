// @flow

import SectionHeader from "../../../components/sectionHeader";
import SmallButton from "../../../components/buttons/small";

const Layout = () => (
  <div>
    <SectionHeader
      title="Activity"
      link={
        <SmallButton
          text="See All"
          linkUrl="/give/history"
          className="btn--dark-tertiary"
        />
      }
    />
  </div>
);

export default Layout;