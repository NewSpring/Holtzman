
// @flow

import moment from "moment";

import Forms from "../../../components/forms";
import Loading from "../../../components/loading/Spinner";

import withData from "./givingSummaryEnhancer";


import YTDGraph from "./YTDMetrics";
import Progress from "./FundBreakdown";

export const start = moment().year();

export const YEARS = [{ value: start, label: start }];

for (const i of Array(9).keys()) {
  YEARS.push({ value: start - (i + 1), label: start - (i + 1) });
}

type IRightPanel = {
  loading: boolean,
  data: Object,
  changeYear: Function,
};

export const RightPanel = ({ loading, data, changeYear }: IRightPanel) => (
  <div className="scrollable locked-ends locked-sides background--primary soft-double-sides soft-double-top">
    {/* spacer */}
    <div className="push-double-top display-inline-block soft-double-ends soft-double-right one-whole">
      <h3
        className="text-light-primary outlined--bottom soft-half-bottom"
        style={{ borderBottom: "1px solid", paddingTop: "15px" }}
      >
        Year In Review
      </h3>
      <div className="display-inline-block">
        <p className="text-light-primary display-inline-block soft-half-right">
          <small><em>
              See your summary from
          </em></small>
        </p>
        <style>{".right-select select { color: #ffffff } .right-select:after {border-color: #ffffff transparent transparent}"}</style>
        <Forms.Select
          items={YEARS}
          hideLabel
          classes={["right-select", "hard", "flush", "display-inline-block"]}
          inputClasses="outlined--dotted outlined--light text-light-primary h6 hard-top flush-bottom"
          onChange={changeYear}
        />
      </div>
      {loading && (
        <div className="soft-double one-whole text-center">
          <Loading
            styles={{
              borderColor: "#fff #6BAC43 #fff #fff",
              borderWidth: "7px",
            }}
          />
        </div>
      )}
      {!loading && (
        <div>
          <YTDGraph
            data={data}
            linkUrl={"/give/history"}
          />
          {/* spacer */}
          <div className="push-ends soft-ends" />
          <Progress data={data} />
        </div>
      )}
    </div>
  </div>
);

export default withData(RightPanel);
