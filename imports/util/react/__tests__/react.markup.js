import createMarkup from "../react.markup";

it("should return blank if no content", () => {
  const result = createMarkup({
    content: {
      body: "false",
    },
  });
  expect(result).toEqual({
    __html: "",
  });
});

it("should return from body prop by default", () => {
  const result = createMarkup({
    content: {
      body: "<h1>test</h1>",
    },
  });
  expect(result).toEqual({
    __html: "<h1>test</h1>",
  });
});

it("should allow setting a different prop for content", () => {
  const result = createMarkup({
    content: {
      newBody: "<h1>test</h1>",
    },
  }, "newBody");
  expect(result).toEqual({
    __html: "<h1>test</h1>",
  });
});
