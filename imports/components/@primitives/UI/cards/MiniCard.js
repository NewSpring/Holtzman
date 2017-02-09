// @flow

// NPM based imports
import { Link } from "react-router";

// Project based imports
import backgrounds from "../../../../util/backgrounds";
import contentHelper from "../../../../util/content";
import categories from "../../../../util/categories";

const hasImage = (content = {}) =>
  content.content.images.length > 0 ||
    (
      content.parent &&
      content.parent.content &&
      content.parent.content.images.length > 0
    );

type IMiniCard = {
  title: string,
  content?: Object,
  description?: string,
  icon?: string,
  category?: string,
  link?: string,
  image?: string,
};

// XXX right now this uses the content prop for everything
// it should less intelligent and use the other props directly
// Unused props: icon, link, type, images
const MiniCard = ({
  title,
  description,
  content,
  icon,
  category,
  link,
  image,
}: IMiniCard) => (
  <Link to={link || contentHelper.links(content)} className="plain">
    <div className="card">
      <div className={`card__item soft push-half-ends ${image || hasImage(content) ? "two-thirds" : "one-whole"}`} style={{ verticalAlign: "middle" }}>
        <h6 className="text-dark-primary capitalize">{title}</h6>

        {description && <p className="text-dark-primary">{description}</p>}

        <div className="display-inline-block">
          {(content || icon) && <span className={`${icon || categories.icon(content)} text-dark-tertiary`} />}
          {(content || category) && <h7 className="text-dark-tertiary soft-half-left">{category || categories.name(content)}</h7>}
        </div>

      </div>
      <div
        className="locked-ends locked-right card__image one-third background--fill"
        style={{
          verticalAlign: "middle",
          backgroundImage: `url('${image || backgrounds.image(content, { label: "2:1" })}')`,
        }}
      />
    </div>

  </Link>
);

export default MiniCard;
