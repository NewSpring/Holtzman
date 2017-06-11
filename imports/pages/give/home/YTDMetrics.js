// @flow
import { Link } from "react-router";
import { asyncComponent } from "react-async-component";
import YTDTotal from "../../../components/@primitives/typography/currency";

const LineGraph = asyncComponent({
  resolve: () => import("../../../components/@primitives/UI/graphs/LineGraph")
    .then((x) => x.default),
});

const styles = {
  lineColor: "#ffffff",
  lineWidth: "3",
  dotColor: "#ffffff",
  dotSize: "5",
  axisStyles: {
    axis: {
      lineColor: "transparent",
      lineWidth: "0",
    },
    tickLabels: {
      fontSize: "10",
      padding: "5",
      fill: "#ffffff",
    },
  },
};

type IYTDMetrics = {
  data?: Object,
  linkUrl: string,
};

export const YTDMetrics = ({ data, linkUrl }: IYTDMetrics) => {
  if (!data || data.loading) return null;

  return (
    <div>
      <div className="soft-double-bottom soft-double-top">
        <LineGraph
          data={data.chartData}
          lineColor={styles.lineColor}
          lineWidth={styles.lineWidth}
          dotColor={styles.dotColor}
          dotSize={styles.dotSize}
          axisStyles={styles.axisStyles}
        />
      </div>
      <YTDTotal amount={data.total.toFixed(2)} className="text-left text-light-primary" baseHeadingSize="1" />
      <div className="text-left">
        <Link to={linkUrl} className="text-left">
          <h6 className="soft-top display-inline-block text-light-primary">
            View Your Giving History
          </h6>
          <span className="icon-arrow-next soft-half-left text-light-primary" />
        </Link>
      </div>
    </div>
  );
};

export default YTDMetrics;
