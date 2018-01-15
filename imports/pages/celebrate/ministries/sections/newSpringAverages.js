import FitText from "../../components/fit-text";
import CardSlider from "../../../../components/@primitives/UI/card-slider";
import MetricCard from "../../components/metricCard";

const data = {
  attendance: {
    average: "20,563",
    campuses: [
      { name: "Aiken", average: "327" },
      { name: "Anderson", average: "4,437" },
      { name: "Charleston", average: "1,748" },
      { name: "Clemson", average: "1,284" },
      { name: "Columbia", average: "2,316" },
      { name: "Florence", average: "1,385" },
      { name: "Greenville", average: "2,335" },
      { name: "Greenwood", average: "1,032" },
      { name: "Hilton Head", average: "174" },
      { name: "Myrtle Beach", average: "1,435" },
      { name: "Northeast Columbia", average: "234" },
      { name: "Powdersville", average: "1,358" },
      { name: "Rock Hill", average: "227" },
      { name: "Spartanburg", average: "2,097" },
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
