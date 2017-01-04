
import { GivingActivity } from "../Activity";
import { mount } from "enzyme";
import { mountToJson } from "enzyme-to-json";

jest.mock("../GivingSummary", () => "GivingSummary");

const mockFeedData = [
  {
    "id": "123",
    "date": "2016-12-01",
    "summary": "Reference Number: 12345",
    "status": "Pending",
    "statusMessage": "Manually set to pending for testing",
    "schedule": null,
    "details": [{"amount": 1,"account": {"name": "General Fund"}}]
  },
  {
    "id": "456",
    "date": "2016-11-01",
    "summary": "Reference Number: 2355654",
    "status": "Complete",
    "statusMessage": "Manually set to failed for testing",
    "schedule": null,
    "details": [{"amount": 2,"account": {"name": "General Fund"}}]
  },
  {
    "id": "457",
    "date": "2016-11-01",
    "summary": "Reference Number: 2355654",
    "status": "Failed",
    "statusMessage": "Manually set to failed for testing",
    "schedule": null,
    "details": [{"amount": 2,"account": {"name": "General Fund"}}]
  },
  {
    "id": "789",
    "date": "2016-10-03",
    "summary": "Reference Number: 76543",
    "status": null,
    "statusMessage": null,
    "schedule": null,
    "details": [{"amount": 3,"account": {"name": "General Fund"}}, {"amount": 2,"account": {"name": "Harambe Fund"}}]
  },
  {
    "id": "890",
    "date": "2016-09-03",
    "summary": "Reference Number: 89098",
    "status": null,
    "statusMessage": null,
    "schedule": null,
    "details": [{"amount": 0,"account": {"name": "General Fund"}}, {"amount": 0,"account": {"name": "Harambe Fund"}}]
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
  it("should render with minimal props and display no activity placeholder", () => {
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
      feed: { userFeed: mockFeedData },
    }));
    expect(mountToJson(component)).toMatchSnapshot();
  });
});
