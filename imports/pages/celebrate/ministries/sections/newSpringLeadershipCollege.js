import TagGallery from "../../../../components/@primitives/UI/tag-gallery";

const data = {
  tags: {
    overlay: "rgba(107, 172, 67, 0.9)",
    buttonColor: "#6BAC43",
    tags: [
      {
        image1x1: "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/college/tag1_1x1.jpg",
        image2x1: "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/college/tag1_2x1.jpg",
        imageAlt: "Current NewSpring Leadership College Student",
        label: "45",
        value: "Current Students",
        copy: "current students",
      },
      {
        image1x1: "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/college/tag2_1x1.jpg",
        image2x1: "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/college/tag2_2x1.jpg",
        imageAlt: "NewSpring Leadership College Graduates",
        label: "33",
        value: "CollegeGraduates",
        copy: "students have graduated from NSLC",
      },
      {
        image1x1: "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/college/tag3_1x1.jpg",
        image2x1: "//s3.amazonaws.com/ns.assets/apollos/annual+report/2016/tags/college/tag3_2x1.jpg",
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
  <div className="text-center background--light-primary soft-double-ends@lap-and-up soft-ends">
    <div className="constrain-page soft-double-top soft-sides@lap soft-sides@handheld">
      <div className="grid">
        <div className="grid__item one-whole push-double-bottom">
          <div className="constrain-copy">
            <h1 className="uppercase push-bottom">NewSpring Leadership College</h1>
            <p className="text-left"><a href={"https://newspringcollege.com"} alt={"NewSpring Leadership College link"}>NewSpring Leadership College</a> is a two-year program to raise up passionate leaders for the local church. At NewSpring Leadership College, students receive practical Bible teaching and leadership training as well as real ministry responsibility and experience.</p>
          </div>
        </div>
        <div className="grid__item one-whole text-center soft-bottom@lap-and-up">
          <div className="constrain-copy">
            <h3 className="italic text-primary"><strong>NewSpring Leadership College is raising leaders for the local church.</strong></h3>
          </div>
          <div id="college" className="soft-half-sides@lap">
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
    </div>
  </div>
);
/* eslint-enable max-len */

export default NewSpringLeadershipCollege;
