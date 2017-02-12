
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
  average: "6,322",
  campuses: [
    { name: "Aiken", average: "61" },
    { name: "Anderson", average: "1,394" },
    { name: "Boiling Springs", average: "198" },
    { name: "Charleston", average: "585" },
    { name: "Clemson", average: "128" },
    { name: "Columbia", average: "679" },
    { name: "Florence", average: "447" },
    { name: "Greenville", average: "794" },
    { name: "Greenwood", average: "339" },
    { name: "Hilton Head", average: "41" },
    { name: "Lexington", average: "174" },
    { name: "Myrtle Beach", average: "408" },
    { name: "Northeast Columbia", average: "75" },
    { name: "Powdersville", average: "340" },
    { name: "Rock Hill", average: "54" },
    { name: "Spartanburg", average: "560" },
    { name: "Sumter", average: "75" },
  ],
  stories: [
    {
      imageUrl: "//s3.amazonaws.com/ns.assets/apollos/annual%20report/2016/stories/story-img6.png",
      heading: "",
      content: "<p>Every week, kids like <strong>Sydney Chandler</strong> from <strong>Anderson</strong> are among the volunteers who make KidSpring a unique, fun, and valuable experience for kids.</p>",
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
        imageAlt: "First timers who returned to KidSpring",
        label: "5,970",
        value: "FirstTime",
        copy: "first time kids returned to KidSpring.",
      },
      {
        image1x1: "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/kidspring/tag2_1x1.jpg",
        image2x1: "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/kidspring/tag2_2x1.jpg",
        imageAlt: "Kids were baptized",
        label: "861",
        value: "KidsBaptized",
        copy: "kids were baptized.",
      },
      {
        image1x1: "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/kidspring/tag3_1x1.jpg",
        image2x1: "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/kidspring/tag3_2x1.jpg",
        imageAlt: "Kids who gave for the first time",
        label: "191",
        value: "KidsWhoGave",
        copy: "kids gave for the first time.",
      },
      {
        image1x1: "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/kidspring/tag4_1x1.jpg",
        image2x1: "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/kidspring/tag4_2x1.jpg",
        imageAlt: "Kids who transitioned to Fuse",
        label: "928",
        value: "KidsFuse",
        copy: "kids transitioned to Fuse.",
      },
    ],
  },
};

/* eslint-disable max-len */
const KidSpring = () => (
  <div>
    <div className={`${css(styles.primaryBackground)} soft-double-ends@lap-and-up soft-ends text-center text-light-primary`}>
      <div className="constrain-page soft-double-top soft-sides@handheld soft-sides@lap">
        <div className="grid">
          <div className="grid__item one-whole push-bottom">
            <div className="constrain-copy">
              <h1 className="uppercase push-bottom">KidSpring</h1>
              <p className="text-left">KidSpring is the children&#39;s ministry at NewSpring Church.  Every Sunday, children from birth through fifth grade experience Jesus on their level in environments that are safe, fun, and age-appropriate.</p>
            </div>
          </div>

          <div className="grid__item one-whole soft-double-top@lap-and-up soft-top soft-bottom@lap-and-up">
            <h3 className="push-double-bottom@lap-and-up push-bottom">Average Weekly Attendance</h3>
            <FitText compressor={0.4} maxFontSize="100">
              <h1
                style={{
                  fontWeight: 900,
                  marginBottom: 0,
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

    <div className="background--light-primary soft-double-sides@lap-and-up soft-double-top@lap-and-up soft soft-double-top">
      <div className="constrain-page push-double-ends@lap-and-up">
        <div className="one-whole text-center">
          <h3 className={`italic push-half-bottom ${css(styles.secondaryColor)}`}><strong>Every number has a name.</strong></h3>
        </div>
        <div className="push-double-bottom one-whole text-center">
          <small><em>Click or tap on a number below to see a few interesting facts about this ministry!</em></small>
        </div>
        <div className="floating">
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
                  linkUrl="https://newspring.cc/stories/sydney-chandler"
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
