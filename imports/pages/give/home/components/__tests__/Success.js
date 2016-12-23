import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Success, { ContactLink, ContactUs } from "../Success";

describe("Success", () => {
  const defaultProps = {
    type: "update",
    onClick: jest.fn(),
  };

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return <Success { ...newProps }/>
  };

  it("renders with default props", () => {
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("renders with a different type", () => {
    const wrapper = shallow(generateComponent({ type: "ohheckno" }));
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("calls onClick when you click", () => {
    const mockOnClick = jest.fn();
    const wrapper = shallow(generateComponent({
      onClick: mockOnClick,
    }));

    expect(mockOnClick).not.toHaveBeenCalled();
    wrapper.find("button").simulate("click");
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});

describe("ContactLink", () => {
  const generateComponent = () => (
    <ContactLink />
  );

  it("renders", () => {
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  })
});

describe("ContactUs", () => {
  const generateComponent = () => (
    <ContactUs />
  );

  it("renders", () => {
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  })
})