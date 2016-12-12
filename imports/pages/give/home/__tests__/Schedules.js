
import { mount } from "enzyme";
import { mountToJson } from "enzyme-to-json";
import { SchedulesList } from "../Schedules";

const mockSchedules = {
  scheduledTransactions: [
    {
      "id": "12345678",
      "start": "2016-03-16",
      "details": [{ "account": { "name": "General Fund" }, "amount": 20 }],
      "transactions": [{"date": "2016-03-17"}],
      "schedule": { "description": "One Time" }
    },
    {
      "id": "7654",
      "start": "2016-03-16",
      "details": [{ "account": { "name": "Step Up Fund" }, "amount": 100 }],
      "transactions": [{"date": "2016-03-18"}],
      "schedule": { "description": "Once a Month" }
    },
    {
      "id": "8743456",
      "start": "2016-03-16",
      "details": [{ "account": { "name": "Christmas Offering" }, "amount": 50 }],
      "transactions": [],
      "schedule": { "description": "One Time" }
    }
  ]
};

const generateComponent = (additionalProps) =>
  <SchedulesList schedules={mockSchedules} />;

  describe ("Giving Schedules List", () => {
    it("should render with minimal props", () => {
      const component = mount(<SchedulesList />);
      expect(mountToJson(component)).toMatchSnapshot();
    });

    it ('should render properly with data', () => {
      const component = mount(generateComponent());
      expect(mountToJson(component)).toMatchSnapshot();
    });
  });
