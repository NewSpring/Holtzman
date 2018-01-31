// @flow
import { Link } from "react-router";
import { VictoryPie } from "victory";
import { css, StyleSheet } from "aphrodite";

import CardSlider from "../../../components/@primitives/UI/card-slider";
import Currency from "../../../components/@primitives/typography/currency";
import FitText from "../components/fit-text";
import Meta from "../../../components/shared/meta";
import MetricCard from "../components/metricCard";
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
        transform: "rotate(0deg) translatey(-0.96em) rotate(0deg)",
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
  whiteColor: {
    color: "#FFFFFF",
    borderColor: "#FFFFFF",
  },
  whiteHover: {
    ":hover": {
      backgroundColor: "#FFFFFF",
    },
  },
});

const firstTimeVisitorData = [
  { ministry: "VIP Room", count: 10636, color: "#6BAC43", countString: "10,636" },
  { ministry: "KidSpring", count: 7245, color: "#1C683E", countString: "7,245" },
  { ministry: "Fuse", count: 9350, color: "#2A4930", countString: "9,350" },
];

const volunteerData = [
  { label: "Aiken", count: "157" },
  { label: "Anderson", count: "1,947" },
  { label: "Charleston", count: "609" },
  { label: "Clemson", count: "480" },
  { label: "Columbia", count: "767" },
  { label: "Florence", count: "499" },
  { label: "Greenville", count: "874" },
  { label: "Greenwood", count: "355" },
  { label: "Hilton Head", count: "85" },
  { label: "Myrtle Beach", count: "414" },
  { label: "Northeast Columbia", count: "121" },
  { label: "Powdersville", count: "553" },
  { label: "Rock Hill", count: "134" },
  { label: "Spartanburg", count: "813" },
];
const localMissionAmount = "1371578.00";
const foreignMissionAmount = "829264.00";
const digitalMissionAmount = "1000000.00";

/* eslint-disable max-len */
export const NextSteps = () => (
  <div className="text-dark-primary">
    <Meta title="Next Steps" />
    {/* Header */}
    <div className="background--light-secondary soft-double-ends soft-sides">
      <div className="push-ends">
        <h3 className="text-center">Why do we talk about Next Steps?</h3>
        <p className="constrain-copy text-center" style={{ fontFamily: "colfax-web" }}>
          NewSpring exists to connect people to Jesus and each other. Salvation is only the start of
          someone’s spiritual journey, and every journey is a series of next steps. Take a look at
          some of the next steps we celebrated in 2017 ...
        </p>
      </div>
    </div>
    {/* Salvations */}
    <div className="background--light-primary floating">
      <div className="soft-ends soft-sides@handheld push-double-top text-center three-quarters@lap-wide-and-up nine-tenths@lap floating__item">
        <h3>Salvations</h3>
        <FitText compressor={0.4} maxFontSize={80}>
          <h1
            className="uppercase soft-double-bottom@lap-and-up"
            style={{
              fontWeight: "900",
            }}
          >
            3,790
          </h1>
        </FitText>
        <hr
          className="visuallyhidden@handheld push-ends"
          style={{ borderTop: "1px solid #dddddd" }}
        />
        <div className="push-double-top@handheld">
          <Story
            image={
              "//s3.amazonaws.com/ns.assets/apollos/annual+report/2017/stories/Dan_Fletcher.jpg"
            }
            content={`
              <p style="font-family: colfax-web"><strong style="font-family: colfax-web">Dan Fletcher</strong> and his family found hope at <strong style="font-family: colfax-web">NewSpring Clemson</strong> in 2017.</p>
              <p style="font-family: colfax-web">Dan, his wife, and his daughter, asked Jesus into their lives at Connect and got baptized together.</p>
              <p style="font-family: colfax-web">&#34;Instead of fearing what troubles the future will bring, I now can’t wait to see what God has in store for us.&#34;</p>
            `}
            linkUrl={"https://newspring.cc/stories/dan-fletcher"}
            linkClass={"h6 btn--small@next btn--dark-secondary"}
            linkText={"Read the story and watch their baptism"}
          />
        </div>
      </div>
    </div>
    {/* Baptism */}
    <div className="background--light-seconday soft-double-top text-center one-whole soft-top">
      <h3 className="one-whole push-top" style={{ color: "#0073AF" }}>
        We witnessed
      </h3>
      <div className={css(styles.waves)}>
        <div className={css(styles.wave, styles.wave_1)} />
        <div className={css(styles.wave, styles.wave_2)} />
        <div className={css(styles.wave, styles.wave_3)} />
      </div>
      <div className="soft-double text-light-primary" style={{ backgroundColor: "#0073AF" }}>
        <FitText compressor={0.4} maxFontSize={72}>
          <h1 className="uppercase flush-bottom soft-half-bottom" style={{ fontWeight: "900" }}>
            2,040
          </h1>
        </FitText>
        <h5 className="text-light-primary push-top">people go public for Jesus through</h5>
        <h1 className="text-light-primary push-top push-bottom">baptism.</h1>
      </div>
    </div>
    {/* First Time Visitors */}
    <div className="background--light-primary soft-double@lap-and-up soft-double-top@handheld soft-half-bottom@handheld">
      <div className="grid one-whole push-top@handheld push-double-bottom@handheld">
        <div
          className="grid__item push-half-left@handheld floating one-half@lap-and-up text-center display-inline-block"
          style={{ verticalAlign: "middle" }}
        >
          <div className="floating__item three-quarters@lap-wide-and-up">
            <h3
              className="italic"
              style={{
                fontFamily: "ff-meta-serif-web-pro, serif",
                color: "#bc9b67",
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
                27,231
              </h1>
            </FitText>
            <h3 className="push-top soft-sides@handheld">first-time visitors come to NewSpring.</h3>
          </div>
        </div>
        <div
          className="grid__item push-half-left@handheld floating one-half@lap-and-up display-inline-block"
          style={{ verticalAlign: "middle" }}
        >
          <div
            className="floating__item three-quarters@lap-wide-and-up one-whole display-inline-block"
            style={{ verticalAlign: "middle" }}
          >
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
            {firstTimeVisitorData.map(({ ministry, count, color, countString }, key) => (
              <div className="push-half display-inline-block@lap-and-up" key={key}>
                <div
                  className="display-inline-block"
                  style={{
                    verticalAlign: "middle",
                    borderRadius: "100%",
                    border: `1px solid ${color}`,
                    background: `${color}`,
                    width: "1%",
                    padding: "8px 8px",
                  }}
                />
                <h6
                  className="display-inline-block push-half-left"
                  key={key}
                  style={{ verticalAlign: "middle", marginBottom: "0" }}
                >
                  {ministry}: {countString}
                </h6>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    {/* Volunteers */}
    <div
      className="soft-ends visuallyhidden@handheld"
      style={{
        backgroundImage: `url("//s3.amazonaws.com/ns.assets/apollos/annual+report/2017/serve_2x1.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "50em",
      }}
    />
    <div
      className="soft-ends visuallyhidden@lap-and-up"
      style={{
        backgroundImage: `url("//s3.amazonaws.com/ns.assets/apollos/annual+report/2017/serve_1x1.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "25em",
      }}
    />
    <div className="background--light-secondary soft-double-top soft-double-bottom text-center">
      <div className="push-double-top">
        <h3
          className="italic push-top"
          style={{
            fontFamily: "ff-meta-serif-web-pro, serif",
            color: "#bc9b67",
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
          7,808
        </h1>
      </FitText>
      <div className="floating">
        <h3 className="push-top push-left push-right floating__item one-half@lap-and-up">
          people served at NewSpring Church
        </h3>
      </div>
      <h3
        className="italic"
        style={{
          fontFamily: "ff-meta-serif-web-pro, serif",
        }}
      >
        and
      </h3>
      <div className="push-top">
        <h1 style={{ fontWeight: "900" }}>2,354</h1>
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
            4,716
          </h1>
        </FitText>
        <div className="one-whole floating">
          <h3 className="two-thirds@lap-and-up floating__item">people visited the Care room.</h3>
        </div>
        <em>Do you need help?</em>
        <div className="push-double-top">
          <a
            href={"https://rock.newspring.cc/Workflows/268?Social=No"}
            className={"btn btn--light btn--small@next"}
            target={"_blank"}
          >
            {"Talk To Someone"}
          </a>
        </div>
      </div>
    </div>
    {/* Connect/Groups */}
    <div className="background--light-primary soft-double@lap-and-up soft@handheld">
      <div className="one-whole push-double-top push-double-bottom@handheld push-bottom@lap-and-up">
        <h3 className="text-center">Connect</h3>
        <p className="constrain-copy text-center" style={{ fontFamily: "colfax-web" }}>
          Life is better with friends. Connect is a fun first step for anyone who wants to learn
          more about NewSpring, get to know new people, and get connected to next steps.
        </p>
        <div className="floating push-double-top@handheld">
          <div className="soft-double@lap-and-up hard-sides@handheld text-center three-quarters@lap-wide-and-up nine-tenths@lap floating__item">
            <hr
              className="visuallyhidden@handheld push-ends"
              style={{ borderTop: "1px solid #dddddd" }}
            />
            <Story
              image={
                "//s3.amazonaws.com/ns.assets/apollos/annual+report/2017/stories/Chelsea_Tolive.jpg"
              }
              content={`
                <p style="font-family: colfax-web"><strong style="font-family: colfax-web">Chelsea Tolive</strong> was baptized and connected with a home group through <strong style="font-family: colfax-web">Connect</strong> at <strong style="font-family: colfax-web">NewSpring Anderson</strong> in 2017.</p>
                <p style="font-family: colfax-web">&#34;I am breaking more of my chains every week at my home group. Church has gone from an obligation or a sometimes-thing to an every-week-thing I absolutely look forward to!&#34;</p>
              `}
              name={"Chelsea Tolive"}
            />
          </div>
        </div>
        <div className="text-center">
          <h3
            className="italic"
            style={{
              fontFamily: "ff-meta-serif-web-pro, serif",
              color: "#bc9b67",
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
              9,055
            </h1>
          </FitText>
          <div className="floating">
            <h3 className="push-top floating__item two-thirds@lap-and-up">
              people attended a group
            </h3>
          </div>
          <h3
            className="italic"
            style={{
              fontFamily: "ff-meta-serif-web-pro, serif",
            }}
          >
            and
          </h3>
          <div className="push-top">
            <h1 style={{ fontWeight: "900" }}>2,367</h1>
            <h3>for the first time!</h3>
          </div>
        </div>
      </div>
    </div>
    {/* Local Missions */}
    <div className="background--primary soft-double@lap-and-up soft@handheld">
      <div className="grid one-whole soft-top@handheld soft-double@lap-and-up floating">
        <div
          className="grid__item push-half-left@handheld two-thirds@lap-and-up text-light-primary display-inline-block constrain-copy"
          style={{ verticalAlign: "middle", textAlign: "left" }}
        >
          <h3
            className="italic text-center@handheld"
            style={{
              fontFamily: "ff-meta-serif-web-pro, serif",
            }}
          >
            We spent
          </h3>
          <div className="text-center@handheld">
            <FitText compressor={1.0} maxFontSize={18}>
              <Currency
                amount={localMissionAmount}
                baseHeadingSize="1"
                className="display-inline-block text-center soft-bottom"
                style={{ fontWeight: "900" }}
                theme="light"
                roundCurrency
              />
            </FitText>
          </div>
          <h3 className="text-center@handheld">on local missions.</h3>
          <div className="floating__item two-thirds@lap-and-up visuallyhidden@lap-and-up push-double-bottom push-double-top">
            <img
              src="//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/maps/map-sc.png"
              alt="map of south carolina"
            />
          </div>
          <p
            className="constrain-copy@lap-and-up push-double-bottom@handheld text-center@handheld"
            style={{ fontFamily: "colfax-web" }}
          >
            We are #ForSC! God has called us to make a difference in South Carolina. From community
            service days to home repairs to partnerships with non-profit organizations, money
            dedicated to #ForSC projects created opportunities to share Jesus’ love with our
            neighbors.
          </p>
        </div>
        <div
          className="grid__item floating one-third@lap-and-up display-inline-block visuallyhidden@handheld"
          style={{ verticalAlign: "middle" }}
        >
          <div className="floating__item one-whole@lap-and-up two-thirds@handheld">
            <img
              src="//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/maps/map-sc.png"
              alt="map of south carolina"
              style={{ height: "25em" }}
            />
          </div>
        </div>
        <div className="grid__item push-half-left@handheld floating push-double-top@lap-and-up">
          <div className="text-center three-quarters@lap-wide-and-up nine-tenths@lap floating__item">
            <hr
              className="visuallyhidden@handheld push-ends"
              style={{ borderTop: "1px solid #dddddd" }}
            />
            <Story
              image={
                "//s3.amazonaws.com/ns.assets/apollos/annual+report/2017/stories/Sherri_Moss.jpg"
              }
              content={`
                <p style="font-family: colfax-web"><strong style="font-family: colfax-web">Sherri Moss</strong> of <strong style="font-family: colfax-web">NewSpring Aiken</strong> moved out of a recovery center and into her own home on <strong style="font-family: colfax-web">#ForSC</strong> day in April 2017.</p>
                <p style="font-family: colfax-web">&#34;I never had a place that felt like a family until I got to NewSpring … They took me in from the beginning, and they always support me now.&#34;</p>
              `}
              contentClass={"text-light-primary"}
              linkUrl={"https://newspring.cc/stories/sherri-moss"}
              linkClass={`h6 btn--small@next btn--light ${css(
                styles.whiteColor,
                styles.whiteHover,
              )}`}
              linkText={"Read the story"}
            />
          </div>
        </div>
      </div>
    </div>
    {/* Foreign Missions */}
    <div className="background--tertiary soft-double@lap-and-up soft@handheld">
      <div className="grid one-whole soft-top@handheld soft-double@lap-and-up floating">
        <div
          className="grid__item one-third@lap-and-up display-inline-block visuallyhidden@handheld"
          style={{ verticalAlign: "middle" }}
        >
          <img
            src="//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/maps/map-world.png"
            alt="map of the world"
          />
        </div>
        <div
          className="grid__item push-half-left@handheld two-thirds@lap-and-up soft-double-left@lap-and-up soft-right@lap-and-up text-light-primary display-inline-block constrain-copy"
          style={{ verticalAlign: "middle", textAlign: "left" }}
        >
          <h3
            className="italic text-center@handheld"
            style={{
              fontFamily: "ff-meta-serif-web-pro, serif",
            }}
          >
            We spent
          </h3>
          <div className="text-center@handheld">
            <FitText compressor={1.0} maxFontSize={18}>
              <Currency
                amount={foreignMissionAmount}
                baseHeadingSize="1"
                className="display-inline-block text-center soft-bottom"
                style={{ fontWeight: "900" }}
                theme="light"
                roundCurrency
              />
            </FitText>
          </div>
          <h3 className="text-center@handheld soft-bottom@handheld">on foreign missions.</h3>
          <div
            className="one-whole visuallyhidden@lap-and-up push-top push-bottom"
            style={{ verticalAlign: "middle" }}
          >
            <img
              src="//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/maps/map-world.png"
              alt="map of the world"
            />
          </div>
          <p
            className="constrain-copy@lap-and-up text-center@handheld"
            style={{ fontFamily: "colfax-web" }}
          >
            We believe the local church is the hope of the world. Through partnerships with several
            organizations, NewSpring Missions teams traveled to several foreign countries. By
            investing in local churches sharing the Gospel, we know the impact continues long after
            teams return home. When we work together, we can see the Great Commission happening
            before our eyes.
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
            104
          </h1>
        </FitText>
        <div className="floating">
          <h3 className="push-top floating__item two-thirds@lap-and-up">
            people went on a mission trip
          </h3>
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
            4
          </h1>
        </FitText>
        <div className="floating">
          <h3 className="push-top floating__item two-thirds@lap-and-up">different nations.</h3>
        </div>
      </div>
    </div>
    {/* Digital Missions */}
    <div className="background--dark-primary soft-double@lap-and-up soft@handheld">
      <div className="grid one-whole soft-top@handheld soft-double@lap-and-up floating">
        <div
          className="grid__item push-half-left@handheld two-thirds@lap-and-up text-light-primary display-inline-block constrain-copy"
          style={{ verticalAlign: "middle", textAlign: "left" }}
        >
          <h3
            className="italic text-center@handheld"
            style={{
              fontFamily: "ff-meta-serif-web-pro, serif",
            }}
          >
            We spent
          </h3>
          <div className="text-center@handheld">
            <FitText compressor={1.0} maxFontSize={18}>
              <Currency
                amount={digitalMissionAmount}
                baseHeadingSize="1"
                className="display-inline-block text-center soft-bottom"
                style={{ fontWeight: "900" }}
                theme="light"
                roundCurrency
              />
            </FitText>
          </div>
          <h3 className="text-center@handheld">on digital missions.</h3>
          <div className="floating__item two-thirds@lap-and-up visuallyhidden@lap-and-up push-double-bottom push-double-top">
            <img
              src="//s3.amazonaws.com/ns.assets/apollos/annual+report/2017/aol.gif"
              alt="map of south carolina"
            />
          </div>
          <p
            className="constrain-copy@lap-and-up push-double-bottom@handheld text-center@handheld"
            style={{ fontFamily: "colfax-web" }}
          >
            We are #ForSC! God has called us to make a difference in South Carolina. From community
            service days to home repairs to partnerships with non-profit organizations, money
            dedicated to #ForSC projects created opportunities to share Jesus’ love with our
            neighbors.
          </p>
        </div>
        <div
          className="grid__item floating one-third@lap-and-up display-inline-block visuallyhidden@handheld"
          style={{ verticalAlign: "middle" }}
        >
          <div className="floating__item one-whole@lap-and-up two-thirds@handheld">
            <img
              src="//s3.amazonaws.com/ns.assets/apollos/annual+report/2017/aol.gif"
              alt="map of south carolina"
            />
          </div>
        </div>
      </div>
    </div>
    {/* Keep Reading */}
    <div className="background--primary text-center text-light-primary soft">
      <h3 className="soft-double-top">Keep Reading</h3>
      {/* <p>
        Up next in the NewSpring 2016 Annual Report is information on our
        ministries.
      </p> */}
      <Link className="btn--light push-double-bottom" to="/annualreport/ministries">
        Go To Ministries Report
      </Link>
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
