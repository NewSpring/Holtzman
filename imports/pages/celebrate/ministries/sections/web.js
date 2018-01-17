import FitText from "../../components/fit-text";
import CardSlider from "../../../../components/@primitives/UI/card-slider";
import MetricCard from "../../components/metricCard";
import Story from "../../components/story";

const data = {
  statistics: {
    icons: [
      {
        image:
          "//s3.amazonaws.com/ns.assets/apollos/annual%20report/2016/icons/icon-branch.png",
        label: "different websites and apps",
        value: "13",
      },
      {
        image:
          "//s3.amazonaws.com/ns.assets/apollos/annual%20report/2016/icons/icon-mac.png",
        label: "unique devices to view our sites and apps",
        value: "2,035,975",
      },
      // TODO: Removed for 2017
      // {
      //   image:
      //     "//s3.amazonaws.com/ns.assets/apollos/annual%20report/2016/icons/icon-cake.png",
      //   label: "church online salvations",
      //   value: "398",
      // },
      {
        image:
          "//s3.amazonaws.com/ns.assets/apollos/annual%20report/2016/icons/icon-viewers.png",
        label: "average weekly church online viewers",
        value: "4,431",
      },
      {
        image:
          "//s3.amazonaws.com/ns.assets/apollos/annual%20report/2016/icons/icon-phone.png",
        label: "NewSpring app downloads",
        value: "22,155",
      },
      {
        image:
          "//s3.amazonaws.com/ns.assets/apollos/annual%20report/2016/icons/icon-globe.png",
        label: "countries visted our sites",
        value: "230",
      },
    ],
    cards: [
      {
        label: "Articles Read",
        value: "986,347",
      },
      {
        label: "Devotionals Read",
        value: "775,094",
      },
      // TODO: Removed for 2017
      // {
      //   label: "Studies Pageviews",
      //   value: "252,566",
      // },
      {
        label: "Stories Viewed",
        value: "157,989",
      },
      {
        label: "Sermons Watched",
        value: "195,891",
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
          <div className="soft-double-sides@lap-and-up soft-double-top@lap-and-up push-double-top@lap-and-up soft">
            <div className="one-whole text-center push-bottom push-double-top@handheld">
              <h1 className="uppercase">Web Stats</h1>
              <h3 className="italic" style={{ color: "#bc9b67" }}>
                <strong>We Have</strong>
              </h3>
            </div>

            {data.statistics.icons.map((statistic, i) => (
              <div
                key={i}
                className="grid__item push-bottom@lap-and-up one-half@lap one-third@lap-wide-and-up text-dark-primary text-center soft-double@lap-wide-and-up hard-sides@handheld soft-ends@handheld"
              >
                <img
                  src={statistic.image}
                  className="push-double-bottom@lap-and-up push-bottom"
                  style={{ maxHeight: "100px" }}
                  alt="icon"
                />
                <FitText compressor={0.6}>
                  <h1 style={{ fontWeight: 900 }}>{statistic.value}</h1>
                </FitText>
                <h3>{statistic.label}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <div className="text-center one-whole background--light-tertiary text-dark-primary">
      <div
        className="soft-bottom@handheld"
        style={{ backgroundColor: "#bc9b67" }}
      >
        <div className="floating soft-double-top one-whole hard@handheld">
          <div className="floating__item constrain-copy soft-double-sides@lap-and-up push-sides@lap-and-up soft-sides@handheld">
            <h3 className="text-center italic" style={{ color: "#fff" }}>
              <strong>
                Using technology to connect people to Jesus and each other, we
                saw
              </strong>
            </h3>
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
      <div style={{ background: "#bc9b67" }}>
        <Story
          overriddenHeader={
            "Amy Buckmaster of NewSpring Greenville grew a daily Bible reading habit in 2017 because of devotionals sent by text message to her phone."
          }
          image={
            "//s3.amazonaws.com/ns.assets/apollos/annual+report/2017/stories/amy.jpg"
          }
          content={`
            <p style="font-family: colfax-web">“It’s the best way to start each morning! ... It helps me dig deeper into His Word and brings me closer to Jesus.”</p>
          `}
          contentClass={"text-light-primary"}
        />
      </div>
    </div>
  </div>
);
/* eslint-enable max-len */

export default Web;
