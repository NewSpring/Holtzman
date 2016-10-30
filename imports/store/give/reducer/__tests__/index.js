
import reducer, { initial } from "../";
import actions from "../../actions";

it("has a known initial state", () => {
  expect(initial).toMatchSnapshot();
});

it("allows saving data", () => {
  const changed = reducer(initial, actions.save({
    personal: { firstName: "James" },
    billing: { address1: "Home" },
    payment: { accountNumber: "7" },
  }));
  expect(changed).toMatchSnapshot();
});

it("doesn't change state when removing if missing info", () => {
  const changed = reducer(initial, actions.save({
    personal: { firstName: "James" },
    billing: { address1: "Home" },
    payment: { accountNumber: "7" },
  }));
  const cleared = reducer(changed, actions.clear("personal", "firstNme" ));
  expect(cleared).toMatchSnapshot();
  expect(cleared).toEqual(changed);
});

it("allows clearing individual data fields", () => {
  const changed = reducer(initial, actions.save({
    personal: { firstName: "James" },
    billing: { address1: "Home" },
    payment: { accountNumber: "7" },
  }));
  const cleared = reducer(changed, actions.clear("personal", "firstName"));
  expect(cleared).toMatchSnapshot();
  expect(cleared.data.personal.firstName).toBeFalsy();
});

it("allows clearing all data", () => {
  const changed = reducer(initial, actions.save({
    personal: { firstName: "James" },
    billing: { address1: "Home" },
    payment: { accountNumber: "7" },
  }));
  const cleared = reducer(changed, actions.clearData());
  expect(cleared).toMatchSnapshot();
  expect(cleared).toEqual(initial);
});
