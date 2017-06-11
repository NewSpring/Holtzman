import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { nav as navActions } from "../../../data/store";
import {
  EventSingleWithoutData as EventSingle,
  GET_EVENT_QUERY,
} from "../Single";

jest.mock("../../../deprecated/mixins/mixins.Header", () => {});

jest.mock("../../../deprecated/mixins/mixins.Shareable", () => {});
jest.mock("../../../data/store", () => ({
  nav: {
    setLevel: jest.fn(),
    setAction: jest.fn(),
  },
}));

const defaultProps = {
  dispatch: jest.fn(),
  event: {
    content: {
      content: {
        body: "<p>some kind of content about harambe</p>",
        images: [
          {
            fileLabel: "2:1",
            fileName: "1234.testImage.jpg",
            fileType: null,
            url: "https://test.com/1234/testImage.jpg"
          }
        ],
        ooyalaId: "owqoitpuq52059akplsat0520",
      },
      entryId: "10458239056qaklpstjw40951281",
      id: "10458239056qaklpstjw40951281",
      meta: {
        channelId: "115108957aekwtl15p89asfes",
        date: "",
        siteId: "1235273985qwtklasgjkhatwetiu",
        urlTitle: "stuff"
      },
      status: "open",
      title: "Stuff"
    },
    live: {
      embedCode: null,
      live: false
    }
  },
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <EventSingle { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders the live video when live", () => {
  const wrapper = shallow(generateComponent({
    event: {
      content: {
        content: {
          body: "<p>some kind of content about harambe</p>",
          images: [
            {
              fileLabel: "2:1",
              fileName: "1234.testImage.jpg",
              fileType: null,
              url: "https://test.com/1234/testImage.jpg"
            }
          ],
          ooyalaId: "owqoitpuq52059akplsat0520",
        },
        entryId: "10458239056qaklpstjw40951281",
        id: "10458239056qaklpstjw40951281",
        meta: {
          channelId: "115108957aekwtl15p89asfes",
          date: "",
          siteId: "1235273985qwtklasgjkhatwetiu",
          urlTitle: "stuff"
        },
        status: "open",
        title: "Stuff"
      },
      live: {
        embedCode: "1234LIVETEST4321",
        live: true
      }
    }
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders an on demand video if present, and not live", () => {
    const wrapper = shallow(generateComponent({
    event: {
      content: {
        content: {
          body: "<p>some kind of content about harambe</p>",
          images: [
            {
              fileLabel: "2:1",
              fileName: "1234.testImage.jpg",
              fileType: null,
              url: "https://test.com/1234/testImage.jpg"
            }
          ],
          ooyalaId: "owqoitpuq52059akplsat0520",
        },
        entryId: "10458239056qaklpstjw40951281",
        id: "10458239056qaklpstjw40951281",
        meta: {
          channelId: "115108957aekwtl15p89asfes",
          date: "",
          siteId: "1235273985qwtklasgjkhatwetiu",
          urlTitle: "stuff"
        },
        status: "open",
        title: "Stuff"
      },
      live: {
        embedCode: null,
        live: false
      }
    }
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders loading if no content", () => {
  const wrapper = shallow(generateComponent({
    event: {
      content: null,
      live: {
        embedCode: null,
        live: null
      }
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("parses query correctly", () => {
  expect(GET_EVENT_QUERY).toMatchSnapshot();
});

it("updates nav on mount", () => {
  const mockDispatch = jest.fn();
  navActions.setLevel = jest.fn();
  navActions.setAction = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(navActions.setLevel).toHaveBeenCalledTimes(1);
  expect(navActions.setLevel).toHaveBeenCalledWith("BASIC_CONTENT");
});
