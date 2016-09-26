import renderer from "react-test-renderer";
import AccountIcons from "../Accounts";

describe("Account Icons", () => {
  describe("AmEx Icon", () => {
    it("should exist", () => {
      const amEx = renderer.create(
        <AccountIcons.AmEx />
      );
      expect(amEx).toBeDefined();
    });

    it("should match snapshot", () => {
      const amEx = renderer.create(
        <AccountIcons.AmEx />
      );
      expect(amEx).toMatchSnapshot();
    });
  });

  describe("Visa Icon", () => {
    it("should exist", () => {
      const visa = renderer.create(
        <AccountIcons.Visa />
      );
      expect(visa).toBeDefined();
    });

    it("should match snapshot", () => {
      const visa = renderer.create(
        <AccountIcons.Visa />
      );
      expect(visa).toMatchSnapshot();
    });
  });

  describe("Discover Icon", () => {
    it("should exist", () => {
      const discover = renderer.create(
        <AccountIcons.Discover />
      );
      expect(discover).toBeDefined();
    });

    it("should match snapshot", () => {
      const discover = renderer.create(
        <AccountIcons.Discover />
      );
      expect(discover).toMatchSnapshot();
    });
  });

  describe("MasterCard Icon", () => {
    it("should exist", () => {
      const masterCard = renderer.create(
        <AccountIcons.MasterCard />
      );
      expect(masterCard).toBeDefined();
    });

    it("should match snapshot", () => {
      const masterCard = renderer.create(
        <AccountIcons.MasterCard />
      );
      expect(masterCard).toMatchSnapshot();
    });
  });

  describe("Bank Icon", () => {
    it("should exist", () => {
      const bank = renderer.create(
        <AccountIcons.Bank />
      );
      expect(bank).toBeDefined();
    });

    it("should match snapshot", () => {
      const bank = renderer.create(
        <AccountIcons.Bank />
      );
      expect(bank).toMatchSnapshot();
    });
  });
});
