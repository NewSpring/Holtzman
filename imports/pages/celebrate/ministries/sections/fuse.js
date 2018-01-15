import { StyleSheet, css } from "aphrodite";
import FitText from "../../components/fit-text";
import CardSlider from "../../../../components/@primitives/UI/card-slider";
import MetricCard from "../../components/metricCard";
import Story from "../../components/story";
// import TagGallery from "../../../../components/@primitives/UI/tag-gallery";

const styles = StyleSheet.create({
  secondaryColor: {
    color: "#6BA4B8",
    borderColor: "#6BA4B8",
  },
  secondaryHover: {
    ":hover": {
      backgroundColor: "#6BA4B8",
    },
  },
});

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
    overlay: "rgba(107, 164, 184, 0.6)",
    buttonColor: "#6BA4B8",
    tags: [
      {
        image1x1:
          "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/fuse/tag1_1x1.jpg",
        image2x1:
          "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/fuse/tag1_2x1.jpg",
        imageAlt: "First Timers at Fuse",
        label: "13,943",
        value: "FirstTime",
        copy: "students came to Fuse for the first time.",
      },
      {
        image1x1:
          "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/fuse/tag2_1x1.jpg",
        image2x1:
          "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/fuse/tag2_2x1.jpg",
        imageAlt: "students gave for the first time",
        label: "217",
        value: "FirstTimeGivers",
        copy: "students gave for the first time.",
      },
      {
        image1x1:
          "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/fuse/tag3_1x1.jpg",
        image2x1:
          "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/fuse/tag3_2x1.jpg",
        imageAlt: "students in a Fuse group",
        label: "3,439",
        value: "StudentsInGroups",
        copy: "students are in a Fuse group.",
      },
      {
        image1x1:
          "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/fuse/tag4_1x1.jpg",
        image2x1:
          "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/fuse/tag4_2x1.jpg",
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
    <div
      style={{
        background: `linear-gradient(${"#f7f7f7"} 50%, ${"rgba(107, 164, 184, 1)"})`,
      }}
    >
      <div className="soft-double-ends@lap-and-up soft-ends text-center">
        <div className="constrain-page soft-double-top soft-sides@lap soft-sides@handheld">
          <div className="one-whole">
            <div className="constrain-copy">
              <h1
                className="uppercase push-bottom"
                style={{ color: "#4F92A9" }}
              >
                [ Fuse ]
              </h1>
              <p className="text-center">
                Fuse is NewSpring&#39;s student ministry. Fuse is a place where
                middle and high school students can have fun while connecting to
                Jesus and to each other.
              </p>
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
            <MetricCard key={i} count={campus.average} label={campus.name} />
          ))}
        </CardSlider>

        <div className="constrain-page soft-sides@handheld">
          <div className="soft-double-top@lap-and-up">
            <h3 className="italic" style={{ color: "#4F92A9" }}>
              <strong>Every number is a student life changed</strong>
            </h3>
            <div id={"fuse"} className="soft-sides@lap">
              {data.tags.tags.map((item, i) => (
                <div
                  key={i}
                  className="one-half@lap-and-up one-whole text-center display-inline-block soft-ends"
                  style={{ padding: "1em" }}
                >
                  <div className="ratio--landscape@lap-and-up ratio--square soft@handheld constrain-copy">
                    <div
                      className="ratio__item floating one-whole rounded"
                      style={{
                        background: `linear-gradient(${data.tags.overlay}, ${
                          data.tags.overlay
                        }), url('${item.image2x1}') 0% 0%`,
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
              <div
                className="one-whole text-center display-inline-block soft-ends"
                style={{ padding: "1em" }}
              >
                <div className="ratio--landscape@lap-and-up ratio--square soft@handheld">
                  <div
                    className="ratio__item floating one-whole rounded"
                    style={{
                      background: `linear-gradient(${data.tags.overlay}, ${
                        data.tags.overlay
                      }), url('${"//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/fuse/tag1_2x1.jpg"}') 0% 0%`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                  >
                    <div className="floating__item three-fifths@lap-and-up text-light-primary soft">
                      <div className="one-whole">
                        <h3 className="italic push-half-bottom">
                          <strong>This year we saw</strong>
                        </h3>
                        <FitText compressor={0.4} maxFontSize="100">
                          <h1
                            style={{
                              fontWeight: 900,
                            }}
                          >
                            {data.statistics.salvations}
                          </h1>
                        </FitText>
                        <h3 className="soft-bottom">
                          Students cross from death to life at Fuse
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-light-primary">
        <div className="constrain-copy push-top push-top@lap-and-up soft-sides@handheld">
          <div className="one-whole">
            <h3 className="italic flush">
              <strong>This year at</strong>
            </h3>
            <h1 className="flush">Gauntlet</h1>
          </div>
        </div>

        <div className="push-bottom" style={{ color: "#4F92A9" }}>
          <CardSlider>
            {data.statistics.gauntlet.map((stat, i) => (
              <MetricCard key={i} count={stat.number} label={stat.name} />
            ))}
          </CardSlider>
        </div>
      </div>
    </div>
    <div
      style={{
        textAlign: "center",
      }}
    >
      <Story
        overriddenHeader={
          "Wesley Jordan of NewSpring Charleston was set free when he asked Jesus into his life at Gauntlet 2017."
        }
        image={
          "//s3.amazonaws.com/ns.assets/apollos/annual+report/2017/Wesley/Wesley_Intothewater.png"
        }
        content={`
          <p>“I didn’t see the reason why I was alive at times ... Now I am definitely seeing that He has a plan for me.”</p>
          `}
        contentClass={css(styles.secondaryColor)}
        linkUrl="https://newspring.cc/stories/wesley-jordan"
        linkClass={`h6 btn--small@next soft-sides@portable ${css(
          styles.secondaryColor,
          styles.secondaryHover // eslint-disable-line
        )}`}
        linkText={"Read His Story"}
      />
    </div>
  </div>
);
/* eslint-enable max-len */

export default Fuse;
