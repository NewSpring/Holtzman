// @flow
import { connect } from "react-redux";

const getRatio = (width: number) => {
  if (width < 480) {
    return 0.8;
  }

  if (width < 768) {
    return 0.6;
  }

  if (width < 1025) {
    return 0.4;
  }

  return 0.2;
};

const dynamicWidthContainer = (count: number) => {
  if (typeof window !== "undefined" && window !== null) {
    let itemSize = (window.innerWidth - 40) * getRatio(window.innerWidth); // four-fifths
    itemSize += 20; // account for margin
    const width = (count * itemSize) + 40;
    return {
      width: `${width}px`,
    };
  }

  return {};
};

const dynamicWidth = () => {
  if (typeof window !== "undefined" && window !== null) {
    const itemSize = (window.innerWidth - 40) * getRatio(window.innerWidth); // four-fifths
    return {
      width: itemSize,
      height: itemSize,
    };
  }

  return {};
};

type ICardSliderItem = {
  item: Object,
  padding: boolean,
};

const CardSliderItem = ({
  item,
  padding,
}: ICardSliderItem) => (
  <div
    className={`card floating display-inline-block ${padding ? "push-right" : ""}`}
    style={dynamicWidth()}
  >
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
  </div>
);

const map = (store) => ({
  width: store.responsive.width,
});

export const withRedux = connect(map);

type ICardSlider = {
  items: Object[],
};

const CardSlider = ({ items }: ICardSlider) => {
  let count = 0;
  return (
    <div
      style={{
        overflowX: "scroll",
        overflowY: "hidden",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <section style={dynamicWidthContainer(items.length)}>
        {items.map((x, key) => {
          count += 1;
          return (
            <CardSliderItem item={x} key={key} padding={items.length !== count} />
          );
        })}

      </section>
    </div>
  );
};

export default withRedux(CardSlider);

export {
  getRatio,
  dynamicWidthContainer,
  dynamicWidth,
  CardSliderItem,
  CardSlider as CardSliderWithoutData,
};
