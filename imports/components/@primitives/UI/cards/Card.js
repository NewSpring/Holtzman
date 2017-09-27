
// @flow
import { Link } from "react-router";
// $FlowMeteor
import { ifElse, compose, join, flatten, append, merge, identity, concat } from "ramda";

import { ImageLoader } from "../../UI/loading";

type IWrapper = { children: Object };
export const Wrapper = (props: IWrapper) => <div {...props}>{props.children}</div>;

export const createItemClasses = (itemClasses?: [string], linkAll: boolean): string =>
  compose(
    join(" "),
    flatten,
    ifElse(() => itemClasses, append(itemClasses), x => x),
    ifElse(() => linkAll, append("background--light-primary"), x => x),
  )(["card__item", "soft", "text-center", "soft-double-ends"]);

export const cardClasses = (classes: [string]): string =>
  compose(
    join(" "),
    flatten,
    ifElse(() => classes, append(classes), x => x),
  )(["card"]);

export const createStyles = (linkAll: boolean): Object =>
  compose(
    ifElse(() => linkAll, merge({ color: "inherit", textDecoration: "none" }), x => x),
  )({ overflow: "hidden", display: "block" });

export const imageStyles = (full: boolean, url: string): Object =>
  ifElse(() => full, () => ({ backgroundImage: `url('${url}')` }), () => ({}))();

export const preloader = (imageClasses: [?string] = []) => (): Object =>
  <div className={`${join(" ")(imageClasses)}`}><div className="ratio__item" /></div>;

export const renderActualElement = (imageClasses: [?string] = [], style: Object): Object =>
  <div className={join(" ")(imageClasses)} style={style}><div className="ratio__item" /></div>;

// context from ImageLoader
function renderElement() { return renderActualElement(this.imageclasses, this.style); }

// string -> [String] -> string -> boolean -> ([string] -> Object -> Object<ReactComponent>) ->
//  ([string] -> Object<ReactComponent>) -> Object<ReactComponent>
export const createImage = (
  ratio: string,
  imageClasses: [string],
  url: string,
  full: boolean,
  renderer: Function,
  loader: Function,
) =>
  compose(
    classes =>
      (<ImageLoader
        src={url}
        imageclasses={classes}
        renderElement={renderer}
        preloader={loader ? loader(classes) : null}
        style={full !== true ? ({ backgroundImage: `url('${url}')` }) : ({})}
        data-spec="card-image-loader"
      />),
    flatten,
    ifElse(() => imageClasses, append(imageClasses), identity),
    ifElse(() => ratio, append(`ratio--${ratio}`), append("ratio--landscape")),
  )(["background--fill", "card__image", "background-light-tertiary"]);

// boolean -> string -> strng
export const createWrapperClasses = (mobile?: boolean) => compose(
  concat("plain "),
  ifElse(() => mobile === false, append("visuallyhidden@handheld "), x => x),
);

type ICard = {
  classes: [string],
  theme?: string,
  link: string,
  image: Object,
  styles?: Object,
  children?: Object,
  itemClasses?: any, // string/[string]
  linkAll: boolean,
  imageclasses: [string],
  itemTheme: string,
  itemStyles: Object,
  mobile?: boolean,
  wrapperClasses: string,
  onClick?: (e: Event) => void,
};

type IImage = {
  url: string,
  ratio: string,
  full: boolean
};

export default ({
  classes,
  theme,
  link,
  image = {},
  styles,
  children,
  itemClasses,
  linkAll,
  imageclasses,
  itemTheme,
  itemStyles,
  mobile,
  wrapperClasses,
  onClick,
}: ICard): any => {
  const { url, ratio, full }: IImage = image;

  if (linkAll) {
    return (
      <Link
        data-spec="card"
        className={theme || cardClasses(classes)}
        style={styles || createStyles(linkAll)}
        to={link}
        onClick={onClick}
      >
        <div
          className={createWrapperClasses(mobile)(wrapperClasses)}
          style={imageStyles(image ? full : false, image ? url : "")}
          data-spec="card-image-wrapper"
        >
          {createImage(ratio, imageclasses, url, full, renderElement, preloader)}
        </div>
        <div
          className={itemTheme || createItemClasses(itemClasses, linkAll)}
          style={itemStyles}
          data-spec="card-item"
        >
          {children}
        </div>
      </Link>
    );
  }

  return (
    <div
      data-spec="card"
      className={theme || cardClasses(classes)}
      style={styles || createStyles(linkAll)}
    >
      {
        link ?
          <Link className={createWrapperClasses(mobile)(wrapperClasses)} to={link} data-spec="card-image-wrapper">
            {createImage(ratio, imageclasses, url, full, renderElement, preloader)}
          </Link>
        :
          <div className={createWrapperClasses(mobile)(wrapperClasses)} data-spec="card-image-wrapper">
            {createImage(ratio, imageclasses, url, full, renderElement, preloader)}
          </div>
      }
      <div
        className={itemTheme || createItemClasses(itemClasses, linkAll)}
        style={itemStyles}
        data-spec="card-item"
      >
        {children}
      </div>
    </div>
  );
};
