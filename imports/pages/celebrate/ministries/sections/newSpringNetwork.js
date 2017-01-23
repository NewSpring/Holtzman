
// import FitText from "../../components/fit-text";
import CardSlider from "../../../../components/@primitives/UI/card-slider";
import MetricCard from "../../components/metricCard";

import Story from "../../components/story";

const data = {
  statistics: [
    {
      label: "Leaders Served",
      value: "46,344",
    },
    {
      label: "Downloads of free content",
      value: "56,282",
    },
    {
      label: "Leaders attended a conference",
      value: "2,287",
    },
  ],
  stories: [
    {
      imageUrl: "//s3.amazonaws.com/ns.assets/apollos/annual%20report/2016/stories/story-img7.1.png",
      name: "Liz Wynn",
      location: "Arkansas",
      heading: "Hear from childrens ministry director",
      content: "<p>&#34;We've been using NewSpring's free children's curriculum exclusively since the beginning of 2016, and the kids love it, especially the acting and the games! Our kids leave excited to tell their friends about church and want to come back every week.&#34;</p>",
    },
  ],
};

/* eslint-disable max-len */
const NewSpringNetwork = () => (
  <div className="background--light-secondary soft-double-ends@lap-and-up soft-top text-center">
    <div className="constrain-page soft-double-top soft-sides@lap soft-sides@handheld">
      <div className="grid">
        <div className="grid__item one-whole">
          <div className="constrain-copy">
            <h1 className="uppercase push-bottom">NewSpring Network</h1>
            <p className="text-left">NewSpring Network equips church leaders with resources, coaching opportunities, and leadership training. Through NewSpring Network, our church provides free children&#39;s ministry curriculum, series graphics, and videos, chord charts, and volunteer training.</p>
          </div>
        </div>
      </div>
    </div>

    <CardSlider>
      {data.statistics.map((statistic, i) => (
        <MetricCard
          key={i}
          count={statistic.value}
          label={statistic.label}
        />
      ))}
    </CardSlider>

    <div className="constrain-page three-quarters@lap-wide-and-up nine-tenths@lap push-double-top@lap-and-up soft-double-sides soft-sides@handheld">
      <div className="one-whole">
        {data.stories.map((story, i) => (
          <Story
            key={i}
            image={story.imageUrl}
            name={story.name}
            location={story.location}
            heading={story.heading}
            content={story.content}
          />
        ))}
      </div>
    </div>
  </div>
);
/* eslint-enable max-len */

export default NewSpringNetwork;
