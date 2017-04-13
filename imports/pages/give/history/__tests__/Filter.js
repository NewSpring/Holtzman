import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import moment from "moment";
import Filter from "../Filter";

const defaultProps = {
  family: [
    {
      person: {
        id: "1",
        firstName: "jim",
        lastName: "bob",
        photo: "http://test.com/test.jpg",
      },
    },
    {
      person: {
        id: "2",
        firstName: "sally",
        lastName: "bob",
        photo: "http://test.com/test.jpg",
      },
    },
  ],
  filterTransactions: jest.fn()
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Filter { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders family members when expanded is true", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({ expanded: true });
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("doesn't render family members if there are none", () => {
  const wrapper = shallow(generateComponent({
    family: null,
  }));
  wrapper.setState({ expanded: true });
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("works with nickname", () => {
  const wrapper = shallow(generateComponent({
    family: [
      {
        person: {
          id: "1",
          nickName: "jimothy",
          firstName: "jim",
          lastName: "bob",
          photo: "http://test.com/test.jpg",
        },
      },
      {
        person: {
          id: "2",
          firstName: "sally",
          lastName: "bob",
          photo: "http://test.com/test.jpg",
        },
      },
    ],
  }));
  wrapper.setState({ expanded: true });
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("updates the state upon recieving new family members", () => {
  const person1 = defaultProps.family[0].person;
  const person2 = defaultProps.family[1].person;

  const wrapper = shallow(generateComponent({
    family: [
      {
        person: {
          id: "1",
          firstName: "jim",
          lastName: "bob",
          photo: "http://test.com/test.jpg",
        },
      },
    ],
  }));

  // componentWillReceiveProps doesn't run on mount
  expect(wrapper.state().people).toEqual([]);

  wrapper.setProps(defaultProps);
  expect(wrapper.state().people).toEqual([person1.id, person2.id]);
});

it("does not update the state upon recieving same amount of family members", () => {
  const person1 = defaultProps.family[0].person;
  const person2 = defaultProps.family[1].person;

  const wrapper = shallow(generateComponent());

  // componentWillReceiveProps doesn't run on mount
  expect(wrapper.state().people).toEqual([]);

  wrapper.setProps(defaultProps);

  // should still be blank since componentWillReceiveProps never ran
  expect(wrapper.state().people).toEqual([]);
});

it("onClick removes found person", () => {
  const person1 = defaultProps.family[0].person;
  const person2 = defaultProps.family[1].person;

  const wrapper = shallow(generateComponent());
  wrapper.setState({
    people: [person1.id, person2.id],
  });

  // remove person
  wrapper.instance().onClick({ id: person1.id });

  expect(wrapper.state().people).toEqual([person2.id]);
});

it("onClick adds unfound person", () => {
  const person1 = defaultProps.family[0].person;
  const person2 = defaultProps.family[1].person;

  const wrapper = shallow(generateComponent());
  wrapper.setState({
    people: [person1.id],
  });

  // remove person
  wrapper.instance().onClick({ id: person2.id });

  expect(wrapper.state().people).toEqual([person1.id, person2.id]);
});

it("toggle changes the expanded state", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.state().expanded).toBe(false);
  wrapper.instance().toggle();
  expect(wrapper.state().expanded).toBe(true);
  wrapper.instance().toggle();
  expect(wrapper.state().expanded).toBe(false);
});

it("dataRangeClick with LastMonth value sets the start and end dates correctly", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({
    start: "",
    end: "",
  });

  // this should set a 30 day range
  wrapper.instance().dateRangeClick("LastMonth");
  expect(moment(wrapper.state().start).format("L")).toEqual(moment().subtract(30, "days").format("L"));
  expect(moment(wrapper.state().end).format("L")).toEqual(moment().format("L"));

  // calling it again should reset the start and end dates
  wrapper.instance().dateRangeClick("LastMonth");
  expect(wrapper.state().start).toEqual("");
  expect(wrapper.state().end).toEqual("");
})

it("dataRangeClick with LastYear value sets the start and end dates correctly", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({
    start: "",
    end: "",
  });

  wrapper.instance().dateRangeClick("LastYear");
  expect(moment(wrapper.state().start).format("L")).toEqual(moment().subtract(1, "year").startOf("year").format("L"));
  expect(moment(wrapper.state().end).format("L")).toEqual(moment().subtract(1, "year").endOf("year").format("L"));

  // calling it again should reset the start and end dates
  wrapper.instance().dateRangeClick("LastYear");
  expect(wrapper.state().start).toEqual("");
  expect(wrapper.state().end).toEqual("");
})

it("dataRangeClick with YearToDate value sets the start and end dates correctly", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({
    start: "",
    end: "",
  });

  // this should set a 1 year range
  wrapper.instance().dateRangeClick("YearToDate");
  expect(moment(wrapper.state().start).format("L")).toEqual(moment().startOf("year").format("L"));
  expect(moment(wrapper.state().end).format("L")).toEqual(moment().format("L"));

  // calling it again should reset the start and end dates
  wrapper.instance().dateRangeClick("YearToDate");
  expect(wrapper.state().start).toEqual("");
  expect(wrapper.state().end).toEqual("");
})

it("dataRangeClick with AllTime sets limit correctly", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({
    limit: 20,
  });

  // calling it the first time should set the limit to 0.
  wrapper.instance().dateRangeClick("AllTime");
  expect(wrapper.state().limit).toEqual(0);

  // if you call it again, it should set the limit back to 20
  wrapper.instance().dateRangeClick("AllTime");
  expect(wrapper.state().limit).toEqual(20);
})

it("dataRangeClick sets customDateDisabled correctly", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({
    customDateDisabled: false,
  });

  // calling it the first time should set customDateDisabled to true
  wrapper.instance().dateRangeClick("LastMonth");
  expect(wrapper.state().customDateDisabled).toEqual(true);

  // if you call it again, it should set customDateDisabled back to false
  wrapper.instance().dateRangeClick("LastMonth");
  expect(wrapper.state().customDateDisabled).toEqual(false);
})

it("dateRangeClick allows switching from one tag to another", () => {
  const wrapper = shallow(generateComponent());
  const click = wrapper.instance().dateRangeClick;
  click("AllTime");
  click("YearToDate");
  expect(wrapper.state().start).toEqual(moment().startOf("year"));
  expect(wrapper.state().dateRangeActive).toEqual("YearToDate");
});

it("toggleStartDatePicker correctly toggles the start date picker", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({
    showStartDatePicker: false,
  });

  // calling it the first time should toggle the picker on.
  wrapper.instance().toggleStartDatePicker();
  expect(wrapper.state().showStartDatePicker).toEqual(true);

  // if you call it again, it should set toggle the picker off.
  wrapper.instance().toggleStartDatePicker();
  expect(wrapper.state().showStartDatePicker).toEqual(false);
})

it("toggleEndDatePicker correctly toggles the end date picker", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({
    showEndDatePicker: false,
  });

  // calling it the first time should toggle the picker on.
  wrapper.instance().toggleEndDatePicker();
  expect(wrapper.state().showEndDatePicker).toEqual(true);

  // if you call it again, it should set toggle the picker off.
  wrapper.instance().toggleEndDatePicker();
  expect(wrapper.state().showEndDatePicker).toEqual(false);
})

it("startClick with StartDate value and blank start date shows the start date picker", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({
    showStartDatePicker: false,
    start: "",
  });

  // calling it should toggle the picker on and set the override to true.
  wrapper.instance().startClick("StartDate");
  expect(wrapper.state().showStartDatePicker).toEqual(true);
})

it("startClick with StartDate value and non-empty start date resets many things", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({
    showStartDatePicker: false,
    overrideActive: false,
    start: "12/25/2016",
    end: "",
  });

  wrapper.instance().startClick("StartDate");
  expect(wrapper.state().start).toEqual("");
  expect(wrapper.state().customStartLabel).toEqual("Start Date");
  expect(wrapper.state().customStartActive).toEqual(false);
  expect(wrapper.state().overrideActive).toEqual(false);
})

it("startClick with EndDate value and blank end date shows the end date picker", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({
    showEndDatePicker: false,
    end: ""
  });

  // calling it should toggle the picker on and set the override to true.
  wrapper.instance().startClick("EndDate");
  expect(wrapper.state().showEndDatePicker).toEqual(true);
})

it("startClick with EndDate value and non-empty start date resets many things", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({
    showStartDatePicker: false,
    overrideActive: false,
    start: "",
    end: "12/25/2016",
  });

  wrapper.instance().startClick("EndDate");
  expect(wrapper.state().end).toEqual("");
  expect(wrapper.state().customEndLabel).toEqual("End Date");
  expect(wrapper.state().customEndActive).toEqual(false);
  expect(wrapper.state().overrideActive).toEqual(false);
})

it("onStartDayClick correctly sets state", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({
    start: "",
    customStartLabel: "",
    customStartActive: false,
  });
  const selectedObject = {
    selected: true,
    disabled: false,
  }
  const customDate = moment("2016-12-25");

  wrapper.instance().onStartDayClick(null, customDate, selectedObject);
  expect(wrapper.state().start).toEqual("");
  expect(wrapper.state().customStartLabel).toEqual("Start Date");
  expect(wrapper.state().customStartActive).toEqual(false);

  selectedObject.selected = false;
  wrapper.instance().onStartDayClick(null, customDate, selectedObject);
  expect(wrapper.state().start).toEqual(customDate);
  expect(wrapper.state().customStartLabel).toEqual("Dec 25, 2016");
  expect(wrapper.state().customStartActive).toEqual(true);
})

it("onEndDayClick correctly sets state", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({
    end: "",
    customEndLabel: "",
    customEndActive: false,
  });
  const selectedObject = {
    selected: true,
    disabled: false,
  }
  const customDate = moment("2016-12-25");

  wrapper.instance().onEndDayClick(null, customDate, selectedObject);
  expect(wrapper.state().end).toEqual("");
  expect(wrapper.state().customEndLabel).toEqual("End Date");
  expect(wrapper.state().customEndActive).toEqual(false);

  selectedObject.selected = false;
  wrapper.instance().onEndDayClick(null, customDate, selectedObject);
  expect(wrapper.state().end).toEqual(customDate);
  expect(wrapper.state().customEndLabel).toEqual("Dec 25, 2016");
  expect(wrapper.state().customEndActive).toEqual(true);
})

it("filterResults correctly calls all the functions", () => {
  const person1 = defaultProps.family[0].person;
  const person2 = defaultProps.family[1].person;
  const mockFilterTransactions = jest.fn();
  const wrapper = shallow(generateComponent({
    filterTransactions: mockFilterTransactions,
  }));
  wrapper.setState({
    start: "",
    end: "",
    customEndLabel: "",
    customEndActive: false,
    people: [person1.id, person2.id],
  });

  wrapper.instance().filterResults();
  expect(mockFilterTransactions).toHaveBeenCalledWith({ people: [ "1", "2" ], start: "", end: "", limit: 20 });
});
