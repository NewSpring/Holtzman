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

const map = store => ({
  width: store.responsive.width,
});

export const withRedux = connect(map);

type ICardSlider = {
  children: React.Component<any, any, any>[],
};

const CardSlider = ({
  children,
}: ICardSlider) => {
  const childCount = React.Children.count(children);
  let count = 0;
  return (
    <div
      style={{
        overflowX: "auto",
        overflowY: "hidden",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <section style={dynamicWidthContainer(childCount)}>
        {children.map((component, key) => {
          count += 1;
          return (
            <div
              className={`card floating display-inline-block ${childCount !== count ? "push-right" : ""}`}
              style={dynamicWidth()}
              key={key}
            >
              {component}
            </div>
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
  CardSlider as CardSliderWithoutData,
};
