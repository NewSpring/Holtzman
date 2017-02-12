/* eslint-disable */

import { Component } from "react";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { SECURITY_ROLES_QUERY, canSee, authorized } from "../";

it("has a valid query", () => {
  expect(SECURITY_ROLES_QUERY).toMatchSnapshot();
});

it("is renders a wrapper function", () => {
  expect(canSee(["Staff"])).toMatchSnapshot();
});

it("filters data from graphql", () => {
  const data = {
    currentPerson: {
      roles: [
        {
          name: "WoW"
        },
        {
          name: "Jenkins"
        }
      ]
    }
  };

  const isAuthorized = authorized(data, ["Staff"]);
  expect(isAuthorized).toBeFalsy();
});

it("sets authorized to true if group is matched", () => {
  const data = {
    currentPerson: {
      roles: [
        {
          name: "WoW"
        },
        {
          name: "Jenkins"
        }
      ]
    }
  };

  const isAuthorized = authorized(data, ["WoW"]);
  expect(isAuthorized).toBeTruthy();
});

it("expects an exact match", () => {
  const data = {
    currentPerson: {
      roles: [
        {
          name: "WoW"
        },
        {
          name: "Super Secret Group"
        }
      ]
    }
  };

  const isAuthorized = authorized(data, ["Super"]);
  expect(isAuthorized).toBeFalsy();
});

it("returns false if no person", () => {
  const data = {
    currentPerson: {}
  };

  const isAuthorized = authorized(data, ["Super"]);
  expect(isAuthorized).toBeFalsy();
});
