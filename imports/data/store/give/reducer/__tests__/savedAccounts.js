
import { initial } from "../";

import savedAccount from "../savedAccounts";

it("allows adding a saved account", () => {
  const changed = savedAccount(initial, { savedAccount: "add" });
  expect(changed).toMatchSnapshot();
  expect(changed).toEqual({...initial, ...{ savedAccount: "add" }});
});


it("allows clearing a saved account", () => {
  const initialState = {...initial, ...{ savedAccount: "add" }}
  const changed = savedAccount(initialState, { savedAccount: "clear" });
  expect(changed).toMatchSnapshot();
  expect(changed).toEqual(initial);
});
