// @flow
import FitText from "./fit-text";

type IMetricCard = {
  count: string,
  label: string,
};

const MetricCard = ({
  count,
  label,
}: IMetricCard) => (
  <div className="floating__item one-whole soft" >
    <FitText compressor={0.5}>
      <h1
        className="uppercase flush-bottom soft-half-bottom"
        style={{
          fontWeight: "900",
        }}
      >
        {count}
      </h1>
    </FitText>
    <h4 className="flush-bottom">
      {label}
    </h4>
  </div>
);

export default MetricCard;
