// @flow
/* eslint-disable react/no-danger */
type IStory = {
  image: string,
  heading?: string,
  name?: string,
  location?: string,
  content: string,
  contentClass?: string,
  linkUrl?: string,
  linkClass?: string,
  linkText?: string,
  overriddenHeader?: string,
};

/* eslint-disable max-len */
const Story = ({
  image,
  heading,
  name,
  location,
  content,
  contentClass,
  linkUrl,
  linkClass,
  linkText,
  overriddenHeader,
}: IStory) => (
  <div className="grid soft-double-bottom soft-double-top@lap-and-up">
    <div className="constrain-page">
      {image && (
        <div
          className="grid__item@lap-and-up one-quarter@lap-and-up push-bottom@lap-and-up soft-left@lap-and-up"
          style={{ verticalAlign: "middle", margin: "auto" }}
        >
          <div
            className="ratio--square background--fill round visuallyhidden@handheld"
            style={{ backgroundImage: `url('${image}')` }}
          >
            <div className="ratio__item" />
          </div>
        </div>
      )}
      <div
        className={`grid__item ${image &&
          "three-quarters@lap-and-up"} floating text-center text-left@lap-and-up`}
        style={{ verticalAlign: "middle" }}
      >
        {image && (
          <div
            className="ratio--square floating__item one-half background--fill round visuallyhidden@lap-and-up push-bottom"
            style={{ backgroundImage: `url('${image}')` }}
          >
            <div className="ratio__item" />
          </div>
        )}
        {overriddenHeader && (
          <h5
            dangerouslySetInnerHTML={{ __html: overriddenHeader }}
            className={`${String(
              contentClass, //eslint-disable-line
            )} soft-half-bottom soft-sides@handheld`}
            style={{ fontWeight: "900", fontFamily: "colfax, sans-serif" }}
          />
        )}
        {!overriddenHeader &&
          heading &&
          name &&
          location && (
            <h5
              className={`${String(
                contentClass, //eslint-disable-line
              )} soft-half-bottom soft-sides@handheld`}
              style={{ fontWeight: "400" }}
            >
              <strong style={{ fontFamily: "colfax, sans-serif" }}>
                {heading} {name} from {location}
              </strong>.
            </h5>
          )}
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          className={`${String(contentClass)} soft-sides@palm-wide`}
        />
        {linkUrl && (
          <p className="flush">
            <a href={linkUrl} className={linkClass || "btn"} target={"_blank"}>
              {linkText || "Learn More"}
            </a>
          </p>
        )}
      </div>
    </div>
  </div>
);
/* eslint-enable max-len */

export default Story;
