
import { mount, shallow } from "enzyme";
import { mountToJson } from "enzyme-to-json";
import { reset, startBuffering } from "aphrodite/lib/inject";
import { getSingleSpecWrapper } from "../../../../util/tests/data-spec.js";

import { SubFund, withRedux } from "../";

// see the first test
jest.mock("react-redux", () => ({
  connect: jest.fn((props, dispatch) => jest.fn((MyComp) => <MyComp {...dispatch} />)),
}));

const generateComponent = (additionalProps={}) => {
  const defaultProps = {
    // state: {
    //   id: "test",
    //   fund: "main",
    // },
    // preFill: () => {},
    accounts: [{value: "main fund"}],
  };

  return <SubFund {...defaultProps} {...additionalProps} />
};

beforeEach(() => {
  reset();
  startBuffering();
});

afterEach(() => {
  reset();
});

describe("withRedux", () => {
  /*
  *   SubFund relies on give actions to be passed in using withRedux.
  *   This tests to make sure that this is happening on a stub component
  */
  it ("should include all the give actions", () => {
    const Stub = (dispatch) => {
      expect(dispatch).toMatchSnapshot();
      return null;
    }
    const stub = withRedux(Stub);
    shallow(stub);
  });

  /*
  *  if mapStateToProps existed...
  */
  // export const withRedux = connect((state) => ({ foo: state.give }), giveActions);
  // it("has the correct mapStateToProps", () => {
  //   // some kind of reset mocks should fix this to be [0][0]
  //   const mapStateToProps = connect.mock.calls[4][0]
  //   // console.log(connect.mock.calls[4][0])
  //   expect(mapStateToProps({ give: true })).toMatchSnapshot();
  // })
});

describe ("SubFund", () => {

  //this renders a non-primary input
  it("should render with minimal props", () => {
    const component = mount(generateComponent());

    //must reset the id state. It's based off the datetime
    component.setState({id: "test-id-reset"});

    expect(mountToJson(component)).toMatchSnapshot();
    expect(component.find("Layout").length).toEqual(1);
    expect(component.find("Primary").length).toEqual(0);
  });

  it ("should render primary fund", () => {
    const component = mount(generateComponent({
      primary: true,
      update: () => {},
      preFill: () => {},
    }));

    //must reset the id state. It's based off the datetime
    component.setState({id: "test-id-reset"});

    expect(mountToJson(component)).toMatchSnapshot();
    expect(component.find("Layout").length).toEqual(0);
    expect(component.find("Primary").length).toEqual(1);
  });







});
