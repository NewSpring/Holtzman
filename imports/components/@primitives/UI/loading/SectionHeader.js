
import SmallButton from "../buttons/SmallButton";

const halvesClasses = "one-half floating display-inline-block";

export default () =>
  (<div className="one-whole">
    <div className={`${halvesClasses} floating--left soft soft-half-left`}>
      <div
        className="floating__item background--light-tertiary push-half-bottom soft-half-top"
        style={{ width: "100px" }}
      />
    </div>
    <div className={`${halvesClasses} floating--right soft soft-half-right`}>
      <SmallButton disabled text="See All" style={{ color: "transparent", borderColor: "#ddd" }} />
    </div>
  </div>)
  ;

