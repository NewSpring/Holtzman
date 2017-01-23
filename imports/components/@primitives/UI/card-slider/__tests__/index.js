import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";

import { CardSliderWithoutData as CardSlider } from "../";
import MetricCard from "../../cards/MetricCard";

describe("CardSlider", () => {
  const defaultProps = {
    cardData: [
      { count: "11,130", label: "Total Salvations" },
      { count: "3,982", label: "Student Salvations at Fuse and Gauntlet" },
    ],
  };

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return (
      <CardSlider>
        {defaultProps.cardData.map(({ count, label }, key) => {
          return <MetricCard count={count} label={label} key={key} />
        })}
      </CardSlider>
    )
  };

  it("should render with default props", () => {
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

});
