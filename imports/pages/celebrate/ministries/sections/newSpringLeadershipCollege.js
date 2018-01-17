import Story from "../../components/story";
import FitText from "../../components/fit-text";

const data = {
  tags: {
    overlay: "rgba(107, 172, 67, 0.6)",
    buttonColor: "#6BAC43",
    tags: [
      {
        image1x1:
          "//s3.amazonaws.com/ns.assets/apollos/annual+report/2017/NSCollege/1x1.college.currentstudents.jpg",
        image2x1:
          "//s3.amazonaws.com/ns.assets/apollos/annual+report/2017/NSCollege/2x1.college.currentstudents.jpg",
        imageAlt: "Current NewSpring Leadership College Students",
        label: "31",
        value: "Current Students",
        copy: "current students",
      },
      {
        image1x1:
          "//s3.amazonaws.com/ns.assets/apollos/annual+report/2017/NSCollege/1x1.college.graduated.jpg",
        image2x1:
          "//s3.amazonaws.com/ns.assets/apollos/annual+report/2017/NSCollege/2x1.college.graduated.jpg",
        imageAlt: "NewSpring Leadership College Graduates",
        label: "53",
        value: "CollegeGraduates",
        copy: "students have graduated from NSLC",
      },
      {
        image1x1:
          "//s3.amazonaws.com/ns.assets/apollos/annual+report/2017/NSCollege/1x1.college.workingministry.jpg",
        image2x1:
          "//s3.amazonaws.com/ns.assets/apollos/annual+report/2017/NSCollege/2x1.college.workingministry.jpg",
        imageAlt: "NSLC Grads placed in ministry",
        label: "16",
        value: "GradsInMinistry",
        copy: "graduates working in ministry",
      },
    ],
  },
};

/* eslint-disable max-len */
const NewSpringLeadershipCollege = () => (
  <div className="text-center background--light-primary soft-double-top@lap-and-up soft-top text-dark-primary">
    <div className="constrain-page soft-double-top soft-sides@lap soft-sides@handheld">
      <div className="grid">
        <div className="grid__item one-whole push-double-bottom">
          <div className="constrain-copy">
            <h1 className="uppercase push-bottom">
              NewSpring Leadership College
            </h1>
            <p className="text-center" style={{ fontFamily: "colfax-web" }}>
              <a
                href={"https://newspringcollege.com"}
                alt={"NewSpring Leadership College link"}
              >
                NewSpring Leadership College
              </a>{" "}
              is a two-year program to raise up passionate leaders for the local
              church. At NewSpring Leadership College, students receive
              practical Bible teaching and leadership training as well as real
              ministry responsibility and experience.
            </p>
          </div>
        </div>
        <div className="grid__item one-whole text-center soft-bottom@lap-and-up push-bottom@handheld">
          <div className="constrain-copy">
            <h3 className="italic text-primary">
              <strong>
                Helping raise up leaders to change their communities
              </strong>
            </h3>
          </div>
          <div id="college" className="soft-half-sides@lap">
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
                      <FitText compressor={0.3} maxFontSize="100">
                        <h1 className="" style={{ fontWeight: "900" }}>
                          {item.label}
                        </h1>
                      </FitText>
                      <h3 className="flush">{item.copy}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid__item one-whole text-center soft-bottom@lap-and-up">
          <Story
            overriddenHeader={
              "Kellen Young graduated from the third year of NewSpring Leadership College in 2017 and took a role as a full-time student pastor."
            }
            image={
              "//s3.amazonaws.com/ns.assets/apollos/annual+report/2017/stories/KELLEN_hero_2_1.jpg"
            }
            content={`
              <p style="font-family: colfax-web">“If you want to learn practical, hands-on ministry, NewSpring College is the place to go.”</p>
              `}
            linkUrl="http://newspring.cc/stories/kellen-young"
            linkClass={`h6 btn--small@next soft-sides@portable btn--dark-secondary`}
            linkText={"Read the story"}
          />
        </div>
      </div>
    </div>
  </div>
);
/* eslint-enable max-len */

export default NewSpringLeadershipCollege;
