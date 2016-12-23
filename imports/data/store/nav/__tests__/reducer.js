import reducer from "../reducer";

it("NAV.SET_LEVEL", () => {
  const action = {
    type: "NAV.SET_LEVEL",
    level: "CONTENT",
    bgColor: "red",
    fgColor: "blue",
  };
  const result = reducer(undefined, action);
  expect(result).toMatchSnapshot();
});

it("NAV.SET_LINKS", () => {
  const action = {
    type: "NAV.SET_LINKS",
    links: ["one", "two"],
  };
  const result = reducer(undefined, action);
  expect(result).toMatchSnapshot();
});

it("NAV.SET_COLOR", () => {
  const action = {
    type: "NAV.SET_COLOR",
    bgColor: "orange",
    fgColor: "purple",
  };
  const result = reducer(undefined, action);
  expect(result).toMatchSnapshot();
});

it("NAV.RESET_COLOR", () => {
  const action = {
    type: "NAV.SET_COLOR",
    bgColor: "orange",
    fgColor: "purple",
  };
  reducer(undefined, action);
  const action2 = {
    type: "NAV.RESET_COLOR",
  };
  const result = reducer(undefined, action2);
  expect(result).toMatchSnapshot();
});

it("NAV.SET_ACTION", () => {
  const action = {
    type: "NAV.SET_ACTION",
    level: "TOP",
    props: {
      id: 1,
      action: "test",
    },
  };
  const result = reducer(undefined, action);
  expect(result).toMatchSnapshot();
});

it("NAV.SET_VISIBILITY", () => {
  const action = {
    type: "NAV.SET_VISIBILITY",
    visible: false,
  };
  const result = reducer(undefined, action);
  expect(result).toMatchSnapshot();
});

it("NAV.ANYTHING_ELSE",() => {
  const action = {
    type: "NAV.ANYTHING_ELSE",
  };
  const result = reducer(undefined, action);
  expect(result).toMatchSnapshot();
});
