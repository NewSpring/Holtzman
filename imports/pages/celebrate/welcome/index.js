// @flow
import { Link } from "react-router";
import Meta from "../../../components/shared/meta";
import Video from "../../../components/@primitives/players/video";

export const Welcome = () => (
  <div>
    <Meta title="Welcome" />
    <style>{".oo-player-container { min-width: 0 !important }"}</style>
    <div className="push-big-sides@lap-and-up soft@lap-and-up soft-top@lap-and-up">
      <div className="soft soft-bottom soft-top@lap-and-up">
        <div>
          <Video id={"90ZG00ZTE6k8sukbExReu6mnNTG9t8Be"} autoplay={false} />
        </div>
      </div>
    </div>
    <div className="background--primary text-center text-light-primary soft">
      <h3 className="push-double-top">Keep Reading</h3>
      <Link className="btn--light push-double-bottom" to="/annualreport/finances">
        Go to Finance Report
      </Link>
    </div>
  </div>
);

const Routes = [
  {
    path: "welcome",
    component: Welcome,
  },
];

export default {
  Welcome,
  Routes,
};
