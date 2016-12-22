/* eslint-disable */
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { reset, startBuffering } from "aphrodite/lib/inject";

beforeEach(() => {
  reset();
  startBuffering();
});

afterEach(() => {
  reset();
});

import {
  StudyEntryWithoutData as StudyEntry,
  STUDY_ENTRY_QUERY,
} from "../EntryList";

const defaultProps = {
  studyEntries: {
    loading: false,
    content: {
      studyEntries: [
        {
          title: "Study Entry"
        },
      ],
    },
  },
  light: true,
  focus: "1"
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };

  return <StudyEntry { ...newProps } />;
};

it("parses study entry query", () => {
  expect(STUDY_ENTRY_QUERY).toMatchSnapshot();
});

it("renders with props", () => {
  const tree = renderer.create(generateComponent());
  expect(tree).toMatchSnapshot();
});

it("returns null if there is no studyEntries", () => {
  const tree = renderer.create(generateComponent({
    studyEntries: {
      content: {
        studyEntries: [],
      }
    },
  }));
  expect(tree).toMatchSnapshot();
});

it("has a loading state", () => {
  const tree = renderer.create(generateComponent({
    studyEntries: {
      loading: true
    },
  }));
  expect(tree).toMatchSnapshot();
})

it("calculates width based on window size", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().dynamicWidth();
  expect(result).toEqual({ width: "847.2px" });
});

it("calculates tablet version", () => {
  window.isTablet = true;
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().dynamicWidth();
  expect(result).toEqual({ width: "429px" });
});

it("overflow contains css object", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().overflow;
  expect(result).toMatchSnapshot();
});
