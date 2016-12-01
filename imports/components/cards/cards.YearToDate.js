// @flow
import { Link } from "react-router";
import LineGraph from "../graphs/lineGraph";

// eslint-disable-next-line max-len
const currencySymbolRegex = /[\$\xA2-\xA5\u058F\u060B\u09F2\u09F3\u09FB\u0AF1\u0BF9\u0E3F\u17DB\u20A0-\u20BD\uA838\uFDFC\uFE69\uFF04\uFFE0\uFFE1\uFFE5\uFFE6]/;

const getCurrencySymbol = (amount:string) => amount.match(currencySymbolRegex) || "$";
const getNegative = (amount:string) => amount.match(/-/);
const getDollars = (amount:string) => amount.replace(currencySymbolRegex, "").replace("-", "").split(".")[0] || "0";
const getCents = (amount:string) => amount.split(".")[1] || "00";

type IYearToDate = {
  amount: string,
  graphData: Object,
  linkUrl: string,
};

const YearToDate = ({
  amount,
  graphData,
  linkUrl,
}: IYearToDate) => (
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
      <div className="floating text-left text-dark-primary">
        <h4 className="floating__item flush" style={{ paddingRight: "5px" }}>{getCurrencySymbol(amount)}</h4>
        {getNegative(amount) && <h4 className="floating__item flush" style={{ paddingRight: "3px" }}>{getNegative(amount)}</h4>}
        <h2 className="floating__item flush">{getDollars(amount)}</h2>
        <h4 className="floating__item flush">.{getCents(amount)}</h4>
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
