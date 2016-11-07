
import { mount, shallow } from "enzyme";
import { mountToJson } from "enzyme-to-json";
import { reset, startBuffering } from "aphrodite/lib/inject";
import { getSingleSpecWrapper } from "../../../../util/tests/data-spec.js";

import SubFund, { withRedux } from "../";

console.log(SubFund);

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
    // accounts: [{value: "main fund"}],
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


  it ("should render nothing if no accounts are passed in", () => {
    const component = mount(generateComponent());

  });

