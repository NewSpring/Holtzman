
// import FitText from "../../components/fit-text";
import CardSlider from "../../../../components/@primitives/UI/card-slider";
import { MetricCard } from "../../../../components/@primitives/UI/cards";

import Story from "../../components/story";

const data = {
  statistics: [
    {
      label: "Leaders Served",
      value: "6,200",
    },
    {
      label: "Downloads of free content",
      value: "11,200",
    },
    {
      label: "Leaders attended a conference",
      value: "9,104",
    },
  ],
  stories: [
    {
      imageUrl: "//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/all/member_images/dlt/leaders.clayton_1000_1000_90_c1.jpg",
      name: "Liz Wynn",
      location: "Arkansas",
      heading: "Hear from childrens ministry director",
      content: "<p>&#34;We've been using NewSpring's free children's curriculum exclusively since the beginning of 2016, and the kids love it, especially the acting and the games! Our kids leave excited to tell their friends about church and want to come back every week.&#34;</p>",
    },
  ],
};

/* eslint-disable max-len */
const NewSpringNetwork = () => (
  <div className="background--light-secondary soft-double-ends text-center">
    <div className="constrain-page soft-double-top push-double-top@lap-and-up push-top@handheld soft-sides@handheld">
      <div className="grid">
        <div className="grid__item one-whole push-bottom">
          <div className="constrain-copy">
            <h1 className="uppercase push-bottom">NewSpring Network</h1>
            <p className="text-left">NewSpring Network equips church leaders with resources, coahcing opportunities and leadership training. Through NewSpring Network, our church provides free children&#39;s ministry curriculum, series graphics, and videos, chord charts, and volunteer training.</p>
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

    <div className="constrain-page soft-double@lap-and-up push-double-ends@lap-and-up push-double-top soft-sides@handheld">
      <div className="grid">
        <div className="grid__item three-quarters@lap-wide-and-up">
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
  </div>
);
/* eslint-enable max-len */

export default NewSpringNetwork;
