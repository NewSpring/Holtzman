// @flow
import { StyleSheet, css } from "aphrodite";
import { VictoryPie } from "victory";

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
      <div className="soft-double push-double-top text-center three-quarters@lap-wide-and-up nine-tenths@lap floating__item">
        <h3>Salvations</h3>
        <FitText compressor={0.4} maxFontSize={80}>
          <h1
            className="uppercase flush-bottom soft-half-bottom"
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
          linkClass={`h6 btn--small soft-sides@portable flush one-whole@handheld ${css(styles.darkTertiaryColor, styles.darkTertiaryHover)}`}
          linkText={"Read the Full Story"}
          name={"Brett"}
          location={"Rock Hill"}
          heading={"Every number has a name, like"}
        />
      </div>
    </div>
    {/* Percent Stats */}
    <div className="floating background--dark-primary">
      <div className="soft-double-ends push-double-ends text-center text-light-primary two-thirds@lap-and-up floating__item">
        <div className="floating push-double-ends">
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
        <div className="push-double-top">
          <SmallButton text="Baptism" className="btn--light push-half-right" />
          <SmallButton text="Attending Connect" className="btn--light push-half-right" />
          <SmallButton text="Joining a Group" className="btn--light push-half-right" />
          <SmallButton text="Giving" className="btn--light push-half-right" />
        </div>
      </div>
    </div>
    {/* Baptism */}
    <div className="background--light-primary soft-double-top text-center one-whole">
      <h3 className="soft-double-top" style={{ color: "#0073AF" }}>We Witnessed</h3>
      <div className="soft-double push-double-top text-light-primary" style={{ backgroundColor: "#0073AF" }}>
        <FitText compressor={0.4} maxFontSize={80}>
          <h1
            className="uppercase flush-bottom soft-half-bottom push-double-top"
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
    <div className="background--light-primary soft-double@lap-and-up soft-double-top@handheld soft-double-bottom@handheld">
      <div className="grid one-whole soft-double-left@handheld push-double-top">
        <div className="grid__item floating one-half@lap-and-up text-center display-inline-block" style={{ verticalAlign: "middle" }}>
          <div className="floating__item two-thirds@lap-and-up">
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
        <div className="grid__item one-half@lap-and-up display-inline-block" style={{ verticalAlign: "middle" }}>
          <div className="grid">
            <div className="grid__item two-thirds@lap-and-up one-whole@handheld display-inline-block" style={{ verticalAlign: "middle" }}>
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
            <div className="grid__item one-third@lap-and-up text-left display-inline-block visuallyhidden@handheld" style={{ verticalAlign: "middle" }}>
              {firstTimeVisitorData.map(({ ministry, count, color }, key) => (
                <div className="push-bottom" key={key}>
                  <div className="display-inline-block" style={{ verticalAlign: "middle", borderRadius: "100%", border: `1px solid ${color}`, background: `${color}`, width: "1%", padding: "8px 8px" }} />
                  <h5 className="display-inline-block push-half-left" key={key} style={{ verticalAlign: "middle", marginBottom: "0" }}>{ministry}: {count}</h5>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="floating visuallyhidden@lap-and-up">
          <div className="floating__item text-left">
            {firstTimeVisitorData.map(({ ministry, count, color }, key) => (
              <div className="push-bottom" key={key}>
                <div className="display-inline-block" style={{ verticalAlign: "middle", borderRadius: "100%", border: `1px solid ${color}`, background: `${color}`, width: "1%", padding: "8px 8px" }} />
                <h5 className="display-inline-block push-half-left" key={key} style={{ verticalAlign: "middle", marginBottom: "0" }}>{ministry}: {count}</h5>
              </div>
            ))}
          </div>
        </div>
        <div className="floating">
          <div className="floating__item two-thirds@lap-and-up">
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
        <h3 className="push-top push-left push-right floating__item one-third@lap-and-up">people served at NewSpring Church</h3>
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
    <div className="background--dark-primary">
      <div className="soft-double push-double text-center text-light-primary">
        <FitText compressor={0.4} maxFontSize={80} minFontSize={52}>
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
    <div className="background--light-primary soft-double@lap-and-up soft@handheld">
      <div className="one-whole push-double-top push-double-bottom@handheld push-bottom@lap-and-up">
        <h3 className="text-center">Connect</h3>
        <p className="constrain-copy">
          We all need friends we can be ourselves with, people who make us laugh till it hurts and who will be there when we need prayer. Connect launched
          in 2016 as a way to help people connect to Jesus and to each other. This event is for anyone who wants to learn more about NewSpring and to get
          to know people in the church.
        </p>
        <div className="floating">
          <div className="floating__item two-thirds@lap-and-up">
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
        <div className="text-center">
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
      <div className="grid one-whole push-double-top push-double-bottom@lap-and-up">
        <div className="grid__item one-half@lap-and-up text-light-primary display-inline-block" style={{ verticalAlign: "middle" }}>
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
          <p className="constrain-copy@lap-and-up">
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
      <div className="grid one-whole push-double-top push-double-bottom@lap-and-up">
        <div className="grid__item one-half@lap-and-up display-inline-block visuallyhidden@handheld" style={{ verticalAlign: "middle" }}>
          <img src="//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/maps/map-world.png" alt="map of the world" />
        </div>
        <div className="grid__item one-half@lap-and-up soft-double-left@lap-and-up soft-right@lap-and-up text-light-primary display-inline-block" style={{ verticalAlign: "middle" }}>
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
          <h3 className="text-center@handheld">on foreign missions</h3>
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
        <div className="floating__item two-thirds@lap-and-up">
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
      <h3>Keep Reading</h3>
      <p>Up next in the NewSpring 2016 Annual Report is information on our ministries.</p>
      <a className="btn--light">Go To Ministries Report</a>
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
