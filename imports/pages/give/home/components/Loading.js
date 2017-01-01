// @flow

import { WindowLoading, Spinner } from "../../../../components/@primitives/UI/loading";

const UPDATE_HEADER = "We're Updating Your Saved Account";
const UPDATE_TEXT = "Please don't close this window while we update your account details";


const CANCEL_HEADER = "We're Removing Your Saved Account";
const CANCEL_TEXT = "Please don't close this window while we remove your account details";

type ILoadingProps = {
  type: string,
}

export default ({ type }: ILoadingProps) => (
  <WindowLoading classes={["background--primary"]}>
    <div className="soft soft-double-ends push-double-top one-whole text-center">
      <div className="push-double-top">
        <Spinner styles={{ borderColor: "#fff #6BAC43 #fff #fff", borderWidth: "7px" }} />
        <h3 className="text-light-primary push-top">
          {type === "update" ? UPDATE_HEADER : CANCEL_HEADER}
        </h3>
        <p className="text-light-primary">
          {type === "update" ? UPDATE_TEXT : CANCEL_TEXT}
        </p>
      </div>
    </div>
  </WindowLoading>
);
