
import FitText from "../../components/fit-text";
import CardSlider from "../../../../components/@primitives/UI/card-slider";
import { MetricCard } from "../../../../components/@primitives/UI/cards";
import TagGallery from "../../../../components/@primitives/UI/tag-gallery";

const data = {
  statistics: {
    salvations: "3,130",
    attendance: {
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
    },
    gauntlet: [
      {
        name: "Salvations",
        number: "6,200",
      },
      {
        name: "Baptisms",
        number: "6,200",
      },
      {
        name: "Students",
        number: "6,200",
      },
      {
        name: "Volunteers",
        number: "6,200",
      },
    ],
  },
  tags: {
    overlay: "rgba(107, 164, 184, 0.9)",
    buttonColor: "#6BA4B8",
    disabledColor: "#DDDDDD",
    tags: [
      {
        image1x1: "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/fuse/tag1_1x1.jpg",
        image2x1: "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/fuse/tag1_2x1.jpg",
        imageAlt: "First Timers at NewSpring",
        label: "6,200",
        value: "FirstTime",
        copy: "students who came to Fuse for the first time",
      },
      {
        image1x1: "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/fuse/tag2_1x1.jpg",
        image2x1: "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/fuse/tag2_2x1.jpg",
        imageAlt: "First Timers at NewSpring",
        label: "2,315",
        value: "SomethingCool",
        copy: "students did something cool",
      },
      {
        image1x1: "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/fuse/tag3_1x1.jpg",
        image2x1: "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/fuse/tag3_2x1.jpg",
        imageAlt: "First Timers at NewSpring",
        label: "423",
        value: "SomethingElse",
        copy: "students did something else",
      },
      {
        image1x1: "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/fuse/tag4_1x1.jpg",
        image2x1: "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/fuse/tag4_2x1.jpg",
        imageAlt: "First Timers at NewSpring",
        label: "4,021",
        value: "Stats",
        copy: "students don't care about statistics",
      },
    ],
  },
};

/* eslint-disable max-len */
const Fuse = () => (
  <div>
    <div className="background--light-secondary soft-double-ends@lap-and-up soft-ends text-center">
      <div className="constrain-page soft-double-top soft-sides@handheld">
        <div className="one-whole push-bottom">
          <div className="constrain-copy">
            <h1 className="uppercase push-bottom" style={{ color: "#4F92A9" }}>Fuse</h1>
            <p className="text-left">Fuse is NewSpring&#39;s student ministry. Fuse is a place where middle and high school students can have fun while connecting to Jesus and to each other.</p>
          </div>

          <div className="one-whole soft-double-top soft-bottom">
            <h3
              className="push-half-bottom"
              style={{ color: "#4F92A9" }}
            >
              Average Weekly Attendance
            </h3>
            <FitText compressor={0.6} maxFontSize="100">
              <h1
                style={{
                  fontWeight: 900,
                  color: "#4F92A9",
                }}
              >
                {data.statistics.attendance.average}
              </h1>
            </FitText>
          </div>
        </div>
      </div>

      <CardSlider>
        {data.statistics.attendance.campuses.map((campus, i) => (
          <MetricCard
            key={i}
            count={campus.average}
            label={campus.name}
          />
        ))}
      </CardSlider>

      <div className="constrain-page soft-sides@handheld">
        <div className="soft-double-top@lap-and-up soft-bottom@lap-and-up">
          <h3 className="italic" style={{ color: "#4F92A9" }}><strong>Every number is a student life changed</strong></h3>
          <div id={"fuse"}>
            <TagGallery
              id={"fuse"}
              buttonColor={data.tags.buttonColor}
              disabledColor={data.tags.disabledColor}
              overlay={data.tags.overlay}
              tags={data.tags.tags}
            />
          </div>
        </div>
      </div>
    </div>

    <div className="background--light-primary text-center soft-double-ends">
      <div className="constrain-copy soft-double-ends push-double-ends soft-sides@handheld">
        <div className="one-whole">
          <h3 className="italic push-half-bottom" style={{ color: "#4F92A9" }}><strong>This year we saw</strong></h3>
          <FitText compressor={0.6} maxFontSize="100">
            <h1
              style={{
                fontWeight: 900,
                color: "#4F92A9",
              }}
            >
              {data.statistics.salvations}
            </h1>
          </FitText>
          <h3 className="flush" style={{ color: "#4F92A9" }}>Students cross from death to life at Fuse</h3>
        </div>
      </div>
    </div>

    <div className="soft-double-ends@lap-and-up soft-ends text-center text-light-primary" style={{ backgroundColor: "#4F92A9" }}>
      <div className="constrain-copy push-half-top push-top@lap-and-up soft-sides@handheld">
        <div className="one-whole">
          <h3 className="italic flush"><strong>This year at</strong></h3>
          <h2>Gauntlet</h2>
        </div>
      </div>

      <div className="push-bottom" style={{ color: "#4F92A9" }}>
        <CardSlider>
          {data.statistics.gauntlet.map((stat, i) => (
            <MetricCard
              key={i}
              count={stat.number}
              label={stat.name}
            />
          ))}
        </CardSlider>
      </div>
    </div>
  </div>
);
/* eslint-enable max-len */

export default Fuse;
