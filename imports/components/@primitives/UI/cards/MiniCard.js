
// @flow

import { Link } from "react-router";

type IMiniCard = {
  title: string,
  description: string,
  icon: string,
  category: string,
  link: string,
  image: string,
};

const MiniCard = ({
  title,
  description,
  icon,
  category,
  link,
  image,
}: IMiniCard) =>
  <Link to={link} className="plain">
    <div className="card">
      <div className={`card__item soft push-half-ends ${image ? "two-thirds" : "one-whole"}`} style={{ verticalAlign: "middle" }}>
        <h6 className="text-dark-primary capitalize">{ title }</h6>

        { description && <p className="text-dark-primary">{ description }</p> }

        <div className="display-inline-block">
          { icon && <span className={`${icon} text-dark-tertiary`} /> }
          { category && <h7 className="text-dark-tertiary soft-half-left">{ category }</h7> }
        </div>

      </div>
      <div
        className="locked-ends locked-right card__image one-third background--fill"
        style={{ verticalAlign: "middle", backgroundImage: `url('${image}')` }}
      />
    </div>
  </Link>
;

export default MiniCard;
