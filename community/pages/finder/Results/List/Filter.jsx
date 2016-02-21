import { PropTypes } from "react"

import { Forms } from "../../../../../core/components"

let days = [
  { label: "Monday", value: 1},
  { label: "Tuesday", value: 2},
  { label: "Wednesday", value: 3},
  { label: "Thursday", value: 4},
  { label: "Friday", value: 5},
  { label: "Saturday", value: 6},
  { label: "Sunday", value: 7},
]

const Filter = ({ topics, filter }) => (
  <section className="background--light-primary soft-double@lap-and-up soft-double-top">
    <div className="grid">
      <div className="grid__item one-half@lap-and-up">
        <Forms.Select
          name="topic"
          label="Topic"
          classes={["hard-bottom@lap-and-up"]}
          items={topics}
          includeBlank={true}
          defaultValue={-1}
          onChange={filter}
        />
      </div>
      <div className="grid__item one-half@lap-and-up">
        <Forms.Select
          name="childCare"
          label="Child Care Provided"
          classes={["hard-bottom@lap-and-up"]}
          items={[{value: "1", label: "Yes" },{ value: "0", label: "No" }]}
          defaultValue={true}
          onChange={filter}
        />
      </div>
    </div>

    <div className="grid soft-top">
      {days.map((day, i) => {
        return (
          <div className="grid__item one-half one-quarter@lap-wide-and-up one-third@lap" key={i}>

            <Forms.Checkbox
              name="days"
              id={`days_${day.value}`}
              defaultValue={true}
              value={day.value}
              clicked={filter}
              classes={["hard-bottom@lap-and-up", "push-half-bottom@lap-and-up"]}
            >
              {day.label}
            </Forms.Checkbox>
          </div>
        )

      })}
    </div>

  </section>
)

export default Filter
