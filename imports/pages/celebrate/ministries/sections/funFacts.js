
import FitText from "../../components/fit-text";

const data = {
  statistics: {
    icons: [
      {
        image: "//s3.amazonaws.com/ns.assets/apollos/annual%20report/2016/icons/icon-fish.png",
        label: "pounds of Goldfish given out by KidSpring",
        value: "25,000+",
      },
      {
        image: "//s3.amazonaws.com/ns.assets/apollos/annual%20report/2016/icons/icon-car.png",
        label: "cars parked by volunteers",
        value: "700,000+",
      },
      {
        image: "//s3.amazonaws.com/ns.assets/apollos/annual%20report/2016/icons/icon-mail.png",
        label: "emails received to hello@newspring.cc",
        value: "4,000+",
      },
      {
        image: "//s3.amazonaws.com/ns.assets/apollos/annual%20report/2016/icons/icon-mug.png",
        label: "pounds of coffee brewed by volunteers",
        value: "4,900+",
      },
      {
        image: "//s3.amazonaws.com/ns.assets/apollos/annual%20report/2016/icons/icon-pencil.png",
        label: "pens given away",
        value: "220,000+",
      },
      {
        image: "//s3.amazonaws.com/ns.assets/apollos/annual%20report/2016/icons/icon-baby.png",
        label: "diapers changed by KidSpring volunteers",
        value: "57,000+",
      },
    ],
  },
};

/* eslint-disable max-len */
const FunFacts = () => (
  <div className="background--light-secondary">
    <div className="grid flush">
      <div className="constrain-page">
        <div className="grid__item one-whole text-dark-primary text-center hard">
          <div className="soft-double@lap-and-up soft push-double@lap-and-up soft-double-bottom push-bottom">

            <div className="one-whole text-center push-bottom push-double-top@handheld soft-top">
              <h1 className="uppercase">Fun Facts</h1>
            </div>

            {data.statistics.icons.map((statistic, i) => (
              <div
                key={i}
                className="grid__item push-bottom@lap-and-up one-half@lap one-third@lap-wide-and-up text-dark-primary text-center soft-double@lap-wide-and-up hard-sides@handheld soft-ends@handheld"
              >
                <img src={statistic.image} className="push-double-bottom@lap-and-up push-bottom" style={{ maxHeight: "100px" }} alt="icons" />
                <FitText compressor={0.6}>
                  <h1 style={{ fontWeight: 900 }}>
                    {statistic.value}
                  </h1>
                </FitText>
                <h4>{statistic.label}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);
/* eslint-enable max-len */

export default FunFacts;
