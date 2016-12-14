
// flow

import moment from "moment";

import YTDGraph from "./YTDMetrics";
import Progress from "./FundBreakdown";

export default () => (
  <div className="scrollable locked-ends locked-sides background--primary soft-double-sides soft-double-top">
    {/* spacer */}
    <div className="push-double-top display-inline-block soft-double-ends soft-double-right one-whole">
      <h3
        className="text-light-primary soft-double-top outlined--bottom push-double-top soft-half-bottom"
        style={{ borderBottom: "1px solid" }}
      >
        {moment().format("YYYY")} So Far
      </h3>
      <YTDGraph
        linkUrl={"/give/history"}
      />
      {/* spacer */}
      <div className="push-ends soft-ends" />
      <Progress />
    </div>
  </div>
);

