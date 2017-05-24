
import { print } from "graphql-tag/printer";
import { ApolloProvider } from 'react-apollo';
import { mount } from "enzyme";
import { Provider } from 'react-redux';
import { mountToJson } from "enzyme-to-json";
import { Meteor } from "meteor/meteor";
import { connect } from "react-redux";
import { createStore } from "redux";

import { classWrapper, TOGGLE_LIKE_MUTATION } from "../toggle";

const TestComponent = (props) => <div id="tester">Test</div>;

const mockStore = {
  getState: jest.fn(),
  subscribe: jest.fn(),
  dispatch: jest.fn(),
  modal: { visible: false },
  liked: { likes: [] }
};

const mockClient = {
  initStore: jest.fn(),
  mutate: jest.fn(),
};

Meteor.userId = jest.fn();

const renderComponent = (additionalProps) => {
  const defaultProps = {
    modal: { visible: false },
    liked: { likes: [] }
  }
  const Wrapped = classWrapper(jest.fn(() => "12345"))(TestComponent);
  return (
    <Provider store={createStore(() => mockStore, mockStore)}>
      <ApolloProvider client={mockClient} store={createStore(() => mockStore, mockStore)}>
        <Wrapped modal={{ visible: false }} { ...additionalProps } />
      </ApolloProvider>
    </Provider>
  );
};

describe("Likes Wrapper", () => {

  it("should contain mutation", () => {
    expect(print(TOGGLE_LIKE_MUTATION)).toMatchSnapshot();
  });

  fit("should render the child component", () => {
    const component = mount(renderComponent());
    expect(mountToJson(component)).toMatchSnapshot();
  });

  it("should pass props to the wrapped component properly", () => {
    const component = mount(renderComponent({
      prop1: "hello",
      iMiss: "harambe",
    }));

    const passedProps = component.find(TestComponent).props();
    expect("prop1" in passedProps).toEqual(true);
    expect("iMiss" in passedProps).toEqual(true);
  });

  it("should dispatch nav actions on mount", () => {
    mockStore.dispatch.mockReset();
    const component = mount(renderComponent());
    expect(mockStore.dispatch).toHaveBeenCalledTimes(2)
    expect(mockStore.dispatch.mock.calls[0][0]).toEqual({
      "level": "CONTENT", "type": "NAV.SET_LEVEL"
    });
    expect(mockStore.dispatch.mock.calls[1][0].level).toEqual("CONTENT");
    expect(mockStore.dispatch.mock.calls[1][0].type).toEqual("NAV.SET_ACTION");
  });

  it("should dispatch nav actions on unmount", () => {
    const component = mount(renderComponent());
    mockStore.dispatch.mockReset();
    component.unmount();

    expect(mockStore.dispatch).toHaveBeenCalledTimes(1)
    expect(mockStore.dispatch.mock.calls[0][0]).toEqual({
      "level": "TOP", "type": "NAV.SET_LEVEL"
    });
  });

  it("should dispatch modal on toggleLike if no user", () => {
    mockStore.dispatch.mockReset();
    const component = mount(renderComponent());

    // look into the dispatch calls to get access to the toggleLike
    const toggle = mockStore.dispatch.mock.calls[1][0].props.action;
    toggle();

    expect(mockStore.dispatch.mock.calls[2][0].type).toEqual("MODAL.SET_CONTENT");
  });

  it("should not dispatch if user but no nodeId", () => {
    mockStore.dispatch.mockReset();
    const Wrapped = classWrapper(jest.fn())(TestComponent);
    const Component = (
      <Provider store={mockStore}>
        <ApolloProvider client={mockClient} store={mockStore}>
          <Wrapped modal={{visible: false}} />
        </ApolloProvider>
      </Provider>
    );

    // when mounting, it calls an action to set the trigger for toggling a like.
    const component = mount(Component);

    // look into the dispatch calls to get access to the toggleLike
    const toggle = mockStore.dispatch.mock.calls[1][0].props.action;
    Meteor.userId.mockReturnValueOnce("123");
    toggle();

    expect(mockStore.dispatch).toHaveBeenCalledTimes(2);
  });

  it("should return null when getNodeId is called with no reducer", () => {
    mockStore.dispatch.mockReset();

    const Wrapped = classWrapper()(TestComponent);
    const Component = (
      <Provider store={mockStore}>
        <ApolloProvider client={mockClient} store={mockStore}>
          <Wrapped modal={{visible: false}} />
        </ApolloProvider>
      </Provider>
    );

    // when mounting, it calls an action to set the trigger for toggling a like.
    const component = mount(Component);

    // look into the dispatch calls to get access to the toggleLike
    const toggle = mockStore.dispatch.mock.calls[1][0].props.action;
    Meteor.userId.mockReturnValueOnce("1234");
    toggle();

    // since there,s no reducer, the dispatch from toggle won't get called
    expect(mockStore.dispatch).toHaveBeenCalledTimes(2);
  });

  it("should dispatch and call mutate in toggleLike if user and nodeId present", () => {
    mockStore.dispatch.mockReset();
    const component = mount(renderComponent());

    // look into the dispatch calls to get access to the toggleLike
    const toggle = mockStore.dispatch.mock.calls[1][0].props.action;
    Meteor.userId.mockReturnValueOnce("1234");
    toggle();

    expect(mockStore.dispatch).toHaveBeenCalledTimes(3);
    expect(mockStore.dispatch.mock.calls[2][0]).toEqual({
      props: {entryId: "12345"},
      type: "LIKED.TOGGLE",
    });
    expect(mockClient.mutate).toBeCalled();
  });

  it("should return properly from toggleLike", () => {
    mockStore.dispatch.mockReset();
    const component = mount(renderComponent());

    // look into the dispatch calls to get access to the toggleLike
    const toggle = mockStore.dispatch.mock.calls[1][0].props.action;
    Meteor.userId.mockReturnValueOnce("1234");
    const res = toggle();

    expect(res).toEqual({ type: "FALSY", payload: {} });
  });
});
