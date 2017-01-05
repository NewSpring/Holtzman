// @flow
import React from "react";
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
  padding: boolean,
  children?: React.Component<any, any, any>,
};

const CardSliderItem = ({
  padding,
  children,
}: ICardSliderItem) => (
  <div
    className={`card floating display-inline-block ${padding ? "push-right" : ""}`}
    style={dynamicWidth()}
  >
    {children}
  </div>
);

const map = (store) => ({
  width: store.responsive.width,
});

export const withRedux = connect(map);

type ICardSlider = {
  cardComponent: React.Component<any, any, any>,
  cardData: Object[],
};

// <CardSlider>
//   {items.map((data) => {
//     <Card item={data} />
//   })}
// </CardSlider>

const CardSlider = ({
  cardComponent,
  cardData,
}: ICardSlider) => {
  let count = 0;
  return (
    <div
      style={{
        overflowX: "scroll",
        overflowY: "hidden",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <section style={dynamicWidthContainer(cardData.length)}>
        {cardData.map((x, key) => {
          count += 1;
          return (
            <CardSliderItem
              key={key}
              padding={cardData.length !== count}
            >
              {{ ...cardComponent, ...{ props: { item: x } } }}

            </CardSliderItem>
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
