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
  changeFamily: jest.fn(),
  changeDates: jest.fn(),
  findByLimit: jest.fn(),
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
  // expect(mockChangeFamily).toHaveBeenCalledTimes(1);
  // expect(mockChangeFamily).toHaveBeenCalledWith([person2.id]);
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
  // expect(mockChangeFamily).toHaveBeenCalledTimes(1);
  // expect(mockChangeFamily).toHaveBeenCalledWith([person1.id, person2.id]);
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

it("dataRangeClick with LastSixMonths value sets the start and end dates correctly", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({
    start: "",
    end: "",
  });

  // this should set a 6 month range
  wrapper.instance().dateRangeClick("LastSixMonths");
  expect(moment(wrapper.state().start).format("L")).toEqual(moment().subtract(6, "months").format("L"));
  expect(moment(wrapper.state().end).format("L")).toEqual(moment().format("L"));

  // calling it again should reset the start and end dates
  wrapper.instance().dateRangeClick("LastSixMonths");
  expect(wrapper.state().start).toEqual("");
  expect(wrapper.state().end).toEqual("");
})

it("dataRangeClick with LastYear value sets the start and end dates correctly", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({
    start: "",
    end: "",
  });

  // this should set a 1 year range
  wrapper.instance().dateRangeClick("LastYear");
  expect(moment(wrapper.state().start).format("L")).toEqual(moment().subtract(12, "months").format("L"));
  expect(moment(wrapper.state().end).format("L")).toEqual(moment().format("L"));

  // calling it again should reset the start and end dates
  wrapper.instance().dateRangeClick("LastYear");
  expect(wrapper.state().start).toEqual("");
  expect(wrapper.state().end).toEqual("");
})

it("dataRangeClick with AllTime sets limit correctly", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({
    start: "",
    end: "",
  });

  // calling it the first time should set the limit to 0.
  wrapper.instance().dateRangeClick("AllTime");
  expect(wrapper.state().limit).toEqual(0);

  // if you call it again, it should set the limit back to 20
  wrapper.instance().dateRangeClick("AllTime");
  expect(wrapper.state().limit).toEqual(20);
})

it("saveData calls changeDates and updates state if id is start", () => {
  const mockChangeDates = jest.fn();
  const wrapper = shallow(generateComponent({
    changeDates: mockChangeDates,
  }));
  wrapper.setState({ end: "end" });

  wrapper.instance().saveData("test", { id: "start" });

  expect(mockChangeDates).toHaveBeenCalledTimes(1);
  expect(mockChangeDates).toHaveBeenCalledWith("test", "end");
  expect(wrapper.state().start).toBe("test");
});

it("saveData calls changeDates and updates state if id is end", () => {
  const mockChangeDates = jest.fn();
  const wrapper = shallow(generateComponent({
    changeDates: mockChangeDates,
  }));
  wrapper.setState({ start: "start" });

  wrapper.instance().saveData("test", { id: "end" });

  expect(mockChangeDates).toHaveBeenCalledTimes(1);
  expect(mockChangeDates).toHaveBeenCalledWith("start", "test");
  expect(wrapper.state().end).toBe("test");
});

it("saveData does not call changeDates if not start or end, but will update state", () => {
  const mockChangeDates = jest.fn();
  const wrapper = shallow(generateComponent({
    changeDates: mockChangeDates,
  }));
  wrapper.instance().saveData("test", { id: "notStartOrEnd" });

  expect(mockChangeDates).toHaveBeenCalledTimes(0);
  expect(wrapper.state().notStartOrEnd).toBe("test");
});
