// @flow

import ProgressBar from "./../../../components/progressBar";
import withYTDData from "./givingSummaryEnhancer";

type IFundBreakdown = {
  data: Object,
}

export const FundBreakdown = ({ data }: IFundBreakdown) => {
  if (!data) return null;
  return (
    <div>
      <h3 className="text-light-primary soft-half-bottom push-double-bottom" style={{ borderBottom: "1px solid" }}>
        Fund Breakdown
      </h3>
      {Object.keys(data.accounts).map((title, i) =>
        <div className="push-bottom" key={i}>
          <ProgressBar
            title={title}
            total={data.accounts[`${title}`].toString()}
            percentDone={100 * (data.accounts[title] / data.total)}
          />
        </div>
      )}
    </div>
  );
};

export default withYTDData(FundBreakdown);
