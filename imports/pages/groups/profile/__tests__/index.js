import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { Meteor } from "meteor/meteor";
import { modal } from "../../../../data/store";
import OnBoard from "../../../../components/people/accounts";
import { TemplateWithoutData as Template, JoinWithPhones } from "../";

jest.mock("../../../../deprecated/mixins/mixins.Header", () => {});
jest.mock("../../../../data/store", () => ({
  nav: {
    setLevel: jest.fn(),
  },
  modal: {
    update: jest.fn(),
    hide: jest.fn(),
    render: jest.fn(),
  },
}));

const defaultProps = {
  dispatch: jest.fn(),
  data: {
    loading: false,
    group: {
      entityId: "1",
      locations: [
        {
          location: {
            latitude: 2,
            longitude: 2,
          },
        },
      ],
      members: [
        { role: "default" },
        { role: "leader" },
      ],
      photo: "http://test.com/test.jpg",
    },
    person: {},
  },
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Template { ...newProps } />;
};

window.matchMedia = jest.fn().mockReturnValue({
  matches: false,
});

Meteor.isServer = false;
Meteor.settings.public.rock.baseURL = "http://rock.rock";

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders loading", () => {
  const wrapper = shallow(generateComponent({
    data: {
      loading: true,
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders without map on mobile", () => {
  const mockMatchMedia = jest.fn().mockReturnValue({
    matches: true,
  });
  window.matchMedia = mockMatchMedia;
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
  expect(mockMatchMedia).toHaveBeenCalledTimes(1);
  expect(mockMatchMedia).toHaveBeenCalledWith("(max-width: 768px)");
});

it("renders without map on server", () => {
  Meteor.isServer = true;
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
  Meteor.isServer = false;
});

it("updates modal on unmount", () => {
  const mockDispatch = jest.fn();
  modal.update = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  wrapper.unmount();
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(modal.update).toHaveBeenCalledTimes(1);
  expect(modal.update).toHaveBeenCalledWith({ onFinished: null});
});

it("closeModal calls preventDefault, hides modal, and adjust nav", () => {
  const mockPreventDefault = jest.fn();
  const mockDispatch = jest.fn();
  modal.hide = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  wrapper.instance().closeModal({
    preventDefault: mockPreventDefault,
  });
  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(modal.hide).toHaveBeenCalledTimes(1);
});

it("sendRequest calls preventDefault and the join meteor method", () => {
  const mockPreventDefault = jest.fn();
  const mockQuerySelectorAll = jest.fn().mockReturnValue([
    { value: "test\n" },
  ]);
  const mockCurrentTarget = {
    querySelectorAll: mockQuerySelectorAll,
  };
  Meteor.call = jest.fn();
  const wrapper = shallow(generateComponent());
  wrapper.instance().sendRequest({
    preventDefault: mockPreventDefault,
    currentTarget: mockCurrentTarget,
  });

  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  expect(mockQuerySelectorAll).toHaveBeenCalledTimes(1);
  expect(mockQuerySelectorAll).toHaveBeenCalledWith("textarea");
  expect(Meteor.call).toHaveBeenCalledTimes(1);
  expect(Meteor.call.mock.calls[0][0]).toBe("community/actions/join");
  expect(Meteor.call.mock.calls[0][1]).toBe(defaultProps.data.group.entityId);
  expect(Meteor.call.mock.calls[0][2]).toBe("test<br/>");
});

it("join renders Join modal if user", () => {
  const mockDispatch = jest.fn();
  Meteor.userId = jest.fn().mockReturnValue(true);
  modal.render = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  wrapper.instance().join();
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(modal.render).toHaveBeenCalledTimes(1);
  expect(modal.render.mock.calls[0][0]).toBe(JoinWithPhones);
  expect(modal.render.mock.calls[0][1]).toEqual({
    group: defaultProps.data.group,
    onExit: wrapper.instance().closeModal,
    onClick: wrapper.instance().sendRequest,
  });
});

it("join renders OnBoard modal if no user", () => {
  const mockDispatch = jest.fn();
  Meteor.userId = jest.fn().mockReturnValue(false);
  modal.render = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  const result = wrapper.instance().join();
  expect(result).toBe(null);
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(modal.render).toHaveBeenCalledTimes(1);
  expect(modal.render.mock.calls[0][0]).toBe(OnBoard);
  expect(modal.render.mock.calls[0][1].coverHeader).toBe(true);
});
