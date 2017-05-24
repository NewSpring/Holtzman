import { shallow, mount } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { Meteor } from "meteor/meteor";
import { print } from "graphql-tag/printer";
import { modal } from "../../../../data/store";
import OnBoard from "../../../../components/people/accounts";
import {
  TemplateWithoutData as Template,
  JoinWithPhones,
  PHONE_NUMBER_MUTATION,
  GROUP_MUTATION,
  phonePropsReducer,
  getLeaders,
  isCurrentPersonLeader
} from "../";

jest.mock("../../../../deprecated/mixins/mixins.Header", () => {});
jest.mock("../../../../data/store", () => ({
  nav: {
    setLevel: jest.fn()
  },
  modal: {
    update: jest.fn(),
    hide: jest.fn(),
    render: jest.fn()
  }
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
            longitude: 2
          }
        }
      ],
      members: [
        { role: "default", person: { id: 200 } },
        { role: "leader", person: { id: 100 } }
      ],
      photo: "http://test.com/test.jpg"
    },
    person: { id: 100 }
  }
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps
  };
  return <Template {...newProps} />;
};

window.matchMedia = jest.fn().mockReturnValue({
  matches: false
});

Meteor.isServer = false;
Meteor.settings.public.rock.baseURL = "http://rock.rock";

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders loading", () => {
  const wrapper = shallow(
    generateComponent({
      data: {
        loading: true
      }
    })
  );
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("doesn't dispatch actions if group type is incorrect", () => {
  const mockDispatch = jest.fn();
  const wrapper = shallow(
    generateComponent({
      dispatch: mockDispatch
    })
  );
  wrapper.setProps({ data: { group: { groupType: 25 } } });
  expect(mockDispatch).not.toHaveBeenCalled();
});

it("renders without map on mobile", () => {
  const mockMatchMedia = jest.fn().mockReturnValue({
    matches: true
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
  const wrapper = shallow(
    generateComponent({
      dispatch: mockDispatch
    })
  );
  wrapper.unmount();
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(modal.update).toHaveBeenCalledTimes(1);
  expect(modal.update).toHaveBeenCalledWith({ onFinished: null });
});

it("closeModal calls preventDefault, hides modal, and adjust nav", () => {
  const mockPreventDefault = jest.fn();
  const mockDispatch = jest.fn();
  modal.hide = jest.fn();
  const wrapper = shallow(
    generateComponent({
      dispatch: mockDispatch
    })
  );
  wrapper.instance().closeModal({
    preventDefault: mockPreventDefault
  });
  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(modal.hide).toHaveBeenCalledTimes(1);
});

it("sendRequest calls preventDefault", () => {
  const mockPromiseData = {
    response: {
      success: true,
      code: 200,
      error: false
    }
  };
  const mockPromise = new Promise(p => p(mockPromiseData));
  const mockQuery = jest.fn(() => mockPromise);
  const mockCallback = jest.fn();

  const mockPreventDefault = jest.fn();
  const mockQuerySelectorAll = jest.fn().mockReturnValue([{ value: "test\n" }]);
  const mockCurrentTarget = {
    querySelectorAll: mockQuerySelectorAll
  };
  const wrapper = shallow(
    generateComponent({
      addToGroup: mockQuery
    })
  );
  wrapper.instance().sendRequest(
    {
      preventDefault: mockPreventDefault,
      currentTarget: mockCurrentTarget
    },
    mockCallback
  );
  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  expect(mockQuerySelectorAll).toHaveBeenCalledTimes(1);
  expect(mockQuerySelectorAll).toHaveBeenCalledWith("textarea");
});

it("should reduce phonesLoading prop", () => {
  // loading key is true
  expect(
    phonePropsReducer({
      phoneNumbers: { loading: true }
    }).phonesLoading
  ).toEqual(true);

  // no phone numbers key
  expect(phonePropsReducer({}).phonesLoading).toEqual(true);
});

it("should reduce phones prop", () => {
  // loading key is true,
  expect(
    phonePropsReducer({
      phoneNumbers: {
        loading: true,
        currentPerson: { phoneNumbers: ["yo"] }
      }
    }).phones
  ).toEqual(null);

  //no phone numbers
  expect(
    phonePropsReducer({
      phoneNumbers: {
        loading: false,
        currentPerson: { phoneNumbers: [] }
      }
    }).phones
  ).toEqual(null);

  // no phone numbers key
  expect(phonePropsReducer({}).phones).toEqual(null);
});

it("join renders Join modal if user", () => {
  const mockDispatch = jest.fn();
  Meteor.userId = jest.fn().mockReturnValue(true);
  modal.render = jest.fn();
  const wrapper = shallow(
    generateComponent({
      dispatch: mockDispatch
    })
  );
  wrapper.instance().join();
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(modal.render).toHaveBeenCalledTimes(1);
  expect(modal.render.mock.calls[0][0]).toBe(JoinWithPhones);
  expect(modal.render.mock.calls[0][1]).toEqual({
    group: defaultProps.data.group,
    onExit: wrapper.instance().closeModal,
    onClick: wrapper.instance().sendRequest,
    onChange: wrapper.instance().onPhoneNumberChange,
    validatePhoneNumber: wrapper.instance().validatePhoneNumber,
    onCommunicationPreferenceChange: wrapper.instance()
      .onCommunicationPreferenceChange
  });
});

it("join renders OnBoard modal if no user", () => {
  const mockDispatch = jest.fn();
  Meteor.userId = jest.fn().mockReturnValue(false);
  modal.render = jest.fn();
  const wrapper = shallow(
    generateComponent({
      dispatch: mockDispatch
    })
  );
  const result = wrapper.instance().join();
  expect(result).toBe(null);
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(modal.render).toHaveBeenCalledTimes(1);
  expect(modal.render.mock.calls[0][0]).toBe(OnBoard);
  expect(modal.render.mock.calls[0][1].coverHeader).toBe(true);
});

it("should render manage if member is a leader", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("should render contact if member is a leader", () => {
  const wrapper = shallow(
    generateComponent({
      data: {
        group: {
          members: [
            { role: "default", person: { id: 200 } },
            { role: "leader", person: { id: 500 } }
          ]
        }
      }
    })
  );
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("should filter leaders from member list", () => {
  const { group } = defaultProps.data;
  const leaders = getLeaders(group);
  expect(leaders).toHaveLength(1);
});

it("should determine if current user is a leader", () => {
  const { group, person } = defaultProps.data;
  const leaders = getLeaders(group);
  const isLeader = isCurrentPersonLeader(person, leaders);
  expect(isLeader).toBeTruthy();

  const notLeader = isCurrentPersonLeader({ id: 500 }, leaders);
  expect(notLeader).toBeFalsy();
});

it("should contain a phone number mutation", () => {
  expect(print(PHONE_NUMBER_MUTATION)).toMatchSnapshot();
});

it("should contain a group mutation", () => {
  expect(print(GROUP_MUTATION)).toMatchSnapshot();
});

it("calls onPhoneNumberChange and sets the state", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({ phoneNumber: "" });
  wrapper.instance().onPhoneNumberChange("5555555555");
  expect(wrapper.state().phoneNumber).toBe("5555555555");
});

it("should call validatePhoneNumber and return true", () => {
  const wrapper = shallow(generateComponent());
  let result = wrapper.instance().validatePhoneNumber("5555555555");
  expect(result).toBe(true);
});

it("should call validatePhoneNumber and return false", () => {
  const wrapper = shallow(generateComponent());
  let result = wrapper.instance().validatePhoneNumber("5");
  expect(result).toBe(false);
});

it("should call validatePhoneNumber with characters and numbers and return true", () => {
  const wrapper = shallow(generateComponent());
  let result = wrapper.instance().validatePhoneNumber("1234abcdef1a2b3c4d56");
  expect(result).toBe(true);
});

it("should call validatePhoneNumber with characters and numbers and return false", () => {
  const wrapper = shallow(generateComponent());
  let result = wrapper.instance().validatePhoneNumber("1234abcdef1a2b3c4d5e");
  expect(result).toBe(false);
});

it("calls onCommunicationPreferenceChange and sets the state", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({ communicationPreference: "No Preference" });
  wrapper.instance().onCommunicationPreferenceChange("Phone");
  expect(wrapper.state().communicationPreference).toBe("Phone");
});
