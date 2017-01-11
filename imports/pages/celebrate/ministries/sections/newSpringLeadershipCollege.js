import TagGallery from "../../../../components/@primitives/UI/tag-gallery";

const data = {
  tags: {
    overlay: "rgba(107, 172, 67, 0.9)",
    buttonColor: "#6BAC43",
    disabledColor: "#F7F7F7",
    tags: [
      {
        image1x1: "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/college/tag1_1x1.jpg",
        image2x1: "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/college/tag1_2x1.jpg",
        imageAlt: "First Timers at NewSpring",
        label: "6,200",
        value: "FirstTime",
        copy: "current students",
      },
      {
        image1x1: "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/college/tag2_1x1.jpg",
        image2x1: "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/college/tag2_2x1.jpg",
        imageAlt: "First Timers at NewSpring",
        label: "2,315",
        value: "SomethingCool",
        copy: "students did something cool",
      },
      {
        image1x1: "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/college/tag3_1x1.jpg",
        image2x1: "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/college/tag3_2x1.jpg",
        imageAlt: "First Timers at NewSpring",
        label: "4,021",
        value: "Stats",
        copy: "students don't care about statistics",
      },
    ],
  },
};

/* eslint-disable max-len */
const NewSpringLeadershipCollege = () => (
  <div className="text-center background--light-primary soft-double-ends">
    <div className="constrain-page soft-double-top push-double-top@lap-and-up soft-sides@handheld">
      <div className="grid">
        <div className="grid__item one-whole push-double-bottom">
          <div className="constrain-copy">
            <h1 className="uppercase push-bottom">NewSpring Leadership College</h1>
            <p className="text-left">NewSpring Leadership College is a two-year program to raise up passionate leaders for the local church. At NewSpring Leadership College, students receive practical Bible teaching and leadership training as well as real ministry responsibility and experience.</p>
          </div>
        </div>
        <div className="grid__item one-whole text-center">
          <h3 className="italic text-primary"><strong>Helping raise up leaders to change their communities</strong></h3>
        </div>
      </div>
    </div>

    <div className="soft-double-top@lap-and-up">
      <h3 className="italic text-primary"><strong>Helping raise up leaders to change their communities</strong></h3>
      <div id="college">
        <TagGallery
          id={"college"}
          buttonColor={data.tags.buttonColor}
          disabledColor={data.tags.disabledColor}
          overlay={data.tags.overlay}
          tags={data.tags.tags}
        />
      </div>
    </div>
  </div>
);
/* eslint-enable max-len */

export default NewSpringLeadershipCollege;
