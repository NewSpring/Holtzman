import { Error } from "../../../components/@primitives/UI/icons";

type IErrTemplate = {
  errorCode: number
};

const ErrTemplate = ({ errorCode }: IErrTemplate) => (
  <div className="soft soft-double-ends push-double-top@anchored one-whole text-center">
    <div className="push-double-top">
      <Error />
      <h3 className="text-alert push-ends">Location Error</h3>
      {errorCode < 1 ||
        (errorCode > 3 && (
          <p className="text-left">
            We were unable to find your current location. Check your connection to the network and
            try again. Or you can type in your zip code to find groups near you!
          </p>
        ))}
      {errorCode === 1 && (
        <p className="text-left">
          You&#39;ve turned off location services for this app. If you&#39;d like to use your
          current location, be sure to check your browser or device settings to enable location
          services.
        </p>
      )}
      {errorCode === 2 && (
        <p className="text-left">
          We were unable to find your current location. Check your connection to the network and try
          again. Or you can type in your zip code to find groups near you!
        </p>
      )}
      {errorCode === 3 && (
        <p className="text-left">
          The location service timed out so we couldn&#39;t get your location. This could be due to
          your connection or that your device doesn't support GPS. You can always type in your zip
          code to find groups near you!
        </p>
      )}
    </div>
  </div>
);

export default ErrTemplate;
