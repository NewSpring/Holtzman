
import { mount } from "enzyme";
import { mountToJson } from "enzyme-to-json";

import SavedPaymentLayout from "../SavedPaymentLayout";

const generateComponent = (additionalProps) =>
  <SavedPaymentLayout {...additionalProps}/>

it("should render with minimal props", () => {
  const component = mount(generateComponent());
  // console.log(component);
  // expect(mountToJson(component)).toMatchSnapshot();
});
