// @flow

type ISliderCard = {
  count: number,
  label: string,
};

const SliderCard = ({
  count,
  label,
}: ISliderCard) => (
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

export default SliderCard;
