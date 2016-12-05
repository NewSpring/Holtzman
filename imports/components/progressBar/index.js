/*
<ProgressBar
  title={string}
  total={string}
  percentDone={?number}
  theme={?string = "light" || "dark" } // default dark
  style={?object}
/>
*/

const inlineBlock = { display: "inline-block" };

const themeStyles = (theme, percentDone) => {
  if (theme === "light") {
    return {
      wrapper: {
        color: "#6bac43",
      },
      progressBackground: {
        width: "100%",
        height: "3px",
        backgroundColor: "#f7f7f7",
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
      width: "100%",
      height: "3px",
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
    <div className="soft-half" style={themeStyles(props.theme).wrapper}>
      <div className="floating floating--left one-half" style={inlineBlock}>
        <h6 className="floating--item" style={inlineBlock}>{props.title}</h6>
      </div>
      <div className="floating floating--right one-half" style={inlineBlock}>
        <h5 style={inlineBlock}>${props.total}</h5>
      </div>
      <div style={themeStyles(props.theme).progressBackground}>
        <div style={themeStyles(props.theme, props.percentDone).progress} />
      </div>
    </div>
  );
};

export default ProgressBar;
