/*
<ProgressBar
  title={string}
  total={string}
  percentDone={?number}
  theme={?string = "light" || "dark" } // default dark
  style={?object}
/>
*/

export const themeStyles = (theme, percentDone) => {
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
  };
};

const ProgressBar = (props) => {
  return (
    <div style={{ ...themeStyles(props.theme).wrapper, ...props.style }}>
      <div className="floating floating--left one-half display-inline-block">
        <h5 className="floating__item display-inline-block" data-spec="title">
          {props.title}
        </h5>
      </div>
      <div className="floating floating--middle text-right one-half display-inline-block">
        <h6 className="display-inline-block floating__item">$</h6>
        <h4 className="display-inline-block floating__item" data-spec="total">
          {props.total}
        </h4>
      </div>
      <div className="one-whole" style={themeStyles(props.theme).progressBackground}>
        <div
          style={themeStyles(props.theme, props.percentDone).progress}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
