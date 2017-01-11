
import { StyleSheet, css } from "aphrodite";
// import {
//   Body,
// } from "../../../../components/layout";

import FitText from "../../components/fit-text";
import CardSlider from "../../../../components/@primitives/UI/card-slider";
import { MetricCard } from "../../../../components/@primitives/UI/cards";

import Story from "../../components/story";
// import List from "../../../../components/list";

const styles = StyleSheet.create({
  primaryBackground: {
    backgroundColor: "#00A7DD",
  },
  primaryColor: {
    color: "#00A7DD",
    borderColor: "#00A7DD",
  },
  secondaryColor: {
    color: "#0080C1",
    borderColor: "#0080C1",
  },
  secondaryHover: {
    ":hover": {
      backgroundColor: "#0080C1",
    },
  },
});

const data = {
  average: "23,422",
  campuses: [
    {
      name: "Aiken",
      average: "6,200",
    },
    {
      name: "Anderson",
      average: "6,200",
    },
    {
      name: "Boiling Springs",
      average: "6,200",
    },
    {
      name: "Charleston",
      average: "6,200",
    },
    {
      name: "Clemson",
      average: "6,200",
    },
    {
      name: "Columbia",
      average: "6,200",
    },
    {
      name: "Florence",
      average: "6,200",
    },
    {
      name: "Greenville",
      average: "6,200",
    },
    {
      name: "Greenwood",
      average: "6,200",
    },
    {
      name: "Hilton Head",
      average: "6,200",
    },
    {
      name: "Myrtle Beach",
      average: "6,200",
    },
    {
      name: "Northeast Columbia",
      average: "6,200",
    },
    {
      name: "Powdersville",
      average: "6,200",
    },
    {
      name: "Rock Hill",
      average: "6,200",
    },
    {
      name: "Spartanbury",
      average: "6,200",
    },
    {
      name: "Sumter",
      average: "6,200",
    },
  ],
  stories: [
    {
      imageUrl: "//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/all/member_images/dlt/leaders.clayton_1000_1000_90_c1.jpg",
      heading: "",
      content: "<p>Every week, kids like <strong>Sydney Chandler</strong> from <strong>Anderson</strong> are amoung the volunteers who make KidSpring a unique, fun, and valuable experience for kids.</p>",
      linkUrl: "",
      linkText: "Read Her Story",
    },
  ],
};

/* eslint-disable max-len */
const KidSpring = () => (
  <div className="text-center one-whole ">
    <div className={`soft-double-top@lap-and-up ${css(styles.primaryBackground)}`}>

      <div className="one-whole text-center text-light-primary push-bottom">
        <h1 className="uppercase">KidSpring</h1>
        <p className="constrain-copy">KidSpring is the children&#39;s ministry at NewSpring Church.  Every Sunday, children from birth through fifth grade experience Jesus on their level in environments that are safe, fun, and age-appropriate.</p>
      </div>

      <div className="one-whole text-center text-light-primary">
        <h3
          className=""
        >
          Average Number Of Kids Each Sunday
        </h3>

        <FitText compressor={1.1}>
          <h1
            className="flush-bottom soft-half-bottom soft-double-top"
            style={{
              fontWeight: 900,
            }}
          >
            {data.average}
          </h1>
        </FitText>
      </div>

      <div className={`one-whole ${css(styles.primaryColor)}`}>
        <CardSlider>
          {data.campuses.map((campus, i) => (
            <MetricCard
              key={i}
              count={campus.average}
              label={campus.name}
            />
          ))}
        </CardSlider>
      </div>
    </div>

    <div className="soft-double-top@lap-and-up">
      <h3 className={`italic ${css(styles.secondaryColor)}`}><strong>Every number is a student life changed</strong></h3>

      {data.stories.map((story, i) => (
        <Story
          key={i}
          image={story.imageUrl}
          content={story.content}
          contentClass={css(styles.secondaryColor)}
          linkUrl=""
          linkClass={`h6 btn--small soft-sides@portable one-whole@handheld ${css(styles.secondaryColor, styles.secondaryHover)}`}
          linkText={story.linkText}
        />
      ))}
    </div>
  </div>
);
/* eslint-enable max-len */

export default KidSpring;
