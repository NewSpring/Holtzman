import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { Meteor } from "meteor/meteor";
import {
  MenuWithoutData as Menu,
  RenderCell,
  GET_PHOTO_QUERY,
} from "../";
import {
  nav as navActions,
} from "../../../../../data/store";

jest.mock("../../../../../deprecated/mixins/mixins.Header", () => {});
jest.mock("../../../../../data/store", () => ({
  nav: {
    setLevel: jest.fn(),
  },
}));

describe("RenderCell", () => {
  const defaultProps = {
    name: "test",
    iconFunc: jest.fn().mockReturnValue("my-cool-icon"),
    last: false,
  };

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return (
      <RenderCell { ...newProps }>
        <h1>test</h1>
      </RenderCell>
    );
  };

  it("renders with props", () => {
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("renders default icon", () => {
    const wrapper = shallow(generateComponent({
      iconFunc: null,
    }));
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe("Menu", () => {
  const defaultProps = {
    dispatch: jest.fn(),
    data: {
      refetch: jest.fn(),
    },
    upload: jest.fn(),
  };

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return <Menu { ...newProps } />;
  };

  it("renders with props", () => {
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("parses query", () => {
    expect(GET_PHOTO_QUERY).toMatchSnapshot();
  });

  it("updates nav on mount", () => {
    const mockDispatch = jest.fn();
    navActions.setLevel = jest.fn();
    const wrapper = shallow(generateComponent({
      dispatch: mockDispatch,
    }));
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(navActions.setLevel).toHaveBeenCalledTimes(1);
    expect(navActions.setLevel).toHaveBeenCalledWith("TOP");
  });

  it("signout calls prevent default and logout", () => {
    const mockPreventDefault = jest.fn();
    Meteor.logout = jest.fn();
    const wrapper = shallow(generateComponent());
    wrapper.instance().signout({
      preventDefault: mockPreventDefault,
    });
    expect(mockPreventDefault).toHaveBeenCalledTimes(1);
    expect(Meteor.logout).toHaveBeenCalledTimes(1);
  });

  it("upload changes state and calls upload", () => {
    jest.useFakeTimers();
    const mockUpload = jest.fn().mockReturnValue(new Promise(p => p()));
    const mockRefetch = jest.fn();
    const wrapper = shallow(generateComponent({
      data: {
        refetch: mockRefetch,
      },
      upload: mockUpload,
    }));
    wrapper.instance().upload("e", "upload", "opts");
    expect(mockUpload).toHaveBeenCalledTimes(1);
    expect(mockUpload).toHaveBeenCalledWith("e", "opts");
    expect(wrapper.state().upload).toBe("loading");
    mockUpload()
      .then(() => {
        expect(wrapper.state().upload).toBe("uploaded");
        expect(mockRefetch).toHaveBeenCalledTimes(1);
        jest.runAllTimers();
        expect(wrapper.state().upload).toBe("default");
      });
  });

  it("upload changes state to failed if upload fails", () => {
    jest.useFakeTimers();
    const mockUpload = jest.fn().mockReturnValue(new Promise((p,r) => r()));
    const mockRefetch = jest.fn();
    const wrapper = shallow(generateComponent({
      data: {
        refetch: mockRefetch,
      },
      upload: mockUpload,
    }));
    wrapper.instance().upload("e", "upload", "opts");
    expect(mockUpload).toHaveBeenCalledTimes(1);
    expect(mockUpload).toHaveBeenCalledWith("e", "opts");
    expect(wrapper.state().upload).toBe("loading");
    mockUpload()
      .then(() => {
        expect(wrapper.state().upload).toBe("failed");
        expect(mockRefetch).toHaveBeenCalledTimes(0);
        jest.runAllTimers();
        expect(wrapper.state().upload).toBe("default");
      });
  });

  it("uploadIcon returns `icon-arrow-next` for default", () => {
    const wrapper = shallow(generateComponent());
    wrapper.setState({ upload: "default" });
    const result = wrapper.instance().uploadIcon();
    expect(result).toBe("icon-arrow-next");
  });

  it("uploadIcon returns `icon-leaf-outline` for loading", () => {
    const wrapper = shallow(generateComponent());
    wrapper.setState({ upload: "loading" });
    const result = wrapper.instance().uploadIcon();
    expect(result).toBe("icon-leaf-outline");
  });

  it("uploadIcon returns `icon-check-mark text-primary` for uploaded", () => {
    const wrapper = shallow(generateComponent());
    wrapper.setState({ upload: "uploaded" });
    const result = wrapper.instance().uploadIcon();
    expect(result).toBe("icon-check-mark text-primary");
  });

  it("uploadIcon returns `icon-close text-alert` for failed", () => {
    const wrapper = shallow(generateComponent());
    wrapper.setState({ upload: "failed" });
    const result = wrapper.instance().uploadIcon();
    expect(result).toBe("icon-close text-alert");
  });

  it("uploadIcon returns `null` for other states", () => {
    const wrapper = shallow(generateComponent());
    wrapper.setState({ upload: "other" });
    const result = wrapper.instance().uploadIcon();
    expect(result).toBe(null);
  });

  it("captureIcon returns `icon-arrow-next` for default", () => {
    const wrapper = shallow(generateComponent());
    wrapper.setState({ capture: "default" });
    const result = wrapper.instance().captureIcon();
    expect(result).toBe("icon-arrow-next");
  });

  it("captureIcon returns `icon-leaf-outline` for loading", () => {
    const wrapper = shallow(generateComponent());
    wrapper.setState({ capture: "loading" });
    const result = wrapper.instance().captureIcon();
    expect(result).toBe("icon-leaf-outline");
  });

  it("captureIcon returns `icon-check-mark text-primary` for uploaded", () => {
    const wrapper = shallow(generateComponent());
    wrapper.setState({ capture: "uploaded" });
    const result = wrapper.instance().captureIcon();
    expect(result).toBe("icon-check-mark text-primary");
  });

  it("captureIcon returns `icon-close text-alert` for failed", () => {
    const wrapper = shallow(generateComponent());
    wrapper.setState({ capture: "failed" });
    const result = wrapper.instance().captureIcon();
    expect(result).toBe("icon-close text-alert");
  });

  it("captureIcon returns `null` for other states", () => {
    const wrapper = shallow(generateComponent());
    wrapper.setState({ capture: "other" });
    const result = wrapper.instance().captureIcon();
    expect(result).toBe(null);
  });

  it("sectionClasses returns blank string when not native", () => {
    const wrapper = shallow(generateComponent());
    const result = wrapper.instance().sectionClasses();
    expect(result).toBe("");
  });

  // it("showFeedback returns null when not native", () => {
  //   const wrapper = shallow(generateComponent());
  //   const result = wrapper.instance().showFeedback();
  //   expect(result).toBe(null);
  // });

  // it("giveFeedback does not call hockeyapp when not native", () => {
  //   const mockFeedback = jest.fn();
  //   global.hockeyapp = {
  //     feedback: mockFeedback,
  //   };
  //   const wrapper = shallow(generateComponent());
  //   const result = wrapper.instance().giveFeedback();
  //   expect(mockFeedback).not.toHaveBeenCalled();
  // });

  it("dividerClasses return web classes", () => {
    const wrapper = shallow(generateComponent());
    const result = wrapper.instance().dividerClasses();
    expect(result).toMatchSnapshot();
  });

  it("outlineClasses returns blank string when not native", () => {
    const wrapper = shallow(generateComponent());
    const result = wrapper.instance().outlineClasses();
    expect(result).toBe("");
  });
});
