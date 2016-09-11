
import { Link } from "react-router";
import backgrounds from "../../util/backgrounds";
import content from "../../util/content";
import categories from "../../util/categories";

const hasImage = (content) => {
  return content.content.images.length > 0 ||
    (
      content.parent &&
      content.parent.content &&
      content.parent.content.images.length > 0
    );
};

// XXX right now this uses the content prop for everything
// it should less intelligent and use the other props directly
const MiniCard = ({ link, title, icon, type, images, description, content }) => (
  <Link to={content.links(content)} className="plain">
    <div className="card">
        <div className={`card__item soft push-half-ends ${hasImage(content) ? "two-thirds" : "one-whole"}`} style={{verticalAlign: "middle"}}>
          <h6 className="text-dark-primary capitalize">{title}</h6>

          {(() => {
            // if (!content) return;
            if (!description) return;
            return <p className="text-dark-primary">{description}</p>;
          })()}

          <div className="display-inline-block">
            {(() => {
              if (!content) return;
              // if (!icon) return;
              return <span className={`${categories.icon(content)} text-dark-tertiary`} />;
            })()}

            {(() => {
              if (!content) return;
              // if (!type) return;
              return <h7 className="text-dark-tertiary soft-half-left">{categories.name(content)}</h7>;
            })()}

          </div>

        </div>
        <div
            className="locked-ends locked-right card__image one-third background--fill"
            style={{
            verticalAlign: "middle",
            backgroundImage: `url('${backgrounds.image(content, { label: "2:1" })}')`
          }}
        />
    </div>

  </Link>
);

export default MiniCard;
