import { shallow } from "enzyme";
import Layout from "../Layout";

const defaultProps = {
  "data": {
    "payment": {},
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


const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Layout { ...newProps } />;
};

it("buttonText returns `Give Now` if no payment", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().buttonText();
  expect(result).toBe("Give Now");
});

it("buttonText returns `Give Now using 1112` if payment", () => {
  const wrapper = shallow(generateComponent({
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
  }));
  const result = wrapper.instance().buttonText();
  expect(result).toBe("Give Now using 1112");
});
