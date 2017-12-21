import { shallow } from "enzyme";
import React, { Component } from "react";
import ReactMixin from "react-mixin";
import { paging as pagingActions } from "../../../data/store";
import Pageable from "../mixins.Pageable";

class CWithoutPageable extends Component {
  render() {
    return <div />;
  }
}

const CWithPageable = ReactMixin.decorate(Pageable)(CWithoutPageable);

const defaultProps = {
  dispatch: jest.fn(),
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <CWithPageable { ...newProps } />;
};

it("binds scrolling events on mount", () => {
  window.addEventListener = jest.fn();
  const wrapper = shallow(generateComponent());
  wrapper.instance().componentDidMount();
  expect(wrapper.instance()._bindPageOnScroll).toBeTruthy();
  expect(window.addEventListener).toHaveBeenCalled();
  expect(window.addEventListener).toHaveBeenCalledWith("scroll", wrapper.instance()._bindPageOnScroll);
});

it("removes listener and rests paging store on unmount", () => {
  window.removeEventListener = jest.fn();
  pagingActions.reset = jest.fn();
  const mockDispatch = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  wrapper.instance().componentWillUnmount();
  expect(window.removeEventListener).toHaveBeenCalledTimes(1);
  expect(window.removeEventListener).toHaveBeenCalledWith("scroll", wrapper.instance()._bindPageOnScroll);
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(pagingActions.reset).toHaveBeenCalledTimes(1);
});

it("should update if not loading", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().shouldComponentUpdate({
    data: {
      loading: true,
    },
  });
  expect(result).toBe(false);
});

it("should not update if loading", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().shouldComponentUpdate({
    data: {
      loading: false,
    },
  });
  expect(result).toBe(true);
});

xit("_pageOnScroll should update if conditions are right", () => {
  jest.useFakeTimers();
  window.scrollY = 30;
  window.outerHeight = 50;
  document.body.clientHeight = 100;
  const mockDispatch = jest.fn();
  pagingActions.pause = jest.fn();
  pagingActions.increment = jest.fn();
  pagingActions.resume = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
    paging: {
      done: false,
      shouldUpdate: true,
    },
  }));
  wrapper.instance()._pageOnScroll();
  expect(mockDispatch).toHaveBeenCalledTimes(2);
  expect(pagingActions.pause).toHaveBeenCalledTimes(1);
  expect(pagingActions.increment).toHaveBeenCalledTimes(1);
  jest.runAllTimers();
  expect(mockDispatch).toHaveBeenCalledTimes(3);
  expect(pagingActions.resume).toHaveBeenCalledTimes(1);
});

xit("_pageOnScroll does not update if scroll not past threshold", () => {
  jest.useFakeTimers();
  window.scrollY = 10;
  window.outerHeight = 50;
  document.body.clientHeight = 100;
  const mockDispatch = jest.fn();
  pagingActions.pause = jest.fn();
  pagingActions.increment = jest.fn();
  pagingActions.resume = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
    paging: {
      done: false,
      shouldUpdate: true,
    },
  }));
  wrapper.instance()._pageOnScroll();
  expect(mockDispatch).not.toHaveBeenCalled();
  expect(pagingActions.pause).not.toHaveBeenCalled();
  expect(pagingActions.increment).not.toHaveBeenCalled();
});

xit("_pageOnScroll does not update if shouldn't update", () => {
  jest.useFakeTimers();
  window.scrollY = 30;
  window.outerHeight = 50;
  document.body.clientHeight = 100;
  const mockDispatch = jest.fn();
  pagingActions.pause = jest.fn();
  pagingActions.increment = jest.fn();
  pagingActions.resume = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
    paging: {
      done: false,
      shouldUpdate: false,
    },
  }));
  wrapper.instance()._pageOnScroll();
  expect(mockDispatch).not.toHaveBeenCalled();
  expect(pagingActions.pause).not.toHaveBeenCalled();
  expect(pagingActions.increment).not.toHaveBeenCalled();
});

xit("_pageOnScroll does not update if done", () => {
  jest.useFakeTimers();
  window.scrollY = 30;
  window.outerHeight = 50;
  document.body.clientHeight = 100;
  const mockDispatch = jest.fn();
  pagingActions.pause = jest.fn();
  pagingActions.increment = jest.fn();
  pagingActions.resume = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
    paging: {
      done: true,
      shouldUpdate: true,
    },
  }));
  wrapper.instance()._pageOnScroll();
  expect(mockDispatch).not.toHaveBeenCalled();
  expect(pagingActions.pause).not.toHaveBeenCalled();
  expect(pagingActions.increment).not.toHaveBeenCalled();
});
