// @flow
import { Link } from "react-router";

import Meta from "../../../components/shared/meta";
import Video from "../../../components/@primitives/players/video";

/* eslint-disable max-len */
export const Shane = () => (
  <div>
    <Meta title="Message From Shane" />
    {/* Header */}
    <style>{".oo-player-container { min-width: 0 !important }"}</style>
    <div className="soft@lap-and-up soft-double-top@lap-and-up">
      <div className="soft soft-double-bottom soft-double-top@lap-and-up">
        <div className="soft-double-bottom">
          <Video id={"VoNTB1ODE66MXxAFqcCqRb04c2WT9biy"} autoplay={false} />
        </div>
        <h1
          className={`soft-double-top@lap-and-up soft-top ${
            process.env.NATIVE ? "" : "push-double-top@handheld"
          }`}
        >
          Welcome to NewSpring&#39;s 2017 Annual Report!
        </h1>
        <p>
          The annual report is an opportunity to reflect on what God has done
          and to see why the local church is the best investment we can make.
        </p>
        <p>
          At NewSpring, we have so much to celebrate from 2016! Thousands of
          lives have been changed as a result of your generosity. Throughout
          this report, you&#39;ll meet people who connected to Jesus and the
          church because of the way you give, serve, and pray.
        </p>
        <p>
          You&#39;ll also see that 2016 was a year of transition for our church.
          Growing things change, and NewSpring is no exception. We saw changes
          in leadership and at our campuses. Lexington merged with Columbia, and
          two campuses (Powdersville and Clemson) moved into new permanent
          buildings. We held our largest Gauntlet ever, and we launched Connect
          - an event designed to help NewSpring attenders connect to Jesus and
          each other.
        </p>
        <p>
          In every season of our church&#39;s history, from 2000 to now,
          we&#39;ve seen Jesus come through on His promise to build His church.
          My hope is that as you read this report, you will see the miracles God
          is doing every week at NewSpring, and you&#39;ll join me in
          anticipating what God has in store from us next.
        </p>
        <p>
          Shane Duffey<br />Executive Pastor
        </p>
      </div>
    </div>
    <div className="background--primary text-center text-light-primary soft">
      <h3 className="push-double-top">Keep Reading</h3>
      <Link
        className="btn--light push-double-bottom"
        to="/annualreport/finances"
      >
        Go to Finance Report
      </Link>
    </div>
  </div>
);

const Routes = [
  {
    path: "home",
    component: Shane,
  },
];

export default {
  Shane,
  Routes,
};
