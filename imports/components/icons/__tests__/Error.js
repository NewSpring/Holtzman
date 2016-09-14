import renderer from 'react-test-renderer';
import Error from '../Error';

describe("Error Icon", () => {
  it("should exist", () => {
    const error = renderer.create(
      <Error />
    );
    expect(error).toBeDefined();
  });

  it("should match snapshot", () => {
    const error = renderer.create(
      <Error />
    );
    expect(error).toMatchSnapshot();
  });
});