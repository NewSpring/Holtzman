import PropTypes from "react";
import { Link } from "react-router";
import backgrounds from "../../util/backgrounds";
import contentHelper from "../../util/content";
import categories from "../../util/categories";

const hasImage = (content) =>
  content.content.images.length > 0 ||
    (
      content.parent &&
      content.parent.content &&
      content.parent.content.images.length > 0
    );

// XXX right now this uses the content prop for everything
// it should less intelligent and use the other props directly
// Unused props: icon, link, type, images
const MiniCard = ({ title, description, content, icon, category }) => (
  <Link to={contentHelper.links(content)} className="plain">
    <div className="card">
      <div className={`card__item soft push-half-ends ${hasImage(content) ? "two-thirds" : "one-whole"}`} style={{ verticalAlign: "middle" }}>
        <h6 className="text-dark-primary capitalize">{title}</h6>

        {description && <p className="text-dark-primary">{description}</p>}

        <div className="display-inline-block">
          {(content && !icon) && <span className={`${categories.icon(content)} text-dark-tertiary`} />}
          {(content && !category) && <h7 className="text-dark-tertiary soft-half-left">{categories.name(content)}</h7>}
        </div>

      </div>
      <div
        className="locked-ends locked-right card__image one-third background--fill"
        style={{
          verticalAlign: "middle",
          backgroundImage: `url('${backgrounds.image(content, { label: "2:1" })}')`,
        }}
      />
    </div>

  </Link>
);

MiniCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  content: PropTypes.object.isRequired, // eslint-disable-line
  icon: PropTypes.string,
  category: PropTypes.string,
};

export default MiniCard;
