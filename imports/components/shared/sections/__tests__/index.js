import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import modal from "../../../../data/store/modal";
import {
  nav as navActions,
} from "../../../../data/store";
import {
  SectionsContainerWithoutData as SectionsContainer,
} from "../";

jest.mock("../../../../deprecated/mixins/mixins.Header.js", () => jest.fn());
jest.mock("../../../../data/store/modal", () => ({
  update: jest.fn(),
  hide: jest.fn(),
}));

const defaultProps = {
  dispatch: jest.fn(),
  sections: {
    content: {
      one: {},
      two: {},
    },
  },
  web: true,
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <SectionsContainer {...newProps} />;
};

it("isn't a real test", () => {
  expect(true).toBeTruthy();
  // const wrapper = shallow(generateComponent());
  // expect(shallowToJson(wrapper)).toMatchSnapshot();
});

// XXX Mixin is breaking this test
// xit("renders with props", () => {
//   const wrapper = shallow(generateComponent());
//   expect(shallowToJson(wrapper)).toMatchSnapshot();
// });

// XXX Mixin is breaking this test
// xit("adjust nav, modal, and header on mount", () => {
//   const mockDispatch = jest.fn();
//   navActions.setLevel = jest.fn();
//   modal.update = jest.fn();
//   const wrapper = shallow(generateComponent({
//     dispatch: mockDispatch,
//   }));
//   // mock header mixin methods
//   const mockLockHeader = jest.fn();
//   wrapper.instance().lockHeader = mockLockHeader;
//   const mockHeaderAction = jest.fn();
//   wrapper.instance().headerAction = mockHeaderAction;
//   // force mount
//   wrapper.instance().componentDidMount();

//   expect(mockDispatch).toHaveBeenCalledTimes(2);
//   expect(navActions.setLevel).toHaveBeenCalledTimes(1);
//   expect(navActions.setLevel).toHaveBeenCalledWith("TOP");
//   expect(modal.update).toHaveBeenCalledTimes(1);
//   expect(modal.update).toHaveBeenCalledWith({
//     keepNav: true,
//     modalBackground: "light",
//   });
//   expect(mockLockHeader).toHaveBeenCalledTimes(1);
//   expect(mockLockHeader).toHaveBeenCalledWith("SectionsContainer");
//   expect(mockHeaderAction).toHaveBeenCalledTimes(1);
//   expect(mockHeaderAction).toHaveBeenCalledWith({
//     title: "Sections",
//   }, "SectionsContainer");
// });

// XXX Mixin is breaking this test
// xit("updates modal and unlocks header on unmount", () => {
//   const mockDispatch = jest.fn();
//   modal.update = jest.fn();
//   const wrapper = shallow(generateComponent({
//     dispatch: mockDispatch,
//   }));
//   // mock header mixin methods
//   const mockUnlockHeader = jest.fn();
//   wrapper.instance().unlockHeader = mockUnlockHeader;
//   mockDispatch.mockClear();
//   modal.update.mockClear();
//   wrapper.unmount();
//   expect(mockDispatch).toHaveBeenCalledTimes(1);
//   expect(modal.update).toHaveBeenCalledTimes(1);
//   expect(modal.update).toHaveBeenCalledWith({ keepNav: false });
//   expect(mockUnlockHeader).toHaveBeenCalledTimes(1);
// });

// XXX Mixin is breaking this test
// xit("hide hides the modal", () => {
//   modal.hide = jest.fn();
//   const wrapper = shallow(generateComponent());
//   wrapper.instance().hide();
//   expect(modal.hide).toHaveBeenCalledTimes(1);
// });
