// import FitText from "../../components/fit-text";
import CardSlider from "../../../../components/@primitives/UI/card-slider";
import MetricCard from "../../components/metricCard";

import Story from "../../components/story";

const data = {
  statistics: [
    {
      label: "Leaders Served",
      value: "21,695",
    },
    {
      label: "Downloads of free content",
      value: "357,384",
    },
    {
      label: "Churches that visited NewSpring",
      value: "73",
    },
  ],
  stories: [
    {
      imageUrl:
        "//s3.amazonaws.com/ns.assets/apollos/annual+report/2017/life.church.logo.2.jpg",
      name: "Open Network",
      location: "Arkansas",
      heading:
        "In 2017, NewSpring began a new partnership with the Open Network to distribute our resources for free to churches around the world.",
      content: `
      <p style="font-family: colfax-web">The partnership resulted in 252,434 downloads of NewSpring children’s curriculum and the equipping of 5,000 pastors and church leaders.</p>
      <p style="font-family: colfax-web">“We have seen a NewSpring series consistently in our top 10 downloads every week. God is definitely making an impact through NewSpring’s resources in the Open Network community.” -- <em>Kyle Kutter, Life.Church</em></p>
      `,
    },
  ],
};

/* eslint-disable max-len */
const NewSpringNetwork = () => (
  <div className="background--light-secondary soft-double-top@lap-and-up soft-top text-center text-dark-primary">
    <div className="constrain-page soft-double-top soft-sides@lap soft-sides@handheld">
      <div className="grid">
        <div className="grid__item one-whole">
          <div className="constrain-copy">
            <h1 className="uppercase push-bottom">NewSpring Network</h1>
            <p className="text-center" style={{ fontFamily: "colfax-web" }}>
              NewSpring Network equips church leaders with resources, coaching
              opportunities, and leadership training. Through NewSpring Network,
              our church provides free children&#39;s ministry curriculum,
              series graphics, and videos, chord charts, and volunteer training.
            </p>
          </div>
        </div>
      </div>
    </div>

    <CardSlider>
      {data.statistics.map((statistic, i) => (
        <MetricCard key={i} count={statistic.value} label={statistic.label} />
      ))}
    </CardSlider>

    <div className="constrain-page three-quarters@lap-wide-and-up nine-tenths@lap push-top@handheld soft-double-sides soft-sides@handheld">
      <div className="one-whole">
        {data.stories.map((story, i) => (
          <Story
            key={i}
            image={story.imageUrl}
            overriddenHeader={story.heading}
            content={story.content}
          />
        ))}
      </div>
    </div>
  </div>
);
/* eslint-enable max-len */

export default NewSpringNetwork;
