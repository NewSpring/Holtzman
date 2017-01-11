// @flow

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
  <div className="grid soft-double">
    <div className="constrain-page push-double@lap-and-up">
      {image && <div className="grid__item one-quarter@lap-and-up display-inline-block soft-double-right@lap-and-up push-double-bottom@handheld" style={{ verticalAlign: "middle" }}>
        <div className="ratio--square background--fill round" style={{ backgroundImage: `url('${image}')` }}>
          <div className="ratio__item" />
        </div>
      </div>}
      <div className={`grid__item ${image && "three-quarters@lap-and-up"} text-left display-inline-block`} style={{ verticalAlign: "middle" }}>
        {heading && name && location && <h4 style={{ fontWeight: "400" }}>{heading} <strong style={{ fontFamily: "colfax, sans-serif" }}>{name}</strong> from <strong style={{ fontFamily: "colfax, sans-serif" }}>{location}</strong>.</h4>}
        <div dangerouslySetInnerHTML={{ __html: content }} className={contentClass} />
        {linkUrl && <p>
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
