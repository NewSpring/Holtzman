
import FitText from "../../components/fit-text";
import CardSlider from "../../../../components/@primitives/UI/card-slider";
import { MetricCard } from "../../../../components/@primitives/UI/cards";

const data = {
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
};

/* eslint-disable max-len */
const NewSpringAverages = () => (
  <div className="background--light-secondary text-dark-primary soft-double-ends push-ends@lap-and-up soft-ends text-center">
    <div className="constrain-page push-top soft-sides@handheld">
      <div className="one-whole">
        <h3
          className="push-half-bottom"
        >
          Average Weekly Attendance
        </h3>

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
          <MetricCard
            key={i}
            count={campus.average}
            label={campus.name}
          />
        ))}
      </CardSlider>
    </div>
  </div>
);
/* eslint-enable max-len */

export default NewSpringAverages;
