import renderer from 'react-test-renderer';
import Success from '../Success';

describe("Success Icon", () => {
  it("should exist", () => {
    const success = renderer.create(
      <Success />
    );
    expect(success).toBeDefined();
  });

  it("should match snapshot", () => {
    const success = renderer.create(
      <Success />
    );
    expect(success).toMatchSnapshot();
  });
});