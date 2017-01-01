import { mount, shallow } from "enzyme";
import { mountToJson, shallowToJson } from "enzyme-to-json";
import moment from "moment";
import Activity from "../ActivityCard";

describe("Activity", () => {

  const generateComponent = (additionalProps = {}) => {
    const defaultProps = {
      status: "success",
      date: moment("2016-12-25"),
      message: "You did something awesome and I've never been more proud.",
      linkText: "Click This Link",
      linkUrl: "https://my.newspring.cc/give/now",
    };

    return (
      <Activity {...defaultProps} {...additionalProps} />
    );
  };

  it("should render with the default set of props", () => {
    const component = shallow(generateComponent());
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it("should accept a react component as message prop", () => {
    const message = <p>hello world</p>
    const component = shallow(generateComponent({message: message}));
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it("should render the warning status component", () => {
    const component = shallow(generateComponent({ status: "warning" }));
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it("should render the failed status component", () => {
    const component = shallow(generateComponent({ status: "failed" }));
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});
