/* eslint-disable */
import renderer from "react-test-renderer";

import Layout from "../Layout";

const sampleData = {
  "data": {
    "payment": {
      "icon": "Visa",
      "last4": "1112",
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

describe("GiveReview", () => {
  it("renders with no data", () => {
    const tree = renderer.create(
      <Layout
        transactions={""}
        total={0.0}
        data={""}
        onSubmit={() => {}}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("renders a transaction review", () => {
    const tree = renderer.create(
      <Layout
        transactions={sampleData.transactions}
        total={sampleData.total}
        data={sampleData.data}
        onSubmit={() => {}}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
