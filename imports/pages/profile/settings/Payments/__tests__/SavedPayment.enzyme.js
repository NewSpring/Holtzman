import { render, mount } from "enzyme";
import SavedPayment from "../SavedPayment";


const sampleAccount = {
  name: "Test Card",
  id: "TEST",
  payment: {
    accountNumber: "41*********1111",
    paymentType: "Visa",
  }
}

it("masks all but the last four digits of a card", () => {
  const wrapper = render(
    <SavedPayment
      account={{...sampleAccount}}
      remove={() => {}}
    />
  );
  expect(wrapper.text()).toContain("**********");
  expect(wrapper.text()).toContain("1111");
});

it("runs a passed function when remove is clicked", () => {
  const remove = jest.fn();
  const wrapper = mount(
    <SavedPayment
      account={{...sampleAccount}}
      remove={remove}
    />
  );
  wrapper.find("button").simulate("click");
  expect(remove.mock.calls[0][0]).toEqual(sampleAccount.id);
});
