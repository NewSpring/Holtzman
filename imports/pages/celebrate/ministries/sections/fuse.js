
import FitText from "../../components/fit-text";
import CardSlider from "../../../../components/@primitives/UI/card-slider";
import MetricCard from "../../components/metricCard";
import TagGallery from "../../../../components/@primitives/UI/tag-gallery";

const data = {
  statistics: {
    salvations: "3,880",
    attendance: {
      average: "4,060",
      campuses: [
        { name: "Aiken", average: "59" },
        { name: "Anderson", average: "883" },
        { name: "Boiling Springs", average: "189" },
        { name: "Charleston", average: "361" },
        { name: "Clemson", average: "213" },
        { name: "Columbia", average: "485" },
        { name: "Florence", average: "243" },
        { name: "Greenville", average: "529" },
        { name: "Greenwood", average: "173" },
        { name: "Hilton Head", average: "18" },
        { name: "Lexington", average: "201" },
        { name: "Myrtle Beach", average: "305" },
        { name: "Powdersville", average: "202" },
        { name: "Rock Hill", average: "28" },
        { name: "Spartanburg", average: "313" },
        { name: "Sumter", average: "80" },
      ],
    },
    gauntlet: [
      { name: "Salvations", number: "671" },
      { name: "Baptisms", number: "1,407" },
      { name: "Students", number: "5,182" },
      { name: "Volunteers", number: "1,368" },
    ],
  },
  tags: {
    overlay: "rgba(107, 164, 184, 0.9)",
    buttonColor: "#6BA4B8",
    tags: [
      {
        image1x1: "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/fuse/tag1_1x1.jpg",
        image2x1: "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/fuse/tag1_2x1.jpg",
        imageAlt: "First Timers at Fuse",
        label: "13,943",
        value: "FirstTime",
        copy: "students came to Fuse for the first time.",
      },
      {
        image1x1: "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/fuse/tag2_1x1.jpg",
        image2x1: "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/fuse/tag2_2x1.jpg",
        imageAlt: "students gave for the first time",
        label: "217",
        value: "FirstTimeGivers",
        copy: "students gave for the first time.",
      },
      {
        image1x1: "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/fuse/tag3_1x1.jpg",
        image2x1: "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/fuse/tag3_2x1.jpg",
        imageAlt: "students in a Fuse group",
        label: "3,439",
        value: "StudentsInGroups",
        copy: "students are in a Fuse group.",
      },
      {
        image1x1: "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/fuse/tag4_1x1.jpg",
        image2x1: "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/fuse/tag4_2x1.jpg",
        imageAlt: "students volunteered",
        label: "1,455",
        value: "StudentVolunteers",
        copy: "students volunteered.",
      },
    ],
  },
};

/* eslint-disable max-len */
const Fuse = () => (
  <div>
    <div className="background--light-secondary soft-double-ends@lap-and-up soft-ends text-center">
      <div className="constrain-page soft-double-top soft-sides@lap soft-sides@handheld">
        <div className="one-whole">
          <div className="constrain-copy">
            <h1 className="uppercase push-bottom" style={{ color: "#4F92A9" }}>Fuse</h1>
            <p className="text-left">Fuse is NewSpring&#39;s student ministry. Fuse is a place where middle and high school students can have fun while connecting to Jesus and to each other.</p>
          </div>

          <div className="one-whole soft-double-top@lap-and-up soft-top soft-bottom@lap-and-up">
            <h3
              className="push-double-bottom@lap-and-up push-bottom"
              style={{ color: "#4F92A9" }}
            >
              Average Weekly Attendance
            </h3>
            <FitText compressor={0.4} maxFontSize="100">
              <h1
                style={{
                  fontWeight: 900,
                  color: "#4F92A9",
                  marginBottom: 0,
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
          <h3 className="italic" style={{ color: "#4F92A9" }}><strong>Every number has a name.</strong></h3>
          <div id={"fuse"} className="soft-sides@lap">
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
      <div className="constrain-copy soft-double-ends soft-sides@handheld push-double-ends">
        <div className="one-whole">
          <h3 className="italic push-half-bottom" style={{ color: "#4F92A9" }}><strong>This year we saw</strong></h3>
          <FitText compressor={0.4} maxFontSize="100">
            <h1
              style={{
                fontWeight: 900,
                color: "#4F92A9",
              }}
            >
              {data.statistics.salvations}
            </h1>
          </FitText>
          <h3 className="soft-bottom" style={{ color: "#4F92A9" }}>students meet Jesus at Fuse.</h3>
        </div>
      </div>
    </div>

    <div className="soft-double-ends@lap-and-up soft-ends text-center text-light-primary" style={{ backgroundColor: "#4F92A9" }}>
      <div className="constrain-copy push-top push-top@lap-and-up soft-sides@handheld">
        <div className="one-whole">
          <h3 className="italic flush"><strong>This year at</strong></h3>
          <h2 className="flush">Gauntlet</h2>
          <h3 className="italic"><strong>we saw</strong></h3>
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
