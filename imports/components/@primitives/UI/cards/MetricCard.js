// @flow

type IMetricCard = {
  count: string,
  label: string,
};

const MetricCard = ({
  count,
  label,
}: IMetricCard) => (
  <div className="floating__item one-whole soft" >
    <h1
      className="uppercase flush-bottom soft-half-bottom"
      style={{
        fontWeight: "900",
      }}
    >
      {count}
    </h1>
    <h5 className="flush-bottom">
      {label}
    </h5>
  </div>
);

export default MetricCard;
