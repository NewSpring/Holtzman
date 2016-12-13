// @flow

import ProgressBar from "./../../../components/progressBar";
import withYTDData from "./givingSummaryEnhancer";

export function percentCalc(data:Object, currentAmount:number) {
  // get the length of the amounts
  const givingObject = Object.keys(data.givingSummary.accounts);
  // const numberOfAccounts = givingObject.length;

  let totalAmount = 0;

  // for loop to get the totals
  givingObject.forEach((title:string) => {
    totalAmount = data.givingSummary.accounts[`${title}`] + totalAmount;
  });

  // current fund total divided by the totalAmount
  const percentage = (currentAmount / totalAmount) * 100;

  // convert to string
  return percentage;
}

type IFundBreakdown = {
  data: Object,
}

const FundBreakdown = ({ data }: IFundBreakdown) => (
  <div>
    <h3 className="text-light-primary soft-half-bottom push-double-bottom" style={{ borderBottom: "1px solid" }}>Fund Breakdown</h3>
    {Object.keys(data.givingSummary.accounts).map((title, i) =>
      <div className="push-bottom">
        <ProgressBar
          title={title}
          total={data.givingSummary.accounts[`${title}`].toString()}
          percentDone={percentCalc(data, data.givingSummary.accounts[`${title}`])}
          key={i}
        />
      </div>
    )}
  </div>
);

export default withYTDData(FundBreakdown);
