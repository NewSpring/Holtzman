import { shallow, mount } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { modal as modalActions, nav as navActions } from "../../../../data/store";
import {
  SideModalContainerWithoutData as SideModalContainer,
} from "../";

jest.mock("../../../../data/store", () => ({
  modal: {
    hide: jest.fn(),
  },
  nav: {
    setLevel: jest.fn(),
    resetColor: jest.fn(),
  },
}));

const defaultProps = {
  dispatch: jest.fn(),
  modal: {
    visible: false,
    content: {},
    props: {
      keepNav: false,
      promptModal: false,
    },
  },
  navigation: {
    level: "default",
  },
  path: "/test",
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <SideModalContainer { ...newProps } />;
};

it("render with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("updates nav if not keeping the nav and modal visible", () => {
  const mockDispatch = jest.fn();
  navActions.setLevel = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
    modal: {
      visible: true,
      props: {
        keepNav: false,
        promptModal: false,
      },
    },
  }));
  wrapper.instance().componentDidMount();
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(navActions.setLevel).toHaveBeenCalledTimes(1);
  expect(navActions.setLevel).toHaveBeenCalledWith("MODAL");
});

// it("adds escape listern if client", () => {
//   document.addEventListener = jest.fn();
//   const wrapper = shallow(generateComponent());
//   wrapper.instance().componentDidMount();
//   expect(document.addEventListener).toHaveBeenCalledTimes(1);
//   expect(document.addEventListener).toHaveBeenCalledWith(
//     "keyup",
//     wrapper.instance().bindEsc,
//     false
//   );
// });

it("updates nav and state if visible, not level modal or down, and not keeping nav", () => {
  navActions.setLevel = jest.fn();
  const wrapper = shallow(generateComponent());
  wrapper.setProps({
    modal: {
      visible: true,
      props: {
        keepNav: false,
        promptModal: false,
      },
    },
    navigation: {
      level: "default",
    },
  });
  expect(navActions.setLevel).toHaveBeenCalledTimes(1);
  expect(wrapper.state().previous).toBe("default");
});

it("updates state if visible and level is down", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setProps({
    modal: {
      visible: true,
    },
    navigation: {
      level: "DOWN",
    },
  });
  expect(wrapper.state().previous).toBe("default");
});

it("updates nav if not visible, level is modal, and not keeping nav", () => {
  navActions.setLevel = jest.fn();
  const wrapper = shallow(generateComponent());
  wrapper.setProps({
    modal: {
      visible: false,
    },
    navigation: {
      level: "MODAL",
    },
  });
  expect(navActions.setLevel).toHaveBeenCalledTimes(1);
  expect(navActions.setLevel).toHaveBeenCalledWith("TOP");
});

it("updates nav if not visible, level is down, and not keeping nav", () => {
  navActions.setLevel = jest.fn();
  const wrapper = shallow(generateComponent());
  wrapper.setProps({
    modal: {
      visible: false,
    },
    navigation: {
      level: "DOWN",
    },
  });
  expect(navActions.setLevel).toHaveBeenCalledTimes(1);
  expect(navActions.setLevel).toHaveBeenCalledWith("TOP");
});

it("only overrides previous if modal, down, or null", () => {
  navActions.setLevel = jest.fn();
  const wrapper = shallow(generateComponent());
  wrapper.setState({ previous: "default" });
  wrapper.setProps({
    modal: {
      visible: false,
    },
    navigation: {
      level: "DOWN",
    },
  });
  expect(navActions.setLevel).toHaveBeenCalledTimes(1);
  expect(navActions.setLevel).toHaveBeenCalledWith("default");
});

it("hides modal if not visible and path is not next path", () => {
  modalActions.hide = jest.fn();
  const wrapper = shallow(generateComponent());
  wrapper.setProps({
    modal: {
      visible: false,
    },
    path: "/nottest",
  });
  expect(modalActions.hide).toHaveBeenCalledTimes(1);
});

it("removes modal class from root if not visible", () => {
  document.documentElement.className = "one two modal--opened";
  const wrapper = shallow(generateComponent());
  wrapper.instance().componentWillUpdate({
    modal: {
      visible: false,
    },
  });
  expect(document.documentElement.className).toBe("one two");
});

it("adds modal class to root if visible", () => {
  document.documentElement.className = "one two";
  const wrapper = shallow(generateComponent());
  wrapper.instance().componentWillUpdate({
    modal: {
      visible: true,
    },
  });
  expect(document.documentElement.className).toBe("one two modal--opened");
});

it("removes key bind and resets color on unmount", () => {
  document.removeEventListener = jest.fn();
  navActions.resetColor = jest.fn();
  const wrapper = shallow(generateComponent());
  wrapper.instance().componentWillUnmount();
  expect(document.removeEventListener).toHaveBeenCalledTimes(1);
  expect(document.removeEventListener).toHaveBeenCalledWith(
    "keyup",
    wrapper.instance().bindEsc,
    false
  );
  expect(navActions.resetColor).toHaveBeenCalledTimes(1);
});

it("close hides the modal if modal is the target", () => {
  modalActions.hide = jest.fn();
  const wrapper = shallow(generateComponent());
  const mockEvent = {
    target: {
      id: "@@modal",
    },
  };
  wrapper.instance().close(mockEvent);
  expect(modalActions.hide).toHaveBeenCalledTimes(1);
});

it("close does not hide the modal if modal is not the target", () => {
  modalActions.hide = jest.fn();
  const wrapper = shallow(generateComponent());
  const mockEvent = {
    target: {
      id: "notmodal",
    },
  };
  wrapper.instance().close(mockEvent);
  expect(modalActions.hide).not.toHaveBeenCalled();
});

it("handles esc key to dispatch closing the modal", () => {
  Meteor.isClient = true;
  const mockDispatch = jest.fn();

  const wrapper = mount(generateComponent({
    dispatch: mockDispatch,
  }));

  const esc =  new CustomEvent("keydown");
  esc.keyCode = 27;

  document.dispatchEvent(esc);
  expect(mockDispatch).toBeCalledWith(modalActions.hide());
});

it("handles esc key to dispatch closing the modal", () => {
  const mockDispatch = jest.fn();
  const wrapper = mount(generateComponent({
    dispatch: mockDispatch,
  }));

  const { handleKeyPress } = wrapper.instance();

  handleKeyPress({ keyCode: 27 });
   expect(mockDispatch).toBeCalledWith(modalActions.hide());
});

it("handles down key to scroll within the component", () => {
  const scrollElement = { scrollTop: 0 };

  const wrapper = shallow(generateComponent());

  const { handleKeyPress, captureRef } = wrapper.instance();
  captureRef(scrollElement);

  handleKeyPress({ keyCode: 40 });
  expect(scrollElement.scrollTop).toBe(10);
});

it("handles down key to scroll within the component", () => {
  const scrollElement = { scrollTop: 0 };

  const wrapper = shallow(generateComponent());

  const { handleKeyPress, captureRef } = wrapper.instance();
  captureRef(scrollElement);

  handleKeyPress({ keyCode: 38 });
  expect(scrollElement.scrollTop).toBe(-10);
});
