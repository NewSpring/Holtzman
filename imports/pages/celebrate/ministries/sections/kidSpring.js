
// import {
//   Body,
// } from "../../../../components/layout";

import FitText from "../../components/fit-text";
import CardSlider from "../../../../components/@primitives/UI/card-slider";
import { MetricCard } from "../../../../components/@primitives/UI/cards";
// import List from "../../../../components/list";

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
    <div className="soft-double-top@lap-and-up" style={{ backgroundColor: "#00A7DD" }}>

      <div className="one-whole text-center text-light-primary push-bottom">
        <h1 className="uppercase">KidSpring</h1>
        <p className="constrain-copy">KidSpring is the children's ministry at NewSpring Church.  Every Sunday, children from birth through fifth grade experience Jesus on their level in environments that are safe, fun, and age-appropriate.</p>
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

      <div className="one-whole" style={{ color: "#00A7DD" }}>
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
      <h3 className="italic" style={{ color: "#0080C1" }}><strong>Every number is a student life changed</strong></h3>

      {data.stories.map((story, i) => (
        <div className="grid" key={i}>
          <div className="constrain-copy">
            <div className="grid__item one-quarter@lap-and-up">
              <div className="ratio--square background--fill round" style={{ backgroundImage: `url('${story.imageUrl}')` }}>
                <div className="ratio__item" />
              </div>
            </div>
            <div className="grid__item three-quarters@lap-and-up text-left">
              <div dangerouslySetInnerHTML={{ __html: story.content }} style={{ color: "#0080C1" }} />
              <button
                className="h6 btn--small soft-sides@portable one-whole@handheld"
                style={{ color: "#0080C1", borderColor: "#0080C1" }}
              >
                {story.linkText}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
/* eslint-enable max-len */

export default KidSpring;
