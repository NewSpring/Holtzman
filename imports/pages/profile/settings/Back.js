import { Link } from "react-router";

const Back = () => {
  if (Meteor.isCordova) return null;

  return (
    <Link
      to="/profile/settings"
      className="locked-top locked-left soft-double@lap-and-up soft h7 text-dark-secondary plain"
      style={{ zIndex: 10 }}
    >
      <i
        className="icon-arrow-back soft-half-right display-inline-block"
        style={{ verticalAlign: "middle" }}
      />
      <span
        className="display-inline-block"
        style={{ verticalAlign: "middle", marginTop: "3px" }}
      >
        Back
      </span>
    </Link>
  );
};


export default Back;
