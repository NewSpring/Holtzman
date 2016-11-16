// @flow

import { WindowLoading, Spinner } from "../../components/loading";

const LOADING_HEADER = "We're Processing Your Contribution";
const LOADING_TEXT = "Please don't close this window while your contribution is being processed.";

const Loading = () => (
  <WindowLoading classes={["background--primary"]}>
    <div className="soft soft-double-ends push-double-top one-whole text-center">
      <div className="push-double-top">
        <Spinner styles={{ borderColor: "#fff #6BAC43 #fff #fff", borderWidth: "7px" }} />
        <h3 className="text-light-primary push-top">{LOADING_HEADER}</h3>
        <p className="text-light-primary">{LOADING_TEXT}</p>
      </div>
    </div>
  </WindowLoading>
);

export default Loading;
