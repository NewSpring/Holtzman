import speakers from "../content.speakers";

it("returns nothing if no speakers", () => {
  const result = speakers({
    content: {
      speaker: "",
    },
  });
  expect(result).toBeFalsy();
});

it("returns single speaker with no comma captilized", () => {
  const result = speakers({
    content: {
      speaker: "jim bob",
    },
  });
  expect(result).toBe("Jim Bob");
});

it("returns mutliple speakers comman separated and captilized", () => {
  const result = speakers({
    content: {
      speaker: "jim bob,jimmy jam,jolly jake",
    },
  });
  expect(result).toBe("Jim Bob, Jimmy Jam, Jolly Jake");
});
