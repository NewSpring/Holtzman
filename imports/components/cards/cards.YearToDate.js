// @flow
import { Link } from "react-router";
import LineGraph from "../graphs/lineGraph";

type IYearToDate = {
  graphData: Object,
  linkUrl: string,
};

const YearToDate = ({
  graphData,
  linkUrl,
}: IYearToDate) => (
  <div className="card">
    <div className="card__item push soft">
      <div className="push soft-double-bottom soft-double-top">
        <LineGraph
          data={graphData.data}
          lineColor={graphData.lineColor}
          lineWidth={graphData.lineWidth}
          dotColor={graphData.dotColor}
          axisStyles={graphData.axisStyles}
        />
      </div>
      <div className="floating text-left text-dark-primary">
        <h4 className="floating__item flush">$</h4>
        <h2 className="floating__item flush">2412</h2>
        <h4 className="floating__item flush">.00</h4>
      </div>
      <p className="text-dark-primary italic text-left">Contributed so far this year</p>
      <div className="text-left">
        <Link to={linkUrl} className="text-left">
          <h6 className="display-inline-block">View Your Giving History</h6><span className="icon-arrow-next soft-half-left" />
        </Link>
      </div>
    </div>
  </div>
);

export default YearToDate;
