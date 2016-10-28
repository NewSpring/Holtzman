
import { initial } from "../";

import {
  addTransaction,
  clearTransaction,
  clearTransactions,
} from "../transactions";

it("allows for adding a single transaction", () => {
  const transactions = { 1: { value: 10 } };
  const changed = addTransaction(initial, { transactions });
  expect(changed).toMatchSnapshot();
  expect(changed.total).toEqual(10);
  expect(changed.transactions).toEqual(transactions);
});

it("allows for adding multiple transaction", () => {
  const transactions = { 1: { value: 10 }, 2: { value: 100 } };
  const changed = addTransaction(initial, { transactions });
  expect(changed).toMatchSnapshot();
  expect(changed.total).toEqual(110);
  expect(changed.transactions).toEqual(transactions);
});

it("removes transactions without correct values", () => {
  const transactions = { 1: { value: 10 }, 2: { value: "100" }};
  const changed = addTransaction(initial, { transactions });
  expect(changed).toMatchSnapshot();
  expect(changed.total).toEqual(10);
  expect(changed.transactions).toEqual({ 1: { value: 10 } });
});

it("allows for clearing a single transaction", () => {
  const transactions = { 1: { value: 10 } };
  const changed = clearTransaction({...initial, ...{ transactions }}, { transactionId: 1 });
  expect(changed).toMatchSnapshot();
  expect(changed.total).toEqual(0);
  expect(changed.transactions).toEqual({});
});

it("doesn't change if id isn't found in the store", () => {
  const transactions = { 1: { value: 10 } };
  const initialState = {
    ...initial,
    ...{ transactions, total: 10 }
  };
  const changed = clearTransaction(initialState, { transactionId: "TEST" });
  expect(changed).toMatchSnapshot();
  expect(changed).toEqual(initialState);
});

it("correctly updates the total after clearing a transaction", () => {
  const transactions = { 1: { value: 10 }, 2: { value: 100 }};
  const changed = clearTransaction({...initial, ...{ transactions }}, { transactionId: 2 });
  expect(changed).toMatchSnapshot();
  expect(changed.total).toEqual(10);
  expect(changed.transactions).toEqual({ 1: { value: 10 } });
});


it("allows reseting the transactions", () => {
  const transactions = { 1: { value: 10 }, 2: { value: 100 }};
  const changed = clearTransactions({...initial, ...{ transactions }}, { transactionId: 2 });
  expect(changed).toMatchSnapshot();
  expect(changed.total).toEqual(0);
  expect(changed.transactions).toEqual({});
});
