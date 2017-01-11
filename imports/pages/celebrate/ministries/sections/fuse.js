
// import {
//   Body,
// } from "../../../../components/layout";

import FitText from "../../components/fit-text";
import CardSlider from "../../../../components/@primitives/UI/card-slider";
import { MetricCard } from "../../../../components/@primitives/UI/cards";
// import List from "../../../../components/list";

const data = {
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
};

/* eslint-disable max-len */
const Fuse = () => (
  <div>
    <div className="text-center one-whole background--light-tertiary soft soft-double@lap-and-up">
      <div className="soft-double@lap-and-up">

        <div className="one-whole text-center text--light-primary push-bottom">
          <h1 className="uppercase" style={{ color: "#4F92A9" }}>Fuse</h1>
          <p className="constrain-copy">Fuse is NewSpring&#39;s student ministry. Fuse is a place where middle and high school students can have fun while connecting to Jesus and to each other.</p>
        </div>

        <div className="one-whole text-center text-light-primary">
          <h3
            className="push-half-bottom"
            style={{ color: "#4F92A9" }}
          >
            Average Weekly Attendance
          </h3>

          <FitText compressor={1.1}>
            <h1
              className="flush-bottom soft-half-bottom soft-double-top"
              style={{
                fontWeight: 900,
                color: "#4F92A9",
              }}
            >
              {data.attendance.average}
            </h1>
          </FitText>
        </div>

        <div className="one-whole" style={{ color: "#4F92A9" }}>
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

      <div className="soft-double-top@lap-and-up">
        <h3 className="italic" style={{ color: "#4F92A9" }}><strong>Every number is a student life changed</strong></h3>


      </div>
    </div>
    <div className="grid text-center">
      <div className="grid__item">
        <h3 className="italic" style={{ color: "#4F92A9" }}><strong>This year we saw</strong></h3>
        <FitText compressor={1.1}>
          <h1
            className="flush-bottom soft-half-bottom soft-double-top"
            style={{
              fontWeight: 900,
              color: "#4F92A9",
            }}
          >
            {data.attendance.average}
          </h1>
        </FitText>
        <div className="constrain-text">
          <h3 style={{ color: "#4F92A9" }}>Students cross from death to life at Fuse</h3>
        </div>
      </div>
    </div>

    <div className="grid text-center text-light-primary" style={{ backgroundColor: "#4F92A9" }}>
      <div className="grid__item">
        <h3 className="italic"><strong>This year at</strong></h3>
        <h2>Gauntlet</h2>
      </div>
      <div className="grid__item" style={{ color: "#4F92A9" }}>
        <CardSlider>
          {data.gauntlet.map((stat, i) => (
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
