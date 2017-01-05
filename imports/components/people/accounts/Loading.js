// @flow
import { WindowLoading, Spinner } from "../../@primitives/UI/loading";

const Loading = ({ account }: { account: bool }) => (
  <WindowLoading classes={["background--primary"]}>
    <div className="locked-top locked-bottom one-whole floating">
      <div className="floating__item">
        <Spinner />

        {(() => {
          if (account) {
            return (
              <h4 className="text-light-primary">Signing you in...</h4>
            );
          }

          return (
            <h4 className="text-light-primary">Creating your account</h4>
          );
        })()}

      </div>
    </div>
  </WindowLoading>
);

Loading.defaultProps = {
  account: false,
};

export default Loading;
