import renderer from "react-test-renderer";
import Layout from "../Layout";
import { reset, startBuffering } from "aphrodite/lib/inject";

const details = [
  {
    name: "Test Card",
    id: "TEST",
    payment: {
      accountNumber: "41*********1111",
      paymentType: "Visa",
    }
  }
];

beforeEach(() => {
  reset();
  startBuffering();
})
afterEach(() => {
  reset();
});

it("renders a loading state while waiting on data", () => {
  window.__meteor_runtime_config__ = {};

  const tree = renderer.create(
    <Layout
     loading={true}
     remove={jest.fn()}
     details={details}
    />
  );
  expect(tree).toMatchSnapshot();
});

it("correctly renders empty accounts", () => {
  window.__meteor_runtime_config__ = {};

  const tree = renderer.create(
    <Layout
     loading={false}
     remove={jest.fn()}
     details={null}
    />
  );
  expect(tree).toMatchSnapshot();
});

it("correctly renders account info", () => {
  window.__meteor_runtime_config__ = {};

  const tree = renderer.create(
    <Layout
     loading={false}
     remove={jest.fn()}
     details={details}
    />
  );
  expect(tree).toMatchSnapshot();
});
