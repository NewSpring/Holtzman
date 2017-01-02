import { shallow, mount } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { modal, give as giveActions } from "../../../../data/store";
import OnBoard from "../../../people/accounts";
import { GiveWithoutData as Give } from "../";

const defaultProps = {
  give: {
    savedAccount: {},
  },
  dispatch: jest.fn(),
  data: {
    campuses: [],
    countries: [],
    savedPayments: [],
    states: [],
  },
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };

  return <Give { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("calls dispatch on mount if saved account", () => {
  const mockDispatch = jest.fn();
  giveActions.setProgress = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
    give: {
      savedAccount: {
        id: "1",
      },
    },
  }));

  expect(mockDispatch).toHaveBeenCalledTimes(1);
});

it("does not call dispatch on mount if no saved account", () => {
  const mockDispatch = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));

  expect(mockDispatch).toHaveBeenCalledTimes(0);
  expect(giveActions.setProgress).toHaveBeenCalledTimes(1);
  expect(giveActions.setProgress).toHaveBeenCalledWith(4);
});

it("calls updateData with next props hwne loading changes", () => {
  const wrapper = shallow(generateComponent({
    data: {
      campuses: [],
      countries: [],
      loading: true,
      savedPayments: [],
      states: [],
    },
  }));
  const mockUpdateData = jest.fn();
  wrapper.instance().updateData = mockUpdateData;

  wrapper.setProps({
    data: {
      campuses: [],
      countries: [],
      loading: false,
      savedPayments: [],
      states: [],
    },
  });

  expect(mockUpdateData).toHaveBeenCalledTimes(1);
});

it("calls dispatch twice when unmounting if state not default", () => {
  const mockDispatch = jest.fn();
  giveActions.clearData = jest.fn();
  giveActions.clearSchedules = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));

  wrapper.setState({
    give: {
      state: "notdefault",
    },
  });

  wrapper.unmount();

  expect(mockDispatch).toHaveBeenCalledTimes(2);
  expect(giveActions.clearData).toHaveBeenCalledTimes(1);
  expect(giveActions.clearSchedules).toHaveBeenCalledTimes(1);
});

it("onSubmit prevents default and calls dispatch", () => {
  const mockDispatch = jest.fn();
  const mockPreventDefault = jest.fn();
  giveActions.submit = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));

  wrapper.instance().onSubmit({
    preventDefault: mockPreventDefault,
  });

  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(giveActions.submit).toHaveBeenCalledTimes(1);
});

it("updateData does nothing if loading", () => {
  const mockDispatch = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));

  wrapper.instance().updateData({
    data: {
      loading: true,
    },
  });

  expect(mockDispatch).toHaveBeenCalledTimes(0);
});

it("updateData does nothing if no person", () => {
  const mockDispatch = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));

  wrapper.instance().updateData({
    data: {
      loading: false,
    },
  });

  expect(mockDispatch).toHaveBeenCalledTimes(0);
});

it("updateData calls dispatch with updates", () => {
  const mockDispatch = jest.fn();
  giveActions.save = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  const newData = {
    data: {
      loading: false,
      person: {
        firstName: "Jim",
        lastName: "Steve",
        email: "test@test.com",
        campus: {
          name: "Anderson",
          id: "2",
        },
        home: {
          street1: "123 Some St.",
          street2: "Apt. 1",
          city: "Anderson",
          state: "SC",
          zip: "22222",
          country: "US",
        },
      },
    },
  };

  wrapper.instance().updateData(newData);
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(giveActions.save).toHaveBeenCalledTimes(1);
  expect(giveActions.save).toHaveBeenCalledWith({
    personal: {
      firstName: newData.data.person.firstName,
      lastName: newData.data.person.lastName,
      email: newData.data.person.email,
      campus: newData.data.person.campus.name,
      campusId: newData.data.person.campus.id,
    },
    billing: {
      streetAddress: newData.data.person.home.street1,
      streetAddress2: newData.data.person.home.street2,
      city: newData.data.person.home.city,
      state: newData.data.person.home.state,
      zip: newData.data.person.home.zip,
      country: newData.data.person.home.country,
    },
  });
});

it("updateData calls dispatch with nickname", () => {
  const mockDispatch = jest.fn();
  giveActions.save = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  const newData = {
    data: {
      loading: false,
      person: {
        nickName: "Jim",
        lastName: "Steve",
        email: "test@test.com",
        campus: {
          name: "Anderson",
          id: "2",
        },
        home: {
          street1: "123 Some St.",
          street2: "Apt. 1",
          city: "Anderson",
          state: "SC",
          zip: "22222",
          country: "US",
        },
      },
    },
  };

  wrapper.instance().updateData(newData);
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(giveActions.save).toHaveBeenCalledTimes(1);
  expect(giveActions.save).toHaveBeenCalledWith({
    personal: {
      firstName: newData.data.person.nickName,
      lastName: newData.data.person.lastName,
      email: newData.data.person.email,
      campus: newData.data.person.campus.name,
      campusId: newData.data.person.campus.id,
    },
    billing: {
      streetAddress: newData.data.person.home.street1,
      streetAddress2: newData.data.person.home.street2,
      city: newData.data.person.home.city,
      state: newData.data.person.home.state,
      zip: newData.data.person.home.zip,
      country: newData.data.person.home.country,
    },
  });
});

it("updateData works without home or campus", () => {
  const mockDispatch = jest.fn();
  giveActions.save = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  const newData = {
    data: {
      loading: false,
      person: {
        nickName: "Jim",
        lastName: "Steve",
        email: "test@test.com",
      },
    },
  };

  wrapper.instance().updateData(newData);
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(giveActions.save).toHaveBeenCalledTimes(1);
  expect(giveActions.save).toHaveBeenCalledWith({
    personal: {
      firstName: newData.data.person.nickName,
      lastName: newData.data.person.lastName,
      email: newData.data.person.email,
      campus: undefined,
      campusId: undefined,
    },
    billing: {
      streetAddress: undefined,
      streetAddress2: undefined,
      city: undefined,
      state: undefined,
      zip: undefined,
      country: undefined,
    },
  });
});

it("next calls prevent default and dispatch", () => {
  const mockPreventDefault = jest.fn();
  const mockDispatch = jest.fn();
  giveActions.next = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));

  wrapper.instance().next({
    preventDefault: mockPreventDefault,
  });

  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(giveActions.next).toHaveBeenCalledTimes(1);
});

it("goToStepOne calls prevent default and dispatch 3 times", () => {
  const mockPreventDefault = jest.fn();
  const mockDispatch = jest.fn();
  giveActions.clearAccount = jest.fn();
  giveActions.setState = jest.fn();
  giveActions.setProgress = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));

  wrapper.instance().goToStepOne({
    preventDefault: mockPreventDefault,
  });

  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  expect(mockDispatch).toHaveBeenCalledTimes(3);
  expect(giveActions.clearAccount).toHaveBeenCalledTimes(1);
  expect(giveActions.setState).toHaveBeenCalledTimes(1);
  expect(giveActions.setState).toHaveBeenCalledWith("default");
  expect(giveActions.setProgress).toHaveBeenCalledTimes(1);
  expect(giveActions.setProgress).toHaveBeenCalledWith(1);
});

it("changeSavedAccount calls dispatch and give actions", () => {
  const mockDispatch = jest.fn();
  giveActions.setAccount = jest.fn();
  const account = "test";
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));

  wrapper.instance().changeSavedAccount(account);

  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(giveActions.setAccount).toHaveBeenCalledTimes(1);
  expect(giveActions.setAccount).toHaveBeenCalledWith(account);
});

it("back calls prevent default and dispatch", () => {
  const mockPreventDefault = jest.fn();
  const mockDispatch = jest.fn();
  giveActions.previous = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
    give: {
      step: 2,
      savedAccount: {},
    },
  }));

  wrapper.instance().back({
    preventDefault: mockPreventDefault,
  });

  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(giveActions.previous).toHaveBeenCalledTimes(1);
});

it("back calls prevent default hides modal if first step", () => {
  const mockPreventDefault = jest.fn();
  const mockDispatch = jest.fn();
  modal.hide = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
    give: {
      step: 1,
      savedAccount: {},
    },
  }));

  wrapper.instance().back({
    preventDefault: mockPreventDefault,
  });

  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(modal.hide).toHaveBeenCalledTimes(1);
});

it("goToAccounts renders modal with data", () => {
  const mockDispatch = jest.fn();
  modal.render = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
    give: {
      data: {
        personal: {
          email: "test@test.com",
          firstName: "Jim",
          lastName: "Bob",
        },
      },
      savedAccount: {},
    },
  }));

  wrapper.instance().goToAccounts();

  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(modal.render).toHaveBeenCalledTimes(1);
  expect(modal.render).toHaveBeenCalledWith(OnBoard, {
    coverHeader: true,
    account: false,
    data: {
      email: "test@test.com",
      firstName: "Jim",
      lastName: "Bob",
      terms: true,
    },
  });
});

it("save dispatches give save with args", () => {
  const mockDispatch = jest.fn();
  giveActions.save = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));

  wrapper.instance().save("one", "two");

  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(giveActions.save).toHaveBeenCalledTimes(1);
  expect(giveActions.save).toHaveBeenCalledWith("one", "two");
});

it("clear dispatches give clear with args", () => {
  const mockDispatch = jest.fn();
  giveActions.clear = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));

  wrapper.instance().clear("one", "two");

  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(giveActions.clear).toHaveBeenCalledTimes(1);
  expect(giveActions.clear).toHaveBeenCalledWith("one", "two");
});

it("clearData dispatches give clear and modal hide", () => {
  const mockDispatch = jest.fn();
  giveActions.clearData = jest.fn();
  modal.hide = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));

  wrapper.instance().clearData();

  expect(mockDispatch).toHaveBeenCalledTimes(2);
  expect(giveActions.clearData).toHaveBeenCalledTimes(1);
  expect(modal.hide).toHaveBeenCalledTimes(1);
});
