
import FitText from "../../components/fit-text";
import CardSlider from "../../../../components/@primitives/UI/card-slider";
import { MetricCard } from "../../../../components/@primitives/UI/cards";

import Story from "../../components/story";

const data = {
  statistics: [
    {
      image: "//s3.amazonaws.com/ns.assets/apollos/annual%20report/2016/icons/icon-branch.png",
      label: "different websites and apps",
      value: "12",
    },
    {
      image: "//s3.amazonaws.com/ns.assets/apollos/annual%20report/2016/icons/icon-mac.png",
      label: "unique devices to view our sites and apps",
      value: "2,000,000",
    },
    {
      image: "//s3.amazonaws.com/ns.assets/apollos/annual%20report/2016/icons/icon-cake.png",
      label: "church online services",
      value: "394",
    },
    {
      image: "//s3.amazonaws.com/ns.assets/apollos/annual%20report/2016/icons/icon-viewers.png",
      label: "average weekly church online viewers",
      value: "1,200",
    },
    {
      image: "//s3.amazonaws.com/ns.assets/apollos/annual%20report/2016/icons/icon-phone.png",
      label: "NewSpring app downloads",
      value: "8,104",
    },
    {
      image: "//s3.amazonaws.com/ns.assets/apollos/annual%20report/2016/icons/icon-globe.png",
      label: "countries that visted our site",
      value: "37",
    },

  ],
  stories: [
    {
      imageUrl: "//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/all/member_images/dlt/leaders.clayton_1000_1000_90_c1.jpg",
      name: "Liz Wynn",
      location: "Arkansas",
      heading: "Hear from childrens ministry director",
      content: "<p>We've been using NewSpring's free children's curriculum exclusively since the beginning of 2016, and the kids love it, especially the acting and the games! Our kids leave excited to tell their friends about church and want to come back every week.</p>",
    },
  ],
};

/* eslint-disable max-len */
const Web = () => (
  <div className="text-center one-whole text-dark-primary">
    <div className="soft-double-top@lap-and-up">

      <div className="one-whole text-center push-bottom">
        <h1 className="uppercase">Web Stats</h1>
        <h3 className="italic"><strong>We have</strong></h3>
      </div>

      {data.statistics.map((statistic, i) => (
        <div className="grid__item push-bottom one-third@lap-and-up text-dark-primary text-center">
          <img src={statistic.image} alt="" style={{ maxWidth: "30%", maxHeight: "100px" }} />
          <MetricCard
            key={i}
            count={statistic.value}
            label={statistic.label}
          />
        </div>
      ))}
    </div>
  </div>
);
/* eslint-enable max-len */

export default Web;
