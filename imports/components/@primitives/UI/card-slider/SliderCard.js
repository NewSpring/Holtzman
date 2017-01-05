// @flow

type ISliderCard = {
  item: Object,
};

const SliderCard = ({
  item,
}: ISliderCard) => (
  <div className="floating__item one-whole soft" >
    <h1
      className="uppercase flush-bottom soft-half-bottom"
      style={{
        fontWeight: "900",
      }}
    >
      {item.count}
    </h1>
    <h5 className="flush-bottom">
      {item.label}
    </h5>
  </div>
);

export default SliderCard;
