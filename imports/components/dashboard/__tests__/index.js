import { mount, shallow } from "enzyme";
import { mountToJson, shallowToJson } from "enzyme-to-json";
import { Dashboard } from "../";
import Activity from "../../cards/cards.Activity";

describe("Dashboard", () => {

  const defaultProps = {
    title: "Your Giving",
    subNav: [
      {
        isActive: true,
        linkUrl: "https://my.newspring.cc/give",
        onClick: () => {},
        title: "Home",
      },
      {
        isActive: false,
        linkUrl: "https://my.newspring.cc/give/now",
        onClick: () => {},
        title: "Give Now",
      },
      {
        isActive: false,
        linkUrl: "https://my.newspring.cc/give/history",
        onClick: () => {},
        title: "History",
      },
    ],
  };

  const generateComponent = (additionalProps = {}) => {
    return (
      <Dashboard {...defaultProps} {...additionalProps} />
    );
  };

  it("should render with the default set of props", () => {
    const component = shallow(generateComponent());
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it("should render with the children", () => {
    const component = shallow(
      <Dashboard {...defaultProps}>
        <Activity
          status="success"
          date="2016-12-25"
          message="Yay! This is so great for you!"
          linkText="You KNOW You Want To Click This"
          linkUrl="https://my.newspring.cc"
        />
      </Dashboard>
    );
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});
