
import { StyleSheet, css } from "aphrodite";

import FitText from "../../components/fit-text";
import CardSlider from "../../../../components/@primitives/UI/card-slider";
import MetricCard from "../../components/metricCard";
import TagGallery from "../../../../components/@primitives/UI/tag-gallery";

import Story from "../../components/story";

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
      imageUrl: "//s3.amazonaws.com/ns.assets/apollos/annual%20report/2016/stories/story-img6.png",
      heading: "",
      content: "<p>Every week, kids like <strong>Sydney Chandler</strong> from <strong>Anderson</strong> are amoung the volunteers who make KidSpring a unique, fun, and valuable experience for kids.</p>",
      linkUrl: "",
      linkText: "Read Her Story",
    },
  ],
  tags: {
    overlay: "rgba(0, 128, 193, 0.9)",
    buttonColor: "#0080C1",
    tags: [
      {
        image1x1: "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/kidspring/tag1_1x1.jpg",
        image2x1: "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/kidspring/tag1_2x1.jpg",
        imageAlt: "First Timers at NewSpring",
        label: "6,200",
        value: "FirstTime",
        copy: "first-time kids returned to KidSpring",
      },
      {
        image1x1: "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/kidspring/tag2_1x1.jpg",
        image2x1: "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/kidspring/tag2_2x1.jpg",
        imageAlt: "First Timers at NewSpring",
        label: "2,315",
        value: "SomethingCool",
        copy: "kids did something cool",
      },
      {
        image1x1: "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/kidspring/tag3_1x1.jpg",
        image2x1: "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/kidspring/tag3_2x1.jpg",
        imageAlt: "First Timers at NewSpring",
        label: "423",
        value: "SomethingElse",
        copy: "kids did something else",
      },
      {
        image1x1: "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/kidspring/tag4_1x1.jpg",
        image2x1: "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/kidspring/tag4_2x1.jpg",
        imageAlt: "First Timers at NewSpring",
        label: "4,021",
        value: "Stats",
        copy: "kids don't care about statistics",
      },
    ],
  },
};

/* eslint-disable max-len */
const KidSpring = () => (
  <div>
    <div className={`${css(styles.primaryBackground)} soft-double-ends@lap-and-up soft-ends text-center text-light-primary`}>
      <div className="constrain-page soft-double-top soft-sides@handheld">
        <div className="grid">
          <div className="grid__item one-whole push-bottom">
            <div className="constrain-copy">
              <h1 className="uppercase push-bottom">KidSpring</h1>
              <p className="text-left">KidSpring is the children&#39;s ministry at NewSpring Church.  Every Sunday, children from birth through fifth grade experience Jesus on their level in environments that are safe, fun, and age-appropriate.</p>
            </div>
          </div>

          <div className="grid__item one-whole soft-double-top@lap-and-up soft-top soft-bottom">
            <h3 className="push-half-bottom">Average Number Of Kids Each Sunday</h3>
            <FitText compressor={0.6} maxFontSize="100">
              <h1
                style={{
                  fontWeight: 900,
                }}
              >
                {data.average}
              </h1>
            </FitText>
          </div>
        </div>
      </div>

      <div className={`${css(styles.primaryColor)} push-bottom`}>
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

    <div className="background--light-primary soft-double@lap-and-up soft">
      <div className="constrain-page soft@handheld push-double-ends@lap-and-up">
        <div className="floating">
          <div className="one-whole">
            <h3 className={`italic ${css(styles.secondaryColor)}`}><strong>Every number is a student life changed</strong></h3>
          </div>
          <div className="floating__item three-quarters@lap-wide-and-up">
            <div id="kidspring" className="floating__item soft-bottom@handheld">
              <TagGallery
                id={"kidspring"}
                buttonColor={data.tags.buttonColor}
                disabledColor={data.tags.disabledColor}
                overlay={data.tags.overlay}
                tags={data.tags.tags}
              />
            </div>
            <div className="soft-double-sides@lap-and-up">
              {data.stories.map((story, i) => (
                <Story
                  key={i}
                  image={story.imageUrl}
                  content={story.content}
                  contentClass={css(styles.secondaryColor)}
                  linkUrl="#"
                  linkClass={`h6 btn--small@next soft-sides@portable ${css(styles.secondaryColor, styles.secondaryHover)}`}
                  linkText={story.linkText}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
);
/* eslint-enable max-len */

export default KidSpring;
