// @flow

/*
* This component is for the fund breakdown in giving dashboards.
* it is the default progress bar with a heading and amount above it
*/

import Currency from "../../@primitives/typography/currency";
import { Progress as ProgressBar } from "../../@primitives/UI/progress";

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

type IProgress = {
  theme: string,
  title: string,
  total: string,
  percentDone: number,
  style: Object,
};

const Progress = ({
  theme,
  title,
  total,
  percentDone,
  style,
}: IProgress) =>
  (<div style={{ ...themeStyles(theme).wrapper, ...style }}>
    <div className="floating floating--left one-half display-inline-block push-half-top" style={{ verticalAlign: "middle" }}>
      <h5 className="floating__item" data-spec="title">
        {title}
      </h5>
    </div>
    <div className="floating floating--right one-half display-inline-block" style={{ verticalAlign: "middle" }}>
      <Currency
        amount={total}
        theme={themeStyles(theme).currencyText.color}
        className="floating__item text-right"
        baseHeadingSize="4"
        roundCurrency
      />
    </div>
    <ProgressBar percentDone={percentDone} />
  </div>)
  ;

export default Progress;
