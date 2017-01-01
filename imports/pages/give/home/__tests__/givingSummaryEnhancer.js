
import {formatGivingSummaryData} from "../givingSummaryEnhancer";

const mockGQLData = {
  "data": {
    "transactions": [
      {"id": "123456781", "date": "Tue Nov 01 2016 07:53:00 GMT-0400 (EDT)",
        "details": [{ "account": { "name": "General Fund"}, "amount": 1 }]},
      {"id": "123456782", "date": "Mon Oct 03 2016 07:55:09 GMT-0400 (EDT)",
        "details": [{ "account": { "name": "General Fund"}, "amount": 2 }]},
      {"id": "123456783", "date": "Thu Sep 01 2016 09:41:39 GMT-0400 (EDT)",
        "details": [{ "account": { "name": "General Fund"}, "amount": 3 }]},
      {"id": "123456784", "date": "Mon Aug 01 2016 13:13:31 GMT-0400 (EDT)",
        "details": [{ "account": { "name": "General Fund"}, "amount": 4 }]},
      {"id": "123456785", "date": "Fri Jul 01 2016 10:26:52 GMT-0400 (EDT)",
        "details": [{ "account": { "name": "General Fund"}, "amount": 5 }]},
      {"id": "123456786", "date": "Wed Jun 01 2016 07:51:23 GMT-0400 (EDT)",
        "details": [{ "account": { "name": "General Fund"}, "amount": 6 }]},
      {"id": "123456787", "date": "Fri May 13 2016 15:08:35 GMT-0400 (EDT)",
        "details": [{ "account": { "name": "General Fund"}, "amount": 7 }]},
      {"id": "12345678", "date": "Sat Apr 30 2016 09:50:11 GMT-0400 (EDT)",
        "details": [{ "account": { "name": "General Fund"}, "amount": 8 }]},
      {"id": "12345678", "date": "Sat Apr 30 2016 09:49:35 GMT-0400 (EDT)",
        "details": [{ "account": { "name": "General Fund"}, "amount": 9 }]},
      {"id": "12345678", "date": "Mon Apr 18 2016 15:42:15 GMT-0400 (EDT)",
        "details": [{ "account": { "name": "General Fund"}, "amount": 0 }]},
      {"id": "12345678", "date": "Fri Apr 01 2016 11:12:21 GMT-0400 (EDT)",
        "details": [{ "account": { "name": "General Fund"}, "amount": 1 }]},
      {"id": "12345678", "date": "Thu Mar 31 2016 09:30:01 GMT-0400 (EDT)",
        "details": [{ "account": { "name": "General Fund"}, "amount": 2 }]},
      {"id": "12345678", "date": "Thu Mar 03 2016 02:42:37 GMT-0500 (EST)",
        "details": [{ "account": { "name": "General Fund"}, "amount": 3 }]},
      {"id": "12345678", "date": "Tue Mar 01 2016 06:20:39 GMT-0500 (EST)",
        "details": [{ "account": { "name": "General Fund"}, "amount": 4 }]},
      {"id": "12345678", "date": "Sat Jan 30 2016 07:37:32 GMT-0500 (EST)",
        "details": [{ "account": { "name": "General Fund"}, "amount": 5 }]},
      {"id": "12345678", "date": "Fri Jan 01 2016 15:47:43 GMT-0500 (EST)",
        "details": [{ "account": { "name": "General Fund"}, "amount": 6 }] }
    ],
  }
}

describe ("data format", () => {
  it("should return null with no input", () => {
    const value = formatGivingSummaryData();
    expect(value).toEqual(null);
  });

  it ("should return an object with correct keys", () => {
    const value = formatGivingSummaryData(mockGQLData.data);
    expect(value).not.toEqual(null);
    expect(Array.isArray(value.chartData)).toEqual(true);
    expect(value.total).toBeDefined();
    expect(value.chartData.length).toBeDefined();
    expect(value.accounts).toBeDefined();

    expect(value).toMatchSnapshot();
  });
});
