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
}: IStory) => (
  <div className="grid soft-double-bottom soft-double-top@lap-and-up">
    <div className="constrain-page">
      {image && <div className="grid__item@lap-and-up one-third@lap-and-up display-inline-block soft-right@lap-and-up push-bottom@lap-and-up" style={{ verticalAlign: "middle" }}>
        <div className="ratio--square background--fill round visuallyhidden@handheld" style={{ backgroundImage: `url('${image}')` }}>
          <div className="ratio__item" />
        </div>
      </div>}
      <div className={`grid__item ${image && "two-thirds@lap-and-up"} floating text-center text-left@lap-and-up display-inline-block`} style={{ verticalAlign: "middle" }}>
        {heading && name && location && <h5 className={`${String(contentClass)} soft-half-bottom soft-sides@handheld`} style={{ fontWeight: "400" }}>{heading} <strong style={{ fontFamily: "colfax, sans-serif" }}>{name}</strong> from <strong style={{ fontFamily: "colfax, sans-serif" }}>{location}</strong>.</h5>}
        {image && <div className="ratio--square floating__item one-half background--fill round visuallyhidden@lap-and-up push-bottom" style={{ backgroundImage: `url('${image}')` }}>
          <div className="ratio__item" />
        </div>}
        <div dangerouslySetInnerHTML={{ __html: content }} className={`${String(contentClass)} soft-sides@palm-wide`} />
        {linkUrl && <p className="flush">
          <a
            href={linkUrl}
            className={linkClass || "btn"}
          >
            {linkText || "Learn More"}
          </a>
          </p>}
      </div>
    </div>
  </div>
);
/* eslint-enable max-len */

export default Story;
