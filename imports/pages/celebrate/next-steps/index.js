// @flow
import CardSlider from "../../../components/@primitives/UI/card-slider";
import FitText from "../components/fit-text";
import Meta from "../../../components/shared/meta";
import MetricCard from "../../../components/@primitives/UI/cards/MetricCard";
import SmallButton from "../../../components/@primitives/UI/buttons/SmallButton";

const volunteerData = [
  { label: "Aiken", count: 5000 },
  { label: "Anderson", count: 5000 },
  { label: "Boiling Springs", count: 5000 },
  { label: "Charleston", count: 5000 },
  { label: "Clemson", count: 5000 },
  { label: "Columbia", count: 5000 },
  { label: "Florence", count: 5000 },
  { label: "Greenville", count: 5000 },
  { label: "Greenwood", count: 5000 },
  { label: "Hilton Head", count: 5000 },
  { label: "Myrtle Beach", count: 5000 },
  { label: "Northeast Columbia", count: 5000 },
  { label: "Powdersville", count: 5000 },
  { label: "Rock Hill", count: 5000 },
  { label: "Spartanburg", count: 5000 },
  { label: "Sumter", count: 5000 },
];

/* eslint-disable max-len */
const NextSteps = () => (
  <div>
    <Meta title="Next Steps" />
    {/* Header */}
    <div className="background--light-secondary soft-double">
      <h3 className="text-center">What Is A Next Step</h3>
      <p className="constrain-copy">Salvation is a starting point, not a destination. NewSpring exists to connect people to Jesus and each other. We will always be a church that celebrates next steps as well as salvations. Here&#39;s a look at how we&#39;ve seen people take their next steps in 2016.</p>
    </div>
    {/* Salvations */}
    <div className="floating">
      <div className="soft-double text-center two-thirds@lap-and-up floating__item">
        <h3>Salvations</h3>
        <FitText compressor={0.4} maxFontSize={72}>
          <h1
            className="uppercase flush-bottom soft-half-bottom"
            style={{
              fontWeight: "900",
            }}
          >
            11,130
          </h1>
        </FitText>
        <hr />
        <h1>STORY GOES HERE</h1>
      </div>
    </div>
    {/* Percent Stats */}
    <div className="floating background--dark-primary">
      <div className="soft-double push-double text-center text-light-primary two-thirds@lap-and-up floating__item">
        <FitText compressor={0.4} maxFontSize={72}>
          <h1
            className="uppercase flush-bottom soft-half-bottom"
            style={{
              fontWeight: "900",
            }}
          >
            72%
          </h1>
        </FitText>
        <div className="one-whole floating">
          <h3 className="two-thirds@lap-and-up floating__item">of people who received salvation took a next step.</h3>
        </div>
        <em>like these</em>
        <div className="push-double-top">
          <SmallButton text="Baptism" className="btn--light push-half-right" />
          <SmallButton text="Attending Connect" className="btn--light push-half-right" />
          <SmallButton text="Joining a Group" className="btn--light push-half-right" />
          <SmallButton text="Giving" className="btn--light push-half-right" />
        </div>
      </div>
    </div>
    {/* Baptism */}
    <div className="soft-double-top text-center one-whole">
      <h3 style={{ color: "#0073AF" }}>We Witnessed</h3>
      <div className="soft-double push-double-top text-light-primary" style={{ backgroundColor: "#0073AF" }}>
        <FitText compressor={0.4} maxFontSize={72}>
          <h1
            className="uppercase flush-bottom soft-half-bottom push-double-top"
            style={{
              fontWeight: "900",
            }}
          >
            5,253
          </h1>
        </FitText>
        <h3 className="text-light-primary push-top">go public for Jesus through</h3>
        <h1 className="text-light-primary push-double-top">Baptism</h1>
      </div>
    </div>
    {/* First Time Visitors */}
    <div className="grid one-whole soft-double">
      <div className="grid__item floating one-half text-center">
        <div className="floating__item two-thirds@lap-and-up">
          <h3
            className="italic"
            style={{
              fontFamily: "ff-meta-serif-web-pro, serif",
            }}
          >
            We had
          </h3>
          <FitText compressor={0.4} maxFontSize={72}>
            <h1
              className="uppercase flush-bottom soft-half-bottom"
              style={{
                fontWeight: "900",
              }}
            >
              13,000
            </h1>
          </FitText>
          <h3 className="push-top">first time visitors come to NewSpring</h3>
        </div>
      </div>
      <div className="grid__item one-half">GRAPH</div>
      <div className="floating">
        <div className="floating__item two-thirds@lap-and-up">
          <hr />
          <div className="text-center">
            <h1>STORY GOES HERE</h1>
          </div>
        </div>
      </div>
    </div>
    {/* Volunteers */}
    <div className="background--light-secondary soft-double text-center">
      <h3
        className="italic"
        style={{
          fontFamily: "ff-meta-serif-web-pro, serif",
        }}
      >
        This year
      </h3>
      <FitText compressor={0.4} maxFontSize={72}>
        <h1
          className="uppercase flush-bottom soft-half-bottom"
          style={{
            fontWeight: "900",
          }}
        >
          17,422
        </h1>
      </FitText>
      <div className="floating">
        <h3 className="push-top floating__item two-thirds@lap-and-up">people served at NewSpring Church</h3>
      </div>
      <div className="text-dark-tertiary push-double-top">
        <h1 style={{ fontWeight: "900" }}>7,583</h1>
        <h3>for the first time!</h3>
      </div>
      <CardSlider>
        {volunteerData.map(({ count, label }, key) => (
          <MetricCard count={count} label={label} key={key} />
        ))}
      </CardSlider>
    </div>
    {/* Care Room */}
    <div className="background--dark-primary">
      <div className="soft-double push-double text-center text-light-primary">
        <FitText compressor={0.4} maxFontSize={72}>
          <h1
            className="uppercase flush-bottom soft-half-bottom"
            style={{
              fontWeight: "900",
            }}
          >
            7,200
          </h1>
        </FitText>
        <div className="one-whole floating">
          <h3 className="two-thirds@lap-and-up floating__item">people visited the Care room.</h3>
        </div>
        <em>Do you need help?</em>
        <div className="push-double-top">
          <SmallButton text="Speak to Someone Now" className="btn--light push-half-right" />
        </div>
      </div>
    </div>
    {/* Connect/Groups */}
    {/* Local Missions */}
    {/* Foreign Missions */}
    {/* Keep Reading */}
  </div>
);

const Routes = [
  {
    path: "next-steps",
    component: NextSteps,
  },
];

export default {
  NextSteps,
  Routes,
};
