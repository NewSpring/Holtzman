
import { GivingActivity } from "../Activity";
import { mount } from "enzyme";
import { mountToJson } from "enzyme-to-json";

const mockFeedData = [
  {
    "id": "123",
    "date": "Thu Dec 01 2016 08:44:51 GMT-0500 (EST)",
    "summary": "Reference Number: 12345",
    "status": "Pending",
    "statusMessage": "Manually set to pending for testing",
    "schedule": null,
    "details": [{"amount": 1,"account": {"name": "General Fund"}}]
  },
  {
    "id": "456",
    "date": "Tue Nov 01 2016 07:53:00 GMT-0400 (EDT)",
    "summary": "Reference Number: 2355654",
    "status": "Failed",
    "statusMessage": "Manually set to failed for testing",
    "schedule": null,
    "details": [{"amount": 2,"account": {"name": "General Fund"}}]
  },
  {
    "id": "789",
    "date": "Mon Oct 03 2016 07:55:09 GMT-0400 (EDT)",
    "summary": "Reference Number: 76543",
    "status": null,
    "statusMessage": null,
    "schedule": null,
    "details": [{"amount": 3,"account": {"name": "General Fund"}}]
  },
  {
    "id": "111",
    "name": "Harambe's Card",
    "expirationYear": null,
    "expirationMonth": null
  }
];

const generateComponent = (additionalProps) =>
  <GivingActivity {...additionalProps} />;

describe("GivingActivity", () => {
  it("should render with minimal props", () => {
    const component = mount(generateComponent());
    expect(mountToJson(component)).toMatchSnapshot();
  });

  /**
   * this should be all that's needed, since the component only renders activityCards.
   * We just need to check for the correct props passed to the components.
   * Since the mock data covers all the possible statuses of transactions, this should
   * be fine.
   */
  it("should render with data", () => {
    const component = mount(generateComponent({
      feed: {userFeed: mockFeedData},
    }));
    expect(mountToJson(component)).toMatchSnapshot();
  });
});