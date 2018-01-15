import { StyleSheet, css } from "aphrodite";

import FitText from "../../components/fit-text";
import CardSlider from "../../../../components/@primitives/UI/card-slider";
import MetricCard from "../../components/metricCard";
// import TagGallery from "../../../../components/@primitives/UI/tag-gallery";

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
  average: "4,629",
  campuses: [
    { name: "Aiken", average: "61" },
    { name: "Anderson", average: "979" },
    { name: "Charleston", average: "446" },
    { name: "Clemson", average: "226" },
    { name: "Columbia", average: "512" },
    { name: "Florence", average: "312" },
    { name: "Greenville", average: "538" },
    { name: "Greenwood", average: "231" },
    { name: "Hilton Head", average: "42" },
    { name: "Myrtle Beach", average: "290" },
    { name: "Northeast Columbia", average: "66" },
    { name: "Powdersville", average: "335" },
    { name: "Rock Hill", average: "56" },
    { name: "Spartanburg", average: "489" },
  ],
  stories: [
    {
      imageUrl:
        "//s3.amazonaws.com/ns.assets/apollos/annual+report/2017/IMG_1748.jpg",
      heading: "",
      content: `
      <p>Every week, SpringZone provides a loving, safe, fun, personalized environment for people with special needs, like <strong>Abby Moore</strong> of <strong>NewSpring Florence</strong>.</p>
      <p>"Abby walks into church dancing and singing ... high-fiving and reaching out to shake hands with anyone who will look her way."</p>
      `,
      linkUrl: "",
      linkText: "Read Her Story",
    },
  ],
  tags: {
    overlay: "rgba(0, 120, 205, 0.6)",
    buttonColor: "#0080C1",
    tags: [
      {
        image1x1:
          "//s3.amazonaws.com/ns.assets/apollos/annual+report/2017/KidSpring/1x1.kidspring.returned.jpg",
        image2x1:
          "//s3.amazonaws.com/ns.assets/apollos/annual+report/2017/KidSpring/2x1.kidspring.returned.jpg",
        imageAlt: "First timers who returned to KidSpring",
        label: "3,610",
        value: "FirstTime",
        copy: "first time kids returned to KidSpring.",
      },
      {
        image1x1:
          "//s3.amazonaws.com/ns.assets/apollos/annual+report/2017/KidSpring/1x1.kidspring.baptized.jpg",
        image2x1:
          "//s3.amazonaws.com/ns.assets/apollos/annual+report/2017/KidSpring/2x1.kidspring.baptized.jpg",
        imageAlt: "Kids were baptized",
        label: "307",
        value: "KidsBaptized",
        copy: "kids were baptized.",
      },
      // {
      //   image1x1:
      //     "//s3.amazonaws.com/ns.assets/apollos/annual+report/2017/1x1.kidspring.gave.jpg",
      //   image2x1:
      //     "//s3.amazonaws.com/ns.assets/apollos/annual+report/2017/2x1.kidspring.gave.jpg",
      //   imageAlt: "Kids who gave for the first time",
      //   label: "191",
      //   value: "KidsWhoGave",
      //   copy: "kids gave for the first time.",
      // },
      {
        image1x1:
          "//s3.amazonaws.com/ns.assets/apollos/annual+report/2017/KidSpring/1x1.kidspring.transitioned.jpg",
        image2x1:
          "//s3.amazonaws.com/ns.assets/apollos/annual+report/2017/KidSpring/2x1.kidspring.transitioned.jpg",
        imageAlt: "Kids who transitioned to Fuse",
        label: "581",
        value: "KidsFuse",
        copy: "kids transitioned to Fuse.",
      },
    ],
  },
};

/* eslint-disable max-len */
const KidSpring = () => (
  <div>
    <div
      className={`${css(
        styles.primaryBackground // eslint-disable-line
      )} soft-double-ends@lap-and-up soft-ends text-center text-light-primary`}
    >
      <div className="constrain-page soft-double-top soft-sides@handheld soft-sides@lap">
        <div className="grid">
          <div className="grid__item one-whole push-bottom">
            <div className="constrain-copy">
              <h1 className="uppercase push-bottom">KidSpring</h1>
              <p className="text-center">
                KidSpring is the children&#39;s ministry at NewSpring Church.
                Every Sunday, children from birth through fifth grade experience
                Jesus on their level in environments that are safe, fun, and
                age-appropriate.
              </p>
            </div>
          </div>

          <div className="grid__item one-whole soft-double-top@lap-and-up soft-top soft-bottom@lap-and-up">
            <h3 className="push-double-bottom@lap-and-up push-bottom">
              Average Number Of Kids Each Sunday
            </h3>
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
            <MetricCard key={i} count={campus.average} label={campus.name} />
          ))}
        </CardSlider>
      </div>
    </div>

    <div className="background--light-primary soft-double-sides@lap-and-up soft-double-top@lap-and-up soft soft-double-top">
      <div className="constrain-page push-double-ends@lap-and-up">
        <div className="one-whole text-center">
          <h3
            className={`italic push-half-bottom ${css(styles.secondaryColor)}`}
          >
            <strong>Every number is a student life changed</strong>
          </h3>
        </div>
        <div className="floating">
          <div className="floating__item one-whole">
            <div id="kidspring" className="floating__item soft-bottom@handheld">
              {data.tags.tags.map((item, i) => (
                <div
                  key={i}
                  className="one-third@lap-and-up one-whole text-center display-inline-block soft-ends"
                  style={{ padding: "1em" }}
                >
                  <div className="ratio--square@lap-and-up ratio--square soft@handheld constrain-copy">
                    <div
                      className="ratio__item floating one-whole rounded"
                      style={{
                        background: `linear-gradient(${data.tags.overlay}, ${
                          data.tags.overlay
                        }), url('${item.image1x1}') 0% 0%`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                      }}
                    >
                      <div className="floating__item three-fifths@lap-and-up text-light-primary soft">
                        <h1 className="" style={{ fontWeight: "900" }}>
                          {item.label}
                        </h1>
                        <h4 className="flush">{item.copy}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="soft-double-sides@lap-and-up">
              {data.stories.map((story, i) => (
                <Story
                  key={i}
                  image={story.imageUrl}
                  content={story.content}
                  contentClass={css(styles.secondaryColor)}
                  linkUrl="https://newspring.cc/stories/allison-moore"
                  linkClass={`h6 btn--small@next soft-sides@portable ${css(
                    styles.secondaryColor,
                    styles.secondaryHover // eslint-disable-line
                  )}`}
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
