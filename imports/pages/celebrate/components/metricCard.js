// @flow
import FitText from "./fit-text";

const getClasses = (additionalClasses?: string) => {
  const classes = ["floating__item", "one-whole"];

  if (additionalClasses) {
    classes.push(additionalClasses);
  }

  return classes.join(" ");
};

type IMetricCard = {
  count: string,
  label: string,
  additionalClasses?: string,
};

const MetricCard = ({ count, label, additionalClasses }: IMetricCard) => (
  <div className={getClasses(additionalClasses)}>
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
    <h4 className="flush-bottom">{label}</h4>
  </div>
);

export default MetricCard;
