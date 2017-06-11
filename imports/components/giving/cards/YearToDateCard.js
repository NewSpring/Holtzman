// @flow
import { Link } from "react-router";
import LineGraph from "../../@primitives/UI/graphs/LineGraph";

import Currency from "../../@primitives/typography/currency";

type IYearToDateCard = {
  amount: string,
  graphData: Object,
  linkUrl: string,
};

const YearToDateCard = ({
  amount,
  graphData,
  linkUrl,
}: IYearToDateCard) => (
  <div className="card">
    <div className="card__item soft">
      <div className="soft-double-bottom soft-double-top">
        <LineGraph
          data={graphData.data}
          lineColor={graphData.lineColor}
          lineWidth={graphData.lineWidth}
          dotColor={graphData.dotColor}
          dotSize={graphData.dotSize}
          axisStyles={graphData.axisStyles}
        />
      </div>
      <Currency
        amount={amount}
        baseHeadingSize=""
      />
      <p className="text-dark-primary italic text-left">Contributed so far this year</p>
      <div className="text-left">
        <Link to={linkUrl} className="text-left plain">
          <h6 className="display-inline-block">View Your Giving History</h6><span className="icon-arrow-next soft-half-left" />
        </Link>
      </div>
    </div>
  </div>
);

export default YearToDateCard;
