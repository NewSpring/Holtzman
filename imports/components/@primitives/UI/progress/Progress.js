// @flow

export const themeStyles = (
  theme: string,
  percentDone?: number,
  height?: string,
): Object => {
  if (theme === "light") {
    return {
      progressBackground: {
        height: height || "6px",
        backgroundColor: "#dddddd",
      },
      progress: {
        height: "100%",
        width: `${percentDone || 0}%`,
        backgroundColor: "#6bac43",
      },
    };
  }
  return {
    progressBackground: {
      height: height || "6px",
      backgroundColor: "#2a4930",
    },
    progress: {
      height: "100%",
      width: `${percentDone || 0}%`,
      backgroundColor: "white",
    },
  };
};

type IProgress = {
  theme: string,
  percentDone: number,
  height: string,
};

const Progress = ({
  theme,
  percentDone,
  height,
}: IProgress) =>
  (<div className="one-whole" style={themeStyles(theme, percentDone, height).progressBackground}>
    <div
      style={themeStyles(theme, percentDone).progress}
    />
  </div>)
  ;

export default Progress;
