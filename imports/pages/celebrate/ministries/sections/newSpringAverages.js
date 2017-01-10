
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
  <div className="text-center one-whole ">
    <div className="background--light-secondary soft-double-top@lap-and-up" style={{ overflow: "visible" }}>

      <div className="one-whole text-center">
        <h3
          className="text-dark-primary"
        >
          Average Weekly Attendance
        </h3>

        <FitText compressor={1.1}>
          <h1
            className="flush-bottom soft-half-bottom soft-double-top text-dark-primary"
            style={{
              fontWeight: 900,
            }}
          >
            {data.attendance.average}
          </h1>
        </FitText>
      </div>

      <div className="one-whole text-dark-primary">
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
  </div>
);
/* eslint-enable max-len */

export default NewSpringAverages;
