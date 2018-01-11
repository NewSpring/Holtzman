import FitText from "../../components/fit-text";
import CardSlider from "../../../../components/@primitives/UI/card-slider";
import MetricCard from "../../components/metricCard";

const data = {
  attendance: {
    average: "29,156",
    campuses: [
      { name: "Aiken", average: "345" },
      { name: "Anderson", average: "6,401" },
      { name: "Boiling Springs", average: "875" },
      { name: "Charleston", average: "2,449" },
      { name: "Clemson", average: "646" },
      { name: "Columbia", average: "3,166" },
      { name: "Florence", average: "2,096" },
      { name: "Greenville", average: "3,800" },
      { name: "Greenwood", average: "1,560" },
      { name: "Hilton Head", average: "158" },
      { name: "Myrtle Beach", average: "2,046" },
      { name: "Northeast Columbia", average: "308" },
      { name: "Powdersville", average: "1,446" },
      { name: "Rock Hill", average: "291" },
      { name: "Spartanburg", average: "2,612" },
      { name: "Sumter", average: "269" },
    ],
  },
};

/* eslint-disable max-len */
const NewSpringAverages = () => (
  <div className="background--light-secondary text-dark-primary soft-double-ends push-ends@lap-and-up soft-ends text-center">
    <div className="constrain-page push-top soft-sides@handheld">
      <div className="one-whole">
        <h3 className="push-half-bottom">Average Weekly Attendance</h3>

        <FitText compressor={0.6} maxFontSize="100">
          <h1
            style={{
              fontWeight: 900,
            }}
          >
            {data.attendance.average}
          </h1>
        </FitText>
      </div>
    </div>

    <div className="push-bottom@lap-and-up">
      <CardSlider>
        {data.attendance.campuses.map((campus, i) => (
          <MetricCard key={i} count={campus.average} label={campus.name} />
        ))}
      </CardSlider>
    </div>
  </div>
);
/* eslint-enable max-len */

export default NewSpringAverages;
