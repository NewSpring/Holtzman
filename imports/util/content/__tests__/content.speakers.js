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

it("returns mutliple speakers comma separated and captilized", () => {
  const result = speakers({
    content: {
      speaker: "jim bob, jimmy jam, jolly jake",
    },
  });
  expect(result).toBe("Jim Bob, Jimmy Jam, Jolly Jake");
});
it("returns mutliple speakers not csv comma separated and captilized", () => {
  const result = speakers({
    content: {
      speaker: `
        jim bob
        jimmy jam
        jolly jake
      `,
    },
  });
  expect(result).toBe("Jim Bob, Jimmy Jam, Jolly Jake");
});
