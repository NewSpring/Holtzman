// @flow
import { VictoryPie } from "victory";
import { css, StyleSheet } from "aphrodite";

import CardSlider from "../../../components/@primitives/UI/card-slider";
import Currency from "../../../components/@primitives/typography/currency";
import FitText from "../components/fit-text";
import Meta from "../../../components/shared/meta";
import MetricCard from "../../../components/@primitives/UI/cards/MetricCard";
import SmallButton from "../../../components/@primitives/UI/buttons/SmallButton";
import Story from "../components/story";

const styles = StyleSheet.create({
  darkTertiaryColor: {
    color: "#858585",
    borderColor: "#858585",
  },
  darkTertiaryHover: {
    ":hover": {
      backgroundColor: "#858585",
    },
  },
  waves: {
    width: "100%",
    height: "7vh",
    transform: "rotate(180deg)",
    minHeight: "7em",
    overflow: "hidden",
  },
  wave: {
    width: "calc( 100% + 4em )",
    height: "100%",
    position: "absolute",
    left: "-2em",
    background: "bottom center repeat-x",
    animationIterationCount: "infinite",
    animationTimingFunction: "linear",
  },
  wave_1: {
    animationName: {
      from: {
        transform: "rotate(0deg)   translatey(-0.61em) rotate(0deg)",
      },
      to: {
        transform: "rotate(360deg) translatey(-0.61em) rotate(-360deg)",
      },
    },
    animationDuration: "3400ms",
    animationDelay: "-1200ms",
    top: "-1.0em",
    zIndex: "1",
    opacity: "0.75",
    // eslint-disable-next-line quotes
    backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='246' height='2000' viewBox='0 0 246 2000'><path fill-rule='evenodd' clip-rule='evenodd' fill='#0273AF' d='M0 2000c50.43 0 72.57-20.522 123-20.522 50.43 0 71.34 20.522 123 20.522V0H0v2000z'/></svg>")`,
    backgroundPosition: "bottom left",
  },
  wave_2: {
    animationName: {
      from: {
        transform: "rotate(0deg)   translatey(-0.77em) rotate(0deg)",
      },
      to: {
        transform: "rotate(360deg) translatey(-0.77em) rotate(-360deg)",
      },
    },
    animationDuration: "3200ms",
    animationDelay: "-600ms",
    top: "-2.0em",
    opacity: "0.5",
    zIndex: "2",
    // eslint-disable-next-line quotes
    backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='307' height='2000' viewBox='0 0 307 2000'><path fill-rule='evenodd' clip-rule='evenodd' fill='#0273AF' d='M0 0h307v2000c-64.47 0-90.563-25.623-153.5-25.623C90.565 1974.377 62.935 2000 0 2000V0z'/></svg>")`,
    backgroundPosition: "bottom right",
  },
  wave_3: {
    animationName: {
      from: {
        transform: "rotate(0deg)   translatey(-0.96em) rotate(0deg)",
      },
      to: {
        transform: "rotate(360deg) translatey(-0.96em) rotate(-360deg)",
      },
    },
    animationDuration: "2800ms",
    animationDelay: "-2400ms",
    top: "-3.0em",
    zIndex: "3",
    // eslint-disable-next-line quotes
    backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='384' height='2000' viewBox='0 0 384 2000'><path fill-rule='evenodd' clip-rule='evenodd' fill='#0273AF' d='M0 0h384v2000c-80.64 0-113.28-32.047-192-32.047S78.72 2000 0 2000V0z'/></svg>")`,
    backgroundPosition: "bottom center",
  },
});

const firstTimeVisitorData = [
  { ministry: "VIP Room", count: 8000, color: "#6BAC43" },
  { ministry: "KidSpring", count: 3600, color: "#1C683E" },
  { ministry: "Fuse", count: 1400, color: "#2A4930" },
];

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
const localMissionAmount = "567,422.90";

/* eslint-disable max-len */
const NextSteps = () => (
  <div>
    <Meta title="Next Steps" />
    {/* Header */}
    <div className="background--light-secondary soft-double@lap-and-up soft@handheld">
      <div className="push-double-ends">
        <h3 className="text-center">What Is A Next Step</h3>
        <p className="constrain-copy">Salvation is a starting point, not a destination. NewSpring exists to connect people to Jesus and each other. We will always be a church that celebrates next steps as well as salvations. Here&#39;s a look at how we&#39;ve seen people take their next steps in 2016.</p>
      </div>
    </div>
    {/* Salvations */}
    <div className="background--light-primary floating">
      <div className="soft-double soft-sides@handheld push-double-top text-center three-quarters@lap-wide-and-up nine-tenths@lap floating__item">
        <h3>Salvations</h3>
        <FitText compressor={0.4} maxFontSize={80}>
          <h1
            className="uppercase soft-double-bottom@lap-and-up"
            style={{
              fontWeight: "900",
            }}
          >
            11,130
          </h1>
        </FitText>
        <hr className="visuallyhidden@handheld push-double-ends" style={{ borderTop: "1px solid #dddddd" }} />
        <Story
          image={"//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/stories/story-img2.png"}
          content={"<p>The community Brett Chamberlain found through a fishing interest group at NewSpring Rock Hill helped him recognize that he needed to ask Jesus into his life and take the step of baptism with his teenage son in June 2016.</p>"}
          linkUrl={"https://newspring.cc"}
          linkClass={"h6 btn--small@next btn--dark-secondary"}
          linkText={"Read the Full Story"}
          name={"Brett"}
          location={"Rock Hill"}
          heading={"Every number has a name, like"}
        />
      </div>
    </div>
    {/* Percent Stats */}
    <div className="floating background--dark-primary">
      <div className="soft-double-ends push-double-ends text-center text-light-primary soft-sides@palm soft-double-sides@handheld two-thirds@lap-wide-and-up floating__item">
        <div className="floating push-double-top soft-half-bottom">
          <div className="floating__item">
            <FitText compressor={1} maxFontSize={120} minFontSize={80}>
              <h1
                className="uppercase flush-bottom soft-half-bottom"
                style={{
                  fontWeight: "900",
                }}
              >
                72
              </h1>
            </FitText>
          </div>
          <span className="h4 floating__item soft-half-left">%</span>
        </div>
        <div className="one-whole floating">
          <h3 className="two-thirds@lap-and-up floating__item">of people who received salvation took a next step.</h3>
        </div>
        <em>like these</em>
        <div className="push-double-bottom push-top soft-half-top">
          <SmallButton text="Baptism" className="btn--light push-half-right" />
          <SmallButton text="Attending Connect" className="btn--light push-half-right" />
          <SmallButton text="Joining a Group" className="btn--light push-half-right" />
          <SmallButton text="Giving" className="btn--light push-half-right" />
        </div>
      </div>
    </div>
    {/* Baptism */}
    <div className="background--light-primary soft-double-top text-center one-whole soft-top">
      <h3 className="push-top" style={{ color: "#0073AF" }}>We Witnessed</h3> className="one-whole">
        <div className={css(styles.waves)}>
          <div className={css(styles.wave, styles.wave_1)} />
          <div className={css(styles.wave, styles.wave_2)} />
          <div className={css(styles.wave, styles.wave_3)} />
        </div>
      </div>
      <div className="soft-double text-light-primary" style={{ backgroundColor: "#0073AF" }}>
        <FitText compressor={0.4} maxFontSize={72}>
          <h1
            className="uppercase flush-bottom soft-half-bottom"
            style={{
              fontWeight: "900",
            }}
          >
            5,253
          </h1>
        </FitText>
        <h5 className="text-light-primary push-top">Go Public For Jesus Through</h5>
        <h1 className="text-light-primary push-top push-double-bottom">Baptism</h1>
      </div>
    </div>
    {/* First Time Visitors */}
    <div className="background--light-primary soft-double@lap-and-up soft-double-top@handheld soft-half-bottom@handheld">
      <div className="grid one-whole push-double-top">
        <div className="grid__item push-half-left@handheld floating one-half@lap-and-up text-center display-inline-block" style={{ verticalAlign: "middle" }}>
          <div className="floating__item three-quarters@lap-wide-and-up">
            <h3
              className="italic"
              style={{
                fontFamily: "ff-meta-serif-web-pro, serif",
              }}
            >
              We had
            </h3>
            <FitText compressor={0.4} maxFontSize={80}>
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
        <div className="grid__item push-half-left@handheld floating one-half@lap-and-up display-inline-block" style={{ verticalAlign: "middle" }}>
          <div className="floating__item three-quarters@lap-wide-and-up one-whole display-inline-block" style={{ verticalAlign: "middle" }}>
            <VictoryPie
              data={firstTimeVisitorData}
              x="ministry"
              y="count"
              style={{
                labels: { display: "none" },
              }}
              colorScale={["#6BAC43", "#1C683E", "#2A4930"]}
              labelRadius={100}
            />
          </div>
        </div>
        <div className="floating push-double-left@handheld soft-top@lap-and-up">
          <div className="floating__item text-left">
            {firstTimeVisitorData.map(({ ministry, count, color }, key) => (
              <div className="push-half display-inline-block@lap-and-up" key={key}>
                <div className="display-inline-block" style={{ verticalAlign: "middle", borderRadius: "100%", border: `1px solid ${color}`, background: `${color}`, width: "1%", padding: "8px 8px" }} />
                <h6 className="display-inline-block push-half-left" key={key} style={{ verticalAlign: "middle", marginBottom: "0" }}>{ministry}: {count}</h6>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <div className="floating background--light-primary">
      <div className="soft-double soft-sides@handheld text-center three-quarters@lap-wide-and-up nine-tenths@lap floating__item">
        <hr className="visuallyhidden@handheld push-double-ends" style={{ borderTop: "1px solid #dddddd" }} />
        <div className="text-center">
          <Story
            image={"//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/stories/story-img3.png"}
            content={"<p>&#34;On my first visit to NewSpring, the VIP Room made a huge impression on me. My host, Cathy, was so warm and friendly. She helped get my daughter checked in to KidSpring, answered my questions, and connected me to some next steps.&#34;</p>"}
            name={"Angel Hill"}
            location={"Charleston"}
            heading={"The VIP Room made a difference for"}
          />
        </div>
      </div>
    </div>
    {/* Volunteers */}
    <div className="background--light-secondary soft-double-top soft-double-bottom text-center">
      <div className="push-double-top">
        <h3
          className="italic push-double-top"
          style={{
            fontFamily: "ff-meta-serif-web-pro, serif",
          }}
        >
          This year
        </h3>
      </div>
      <FitText compressor={0.4} maxFontSize={80}>
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
        <h3 className="push-top push-left push-right floating__item one-half@lap-and-up">people served at NewSpring Church</h3>
      </div>
      <div className="text-dark-tertiary push-top">
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
    <div className="background--dark-primary floating">
      <div className="soft-double-ends push-double-ends text-center text-light-primary soft-sides@palm soft-double-sides@handheld two-thirds@lap-wide-and-up floating__item">
        <FitText compressor={0.4} maxFontSize={80} minFontSize={52}>
          <h1
            className="uppercase flush-bottom soft-half-bottom soft-double-top"
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
          <SmallButton text="Speak to Someone Now" className="btn--light push-double-bottom" />
        </div>
      </div>
    </div>
    {/* Connect/Groups */}
    <div className="background--light-primary soft-double@lap-and-up soft@handheld">
      <div className="one-whole push-double-top push-double-bottom@handheld push-bottom@lap-and-up">
        <h3 className="text-center">Connect</h3>
        <p className="constrain-copy">
          We all need friends we can be ourselves with, people who make us laugh till it hurts and who will be there when we need prayer. Connect launched
          in 2016 as a way to help people connect to Jesus and to each other. This event is for anyone who wants to learn more about NewSpring and to get
          to know people in the church.
        </p>
        <div className="floating">
          <div className="soft-double hard-sides@handheld text-center three-quarters@lap-wide-and-up nine-tenths@lap floating__item">
            <hr className="visuallyhidden@handheld push-double-ends" style={{ borderTop: "1px solid #dddddd" }} />
            <Story
              image={"//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/stories/story-img4.png"}
              content={"<p>&#34;To grow in our relationship with Jesus, we knew our next step was to start serving. We walked into Connect very nervous about what it would take to get plugged in. Our host put us at ease and guided us on the start of a new journey.&#34;</p>"}
              name={"Brian and Ashley Davison"}
              location={"Florence"}
              heading={"Get connected like"}
            />
          </div>
        </div>
        <div className="text-center soft-bottom">
          <h3
            className="italic"
            style={{
              fontFamily: "ff-meta-serif-web-pro, serif",
            }}
          >
            This year
          </h3>
          <FitText compressor={0.4} maxFontSize={80}>
            <h1
              className="uppercase flush-bottom soft-half-bottom"
              style={{
                fontWeight: "900",
              }}
            >
              2,422
            </h1>
          </FitText>
          <div className="floating">
            <h3 className="push-top floating__item two-thirds@lap-and-up">people attended a group</h3>
          </div>
          <div className="text-dark-tertiary push-double-top@lap-and-up push-top@handheld">
            <h1 style={{ fontWeight: "900" }}>1,583</h1>
            <h3>for the first time!</h3>
          </div>
        </div>
      </div>
    </div>
    {/* Local Missions */}
    <div className="background--primary soft-double@lap-and-up soft@handheld">
      <div className="grid one-whole soft-top push-double-top push-double-bottom@lap-and-up">
        <div className="grid__item push-half-left@handheld one-half@lap-and-up text-light-primary display-inline-block" style={{ verticalAlign: "middle" }}>
          <h3
            className="italic text-center@handheld"
            style={{
              fontFamily: "ff-meta-serif-web-pro, serif",
            }}
          >
            We spent
          </h3>
          <div className="text-center@handheld">
            <FitText compressor={1} maxFontSize={20}>
              <Currency
                amount={localMissionAmount}
                baseHeadingSize="1"
                className="display-inline-block text-center soft-bottom"
                style={{ fontWeight: "900" }}
                theme="light"
              />
            </FitText>
          </div>
          <h3 className="text-center@handheld">on local missions</h3>
          <div className="floating__item two-thirds@lap-and-up visuallyhidden@lap-and-up push-double-bottom push-double-top">
            <img src="//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/maps/map-sc.png" alt="map of south carolina" />
          </div>
          <p className="constrain-copy@lap-and-up push-double-bottom@handheld">
            God has called our church to make a difference in South Carolina. From rebuilding homes and hosting community service days to giving
            supplies to low-income schools, the money we budget for local missions creates opportunities to share Jesus&#39; love with our neighbors
            across the state.
          </p>
        </div>
        <div className="grid__item floating one-half@lap-and-up display-inline-block visuallyhidden@handheld" style={{ verticalAlign: "middle" }}>
          <div className="floating__item two-thirds@lap-and-up">
            <img src="//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/maps/map-sc.png" alt="map of south carolina" />
          </div>
        </div>
      </div>
    </div>
    {/* Foreign Missions */}
    <div className="background--tertiary soft-double@lap-and-up soft@handheld">
      <div className="grid one-whole push-double-top soft-top push-double-bottom@lap-and-up">
        <div className="grid__item one-half@lap-and-up display-inline-block visuallyhidden@handheld" style={{ verticalAlign: "middle" }}>
          <img src="//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/maps/map-world.png" alt="map of the world" />
        </div>
        <div className="grid__item push-half-left@handheld one-half@lap-and-up soft-double-left@lap-and-up soft-right@lap-and-up text-light-primary display-inline-block" style={{ verticalAlign: "middle" }}>
          <h3
            className="italic text-center@handheld"
            style={{
              fontFamily: "ff-meta-serif-web-pro, serif",
            }}
          >
            We spent
          </h3>
          <div className="text-center@handheld">
            <FitText compressor={1} maxFontSize={20}>
              <Currency
                amount={localMissionAmount}
                baseHeadingSize="1"
                className="display-inline-block text-center soft-bottom"
                style={{ fontWeight: "900" }}
                theme="light"
              />
            </FitText>
          </div>
          <h3 className="text-center@handheld soft-bottom@handheld">on foreign missions</h3>
          <div className="one-whole visuallyhidden@lap-and-up push-top push-bottom" style={{ verticalAlign: "middle" }}>
            <img src="//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/maps/map-world.png" alt="map of the world" />
          </div>
          <p className="constrain-copy">
            We partner with Freedom Church to share Jesus&#39; love with people around the world. By partnering with local churches, we&#39;re able to
            participate in ministry that continues long after our team comes home. The local church is the hope of the world. When we work together, we
            begin to see the Great Commission happening before our eyes.
          </p>
        </div>
      </div>
      <div className="text-center text-light-primary soft-double-top soft">
        <FitText compressor={0.4} maxFontSize={80}>
          <h1
            className="uppercase flush-bottom soft-half-bottom"
            style={{
              fontWeight: "900",
            }}
          >
            2,422
          </h1>
        </FitText>
        <div className="floating">
          <h3 className="push-top floating__item two-thirds@lap-and-up">people went on a mission trip</h3>
        </div>
        <h3
          className="italic"
          style={{
            fontFamily: "ff-meta-serif-web-pro, serif",
          }}
        >
          to
        </h3>
        <FitText compressor={0.4} maxFontSize={80}>
          <h1
            className="uppercase flush-bottom soft-half-bottom"
            style={{
              fontWeight: "900",
            }}
          >
            17
          </h1>
        </FitText>
        <div className="floating">
          <h3 className="push-top floating__item two-thirds@lap-and-up">different nations</h3>
        </div>
      </div>
      <div className="floating">
        <div className="soft-sides@handheld text-center three-quarters@lap-wide-and-up nine-tenths@lap floating__item">
          <hr className="visuallyhidden@handheld push-double-ends" style={{ borderTop: "1px solid #dddddd" }} />
          <Story
            image={"//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/stories/story-img5.png"}
            content={"<p>&#34;I traveled to Uganda with NewSpring Missions in July. The trip was inspirational, heartbreaking, and heartwarming. The highlights were worshipping with, and serving, the young boys living on the streets of Kampala. We also helped make improvements to the Freedom Church Heroes boys home.&#34;</p>"}
            contentClass={"text-light-primary"}
            name={"Chat Davis"}
            location={"Greenwood"}
            heading={"Including visiting Kampala with"}
          />
        </div>
      </div>
    </div>
    {/* Keep Reading */}
    <div className="background--primary text-center text-light-primary soft-double">
      <h3 className="soft-double-top">Keep Reading</h3>
      <p>Up next in the NewSpring 2016 Annual Report is information on our ministries.</p>
      <a className="btn--light push-double-bottom">Go To Ministries Report</a>
    </div>
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
