// @flow
import { Link } from "react-router";

import categories from "../../../../util/categories";
import time from "../../../../util/time";

export function isReady(content: Object) {
  if (!content) return false;
  return Object.keys(content).length;
}

export function getTimeStampStyles() {
  const styles = {
    marginTop: "5px",
  };

  return styles;
}

export function getIconClasses(content: Object) {
  if (isReady(content)) {
    let iconClasses = "text-light-primary soft-half-right";
    iconClasses = iconClasses += ` ${categories.icon(content)}`;
    return iconClasses;
  }
  return null;
}

export function getImage(images: Object, label: string = "2:1") {
  let selectedImage = "";
  if (!Array.isArray(images)) return "";
  for (const image of images) {
    if (image.fileLabel === label) {
      selectedImage = image.url;
      break;
    }
    selectedImage = image.url;
  }
  return selectedImage;
}

type IHeroLink = {
  to: string,
  children?: any,
};

const HeroLink = (props: IHeroLink) => {
  if (!props.to) return <Link>{props.children}</Link>;

  // external link
  if (props.to.includes("http://") || props.to.includes("https://")) {
    return <a href={props.to}>{props.children}</a>;
  }

  // internal link
  return <Link to={props.to}>{props.children}</Link>;
};

type IHero = {
  content: Object,
  title?: string,
  hideDate?: boolean,
  link?: string,
  image?: string,
}

const Hero = ({
  content,
  title,
  hideDate,
  link,
  image,
}: IHero) => (
  <HeroLink
    to={link || (content && content.meta && content.meta.urlTitle)}
  >
    <section
      className={
        `hard floating--bottom text-left background--dark-primary ratio--square
        ${content && content.content && content.content.images
          ? "background--fill overlay--gradient"
          : ""}`
      }
      style={{
        backgroundImage: `
          url('${image || getImage(content && content.content && content.content.images, "1:1")}')
        `,
      }}
    >
      <div className="one-whole overlay__item floating__item soft">
        <h3 className="text-light-primary flush soft-half-bottom capitalize">
          {title || (content ? content.title : null)}
        </h3>
        <i className={getIconClasses(content)} />
        <h7 className="text-light-primary">
          {isReady(content) ? categories.name(content) : ""}
        </h7>
        {
          (content && !hideDate) &&
          <h7
            className="text-light-primary text-right float-right"
            style={{ marginTop: "5px" }}
          >
            {isReady(content) ? time.relative(content) : ""}
          </h7>
        }
      </div>
    </section>
  </HeroLink>
);

export default Hero;
