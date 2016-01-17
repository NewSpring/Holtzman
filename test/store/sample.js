import expect from "expect"
import modal from "../../core/store/modal/index.js"

describe("modal actions", () => {
  it("hide: create an action to hide the modal", () => {

    const expectedAction = {
      type: "MODAL.SET_VISIBILITY",
      visible: false
    }

    expect(modal.hide()).toEqual(expectedAction)
  })
})
