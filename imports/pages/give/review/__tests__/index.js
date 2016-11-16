/* eslint-disable */
import { Component } from "react";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { reset, startBuffering } from "aphrodite/lib/inject";

import { Template } from "../";

export const sampleData = {
  "data": {
    "payment": {
      "icon": "Visa",
      "type": "cc"
    },
    "personal": {
      "campus": "Web",
      "campusId": 20,
      "email": "web@newspring.cc",
      "firstName": "Jeff",
      "lastName": "Goldblumm"
    }
  },
  "savedAccount": {
    "date": null,
    "id": 18376,
    "name": "Jeff%27s%20NS%20Visa",
    "payment": {
      "accountNumber": "411111******1112",
      "paymentType": "Visa"
    }
  },
  "total": 1,
  "transactions": {
    "125": {
      "label": "General%20Fund",
      "value": 1
    }
  },
  "url": false,
  "userId": "jY4RT2WK55yKYtj4y"
};

describe("GiveReviewTemplate", () => {
  beforeEach(() => {
    reset();
    startBuffering();
  })
  afterEach(() => {
    reset();
  });

  it("returns <Loading /> component based on state", () => {
    const giveData = {
      "give": {
        "state": "loading",
        ...sampleData,
      },
      "dispatch": jest.fn()
    };

    window.location = { "search": `giveData=${sampleData}`};

    const tree = shallow(
      <Template {...giveData} />
    );
    expect(shallowToJson(tree)).toMatchSnapshot();
    delete window.location;
  });

  it("returns <Success /> component based on state", () => {
    const giveData = {
      "give": {
        "state": "success",
        ...sampleData,
      },
      "dispatch": jest.fn()
    };

    window.location = { "search": `giveData=${sampleData}`};

    const tree = shallow(
      <Template {...giveData} />
    );
    expect(shallowToJson(tree)).toMatchSnapshot();
    delete window.location;
  });

  it("returns <Error /> component based on state", () => {
    const giveData = {
      "give": {
        "state": "error",
        ...sampleData,
        "errors":[
          {"error": "must go faster!"}
        ]
      },
      "dispatch": jest.fn()
    };

    window.location = { "search": `giveData=${sampleData}`};

    const tree = shallow(
      <Template {...giveData} />
    );
    expect(shallowToJson(tree)).toMatchSnapshot();
    delete window.location;
  });

  it("returns <Layout /> component based on state", () => {
    const giveData = {
      "give": {
        "state": "done",
        ...sampleData,
      },
      "dispatch": jest.fn()
    };

    window.location = { "search": `giveData=${sampleData}`};
    const tree = shallow(
      <Template {...giveData} />
    );
    expect(shallowToJson(tree)).toMatchSnapshot();
    delete window.location;
  });
});
