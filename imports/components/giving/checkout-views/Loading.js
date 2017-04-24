// @flow

import { WindowLoading, Spinner } from "../../@primitives/UI/loading";

const PREPARING_HEADER = "We're Preparing Your Contribution";
const PREPARING_TEXT = "Please don't close this window while your contribution is being prepared.";

const LOADING_HEADER = "We're Processing Your Contribution";
const LOADING_TEXT = "Please don't close this window while your contribution is being processed.";

const SAVED_HEADER = "We're Verifying Your Account";
const SAVED_TEXT = "Please don't close this window while your account is being verified.";

const SCHEDULE_HEADER = "We're Processing Your Schedule";
const SCHEDULE_TEXT = "Please don't close this window while your schedule is being processed.";


type ILoadingProps = {
  isSchedule?: boolean,
  isSavedPayment?: boolean,
  isPreparation?: boolean,
}
const Loading = ({ isSchedule, isSavedPayment, isPreparation }: ILoadingProps) => {
  let header = LOADING_HEADER;
  let text = LOADING_TEXT;

  if (isSchedule) {
    header = SCHEDULE_HEADER;
    text = SCHEDULE_TEXT;
  } else if (isSavedPayment) {
    header = SAVED_HEADER;
    text = SAVED_TEXT;
  } else if (isPreparation) {
    header = PREPARING_HEADER;
    text = PREPARING_TEXT;
  }

  return (
    <WindowLoading classes={["background--primary"]}>
      <div className="soft soft-double-ends push-double-top one-whole text-center">
        <div className="push-double-top">
          <Spinner styles={{ borderColor: "#fff #6BAC43 #fff #fff", borderWidth: "7px" }} />
          <h3 className="text-light-primary push-top">
            {header}
          </h3>
          <p className="text-light-primary">
            {text}
          </p>
        </div>
      </div>
    </WindowLoading>
  );
};

export default Loading;
