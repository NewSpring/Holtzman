import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { serverWatch } from "meteor/bjwiley2:server-watch";
import {
  PageWithoutData as Page,
  IsAlive,
} from "../";

describe("Page", () => {
  const defaultProps = {
    dispatch: jest.fn(),
  };

  const generateComponent = () => (
    <Page { ...defaultProps } />
  );

  it("renders with props", () => {
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe("TemplateWithData", () => {
  it("returns true from serverWatch", () => {
    serverWatch.isAlive = jest.fn(() => false);
    const result = IsAlive();
    expect(result).toEqual({
      alive: false,
    });
  });

  it("returns false from serverWatch", () => {
    serverWatch.isAlive = jest.fn(() => true);
    const result = IsAlive();
    expect(result).toEqual({
      alive: true,
    });
  });

  it("catches errros from serverWatch", () => {
    serverWatch.isAlive = jest.fn(() => { throw "Error" });
    const result = IsAlive();
    expect(result).toEqual({
      alive: true,
    });
  });
});
