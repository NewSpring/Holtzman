// @flow

import Currency from "./../currency";

export const themeStyles = (
  theme: string,
  percentDone?: number,
): Object => {
  if (theme === "light") {
    return {
      wrapper: {
        color: "#303030",
      },
      progressBackground: {
        height: "6px",
        backgroundColor: "#dddddd",
      },
      progress: {
        height: "100%",
        width: `${percentDone || 0}%`,
        backgroundColor: "#6bac43",
      },
      currencyText: {
        color: "dark",
      },
    };
  }
  return {
    wrapper: {
      color: "#fff",
    },
    progressBackground: {
      height: "6px",
      backgroundColor: "#2a4930",
    },
    progress: {
      height: "100%",
      width: `${percentDone || 0}%`,
      backgroundColor: "white",
    },
    currencyText: {
      color: "light",
    },
  };
};

type IProgressBar = {
  theme: string,
  title: string,
  total: string,
  percentDone: number,
  style: Object,
};

const ProgressBar = ({
  theme,
  title,
  total,
  percentDone,
  style,
}: IProgressBar) =>
  <div style={{ ...themeStyles(theme).wrapper, ...style }}>
    <div className="floating floating--left one-half display-inline-block">
      <h5 className="floating__item display-inline-block" data-spec="title">
        {title}
      </h5>
    </div>
    <Currency
      amount={total}
      theme={themeStyles(theme).currencyText.color}
      className="floating floating--right one-half display-inline-block text-right"
      baseHeadingSize="4"
      roundCurrency
    />
    <div className="one-whole" style={themeStyles(theme).progressBackground}>
      <div
        style={themeStyles(theme, percentDone).progress}
      />
    </div>
  </div>
  ;

export default ProgressBar;
