import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import {
  TemplateWithoutData as Template,
  PERSON_QUERY,
} from "../";

import {
  nav as navActions,
} from "../../../../data/store";

jest.mock("../../../../deprecated/mixins/mixins.Header", () => {});
jest.mock("../../../../data/store", () => ({
  nav: {
    setLevel: jest.fn(),
  },
}));

const defaultProps = {
  dispatch: jest.fn(),
  data: {
    person: {
      photo: "http://test.com/person.jpg",
    },
    refetch: jest.fn(),
  },
  location: {
    pathname: "test",
  },
  upload: jest.fn(),
  photo: "http://test.com/test.jpg",
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return (
    <Template { ...newProps }>
      <h1>test</h1>
    </Template>
  );
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders without photo", () => {
  const wrapper = shallow(generateComponent({
    photo: null,
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("parses query", () => {
  expect(PERSON_QUERY).toMatchSnapshot();
});

it("updates nav on mount", () => {
  const mockDispatch = jest.fn();
  navActions.setLevel = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(navActions.setLevel).toHaveBeenCalledTimes(1);
  expect(navActions.setLevel).toHaveBeenCalledWith("TOP");
});

it("onUpload calls upload and then refect", () => {
  const mockUpload = jest.fn(() => new Promise(p => p()));
  const mockRefetch = jest.fn();
  const wrapper = shallow(generateComponent({
    upload: mockUpload,
    data: {
      refetch: mockRefetch,
      person: {},
    },
  }));
  wrapper.instance().onUpload("e");
  expect(mockUpload).toHaveBeenCalledTimes(1);
  expect(mockUpload).toHaveBeenCalledWith("e");
});
