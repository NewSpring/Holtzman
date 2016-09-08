import { PropTypes } from "react";

import { WindowLoading, Spinner } from "../../components/loading";

const Loading = ({ account }, context) => (
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

Loading.propTypes = {
  account: PropTypes.bool
};

Loading.defaultProps = {
  account: false
};

Loading.contextTypes = {
  shouldAnimate: PropTypes.bool
};

export default Loading;
