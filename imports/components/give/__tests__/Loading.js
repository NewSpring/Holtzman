import renderer from "react-test-renderer";
import { reset, startBuffering } from "aphrodite/lib/inject";
import Loading from "../Loading";

const generateComponent = () => (
  <Loading />
);

beforeEach(() => {
  reset();
  startBuffering();
});

afterEach(() => {
  reset();
});

it("renders", () => {
  const result = renderer.create(generateComponent());
  expect(result).toMatchSnapshot();
});
