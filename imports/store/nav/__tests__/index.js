import actions from "../";

it("setLevel", () => {
  const result = actions.setLevel({ level: "CONTENT" });
  expect(result).toMatchSnapshot();
});

it("reset", () => {
  const result = actions.reset();
  expect(result).toMatchSnapshot();
});

it("setColor", () => {
  const result = actions.setColor({ bgColor: "red", fgColor: "white" });
  expect(result).toMatchSnapshot();
});

it("setLinks", () => {
  const result = actions.setLinks({
    links: [
      {
        id: 1,
        label: "test",
        link: "http://test.com",
        icon: "test",
      },
      {
        id: 2,
        label: "test",
        link: "http://test.com",
        icon: "test",
      },
    ],
  });
  expect(result).toMatchSnapshot();
});

it("setAction", () => {
  const result = actions.setAction({
    level: "CONTENT",
    props: {
      id: 1,
      action: jest.fn(),
    },
  });
  expect(result).toMatchSnapshot();
});

it("hide", () => {
  const result = actions.hide();
  expect(result).toMatchSnapshot();
});

it("show", () => {
  const result = actions.show();
  expect(result).toMatchSnapshot();
});
