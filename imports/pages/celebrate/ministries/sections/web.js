
import FitText from "../../components/fit-text";
import CardSlider from "../../../../components/@primitives/UI/card-slider";
import { MetricCard } from "../../../../components/@primitives/UI/cards";

const data = {
  statistics: {
    icons: [
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
    cards: [
      {
        label: "Articles Read",
        value: "6,200",
      },
      {
        label: "Devotionals Read",
        value: "11,200",
      },
      {
        label: "Studies Used",
        value: "6,200",
      },
      {
        label: "Stories Viewed",
        value: "11,200",
      },
    ],
  },
};

/* eslint-disable max-len */
const Web = () => (
  <div className="background--light-primary">
    <div className="grid flush">
      <div className="constrain-page">
        <div className="grid__item one-whole text-dark-primary text-center hard">
          <div className="soft-double@lap-and-up soft push-double@lap-and-up soft-double-bottom push-bottom">

            <div className="one-whole text-center push-double-ends soft-top">
              <h1 className="uppercase">Web Stats</h1>
              <h3 className="italic"><strong>We have</strong></h3>
            </div>

            {data.statistics.icons.map((statistic, i) => (
              <div
                key={i}
                className="grid__item push-bottom@lap-and-up one-half@lap one-third@lap-wide-and-up text-dark-primary text-center soft-double@lap-wide-and-up hard-sides@handheld soft-ends@handheld"
              >
                <img src={statistic.image} className="push-double-bottom@lap-and-up push-bottom" style={{ maxHeight: "100px" }} />
                <FitText compressor={0.6}>
                  <h1 style={{ fontWeight: 900 }}>
                    {statistic.value}
                  </h1>
                </FitText>
                <h3>{statistic.label}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <div className="soft-double-ends text-center one-whole background--light-tertiary text-dark-primary">
      <div className="soft-double-ends soft-bottom@handheld">
        <div className="grid__item one-whole one-half@lap-and-up hard@handheld">
          <div className="constrain-copy soft-double-sides@lap-and-up push-sides@lap-and-up soft-sides@handheld">
            <h3 className="italic"><strong>Using the Internet to help people follow Jesus step by step, we saw</strong></h3>
          </div>
        </div>
        <CardSlider>
          {data.statistics.cards.map((statistic, i) => (
            <MetricCard
              key={i}
              count={statistic.value}
              label={statistic.label}
            />
          ))}
        </CardSlider>
      </div>
    </div>
  </div>
);
/* eslint-enable max-len */

export default Web;
