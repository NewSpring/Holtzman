import scriptureList from "../scriptures.list";

it("returns a blank array if no scriptures", () => {
  const result = scriptureList({
    content: {},
  });
  expect(result).toEqual([]);
});

// XXX i'm not sure this check is necessary
it("returns a blank array if no scriptures and no commas", () => {
  const result = scriptureList({
    content: {},
  }, {
    commas: false,
  });
  expect(result).toEqual([]);
});

it("returns array of scripture strings", () => {
  const result = scriptureList({
    content: {
      scripture: [
        { book: "Job", passage: "2" },
        { book: "Job", passage: "3" },
      ],
    },
  }, {
    commas: false,
  });
  expect(result).toEqual([
    "Job 2",
    "Job 3",
  ]);
});

it("returns a comma separated string of scriptures", () => {
  const result = scriptureList({
    content: {
      scripture: [
        { book: "Job", passage: "2" },
        { book: "Job", passage: "3" },
      ],
    },
  });
  expect(result).toBe("Job 2, Job 3");
});
