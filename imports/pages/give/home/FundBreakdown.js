// @flow

import ProgressBar from "../../../components/giving/giving-progress";

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
      {Object.keys(data.accounts).filter(x => data.accounts[x] > 0).map((title, i) =>
        (<div className="push-bottom" key={i}>
          <ProgressBar
            theme={""}
            title={title}
            total={data.accounts[title]}
            percentDone={100 * (data.accounts[title] / data.total)}
            style={{}}
          />
        </div>),
      )}
    </div>
  );
};

export default FundBreakdown;
