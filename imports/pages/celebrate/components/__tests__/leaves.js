import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import {
  OutlinedLeaf,
  SolidLeaf,
  StripedLeaf,
  Logo,
  Leaf,
} from "../leaves";

const leafProps = {
  size: 20,
  color: "green",
  type: "type",
  style: {
    backgroundColor: "red",
  },
  className: "test",
};

describe("OutlinedLeaf", () => {
  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...leafProps,
      ...additionalProps,
    };
    return <OutlinedLeaf { ...newProps } />;
  };

  it("renders with props", () => {
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe("SolidLeaf", () => {
  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...leafProps,
      ...additionalProps,
    };
    return <SolidLeaf { ...newProps } />;
  };

  it("renders with props", () => {
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe("StripedLeaf", () => {
  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...leafProps,
      ...additionalProps,
    };
    return <StripedLeaf { ...newProps } />;
  };

  it("renders with props", () => {
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe("Logo", () => {
  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...leafProps,
      ...additionalProps,
    };
    return <Logo { ...newProps } />;
  };

  it("renders with props", () => {
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe("Leaf", () => {
  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...leafProps,
      ...additionalProps,
    };
    return <Leaf { ...newProps } />;
  };

  it("renders with props", () => {
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("adds color style to text styles", () => {
    const wrapper = shallow(generateComponent({
      style: {
        color: "red",
      },
    }));
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
