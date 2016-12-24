// @flow

import Card from "./index";
import styles from "../../util/styles";
import backgrounds from "../../util/backgrounds";
import content from "../../util/content";
import collections from "../../util/collections";
import categories from "../../util/categories";
import time from "../../util/time";

const isCollectionChild = (channelName) => (
  channelName === "sermons" || channelName === "study_entries"
);

const isCollectionParent = (channelName) => (
  channelName === "series_newspring" || channelName === "studies"
);

const getImage = (item: Object) => {
  if (isCollectionChild(item.channelName) && item.parent) {
    if (item.content.images.length > 0) return backgrounds.image(item);
    return backgrounds.image(item.parent);
  }
  return backgrounds.image(item);
};

const isCollectionItem = (item: Object): boolean => {
  const { channelName } = item;
  return (isCollectionChild(channelName) || isCollectionParent(channelName));
};

const isLight = (item: Object): boolean => {
  if (!isCollectionItem(item)) return true;
  const { channelName } = item;
  if (isCollectionChild(channelName) && item.parent) return item.parent.content.isLight;
  return item.content.isLight;
};

const overlayStyles = (item: Object): string => {
  const { channelName } = item;
  if (isCollectionChild(channelName) && item.parent) return styles.overlay(item.parent);
  return styles.overlay(item);
};

const cardClasses = (item: Object): string[] => {
  let classes = [];

  if (isCollectionItem(item)) {
    classes = classes.concat(["rounded"]);
  } else {
    classes.push("rounded-top");
  }

  return classes;
};

const itemTheme = (item: Object): string => {
  const classes = [
    "card__item",
    "soft",
    "text-center",
    "soft-bottom",
    "rounded-bottom",
  ];

  if (isCollectionItem(item)) {
    classes.push("overlay__item", "outlined--none", "soft-half-top");
  } else {
    classes.push("soft-top");
  }
  return classes.join(" ");
};

const h4Classes = (item: Object): string => ([
  !isLight(item) ? "text-light-primary" : "text-dark-primary",
  "capitalize",
].join(" "));

const categoryClasses = (item: Object): string => (
  !isLight(item) ? "text-light-primary" : "text-dark-secondary"
);

const timeClasses = (item: Object): string => {
  const classes = ["text-right", "float-right", "flush-bottom"];
  if (!isLight(item)) {
    classes.push("text-light-primary");
  } else {
    classes.push("text-dark-secondary");
  }
  return classes.join(" ");
};

const iconClasses = (item: Object): string => {
  let classes = `soft-half-right ${categories.icon(item)} `;
  classes += !isLight(item) ? "text-light-primary" : "text-dark-secondary";
  return classes;
};

const wrapperClasses = (item: Object): string => {
  const classes = ["background--fill"];
  if (isCollectionItem(item)) {
    const { channelName } = item;
    let collection;
    if (isCollectionChild(channelName)) {
      collection = item.parent;
    } else {
      collection = item;
    }

    if (collection) {
      const collectionClass = collections.classes(collection);
      if (collectionClass) classes.push(collections.classes(collection));
    }

    classes.push("overlay--gradient");
  }
  return classes.join(" ");
};

const itemStyles = (item: Object): Object => {
  if (!isCollectionItem(item)) return {};

  const { channelName } = item;
  let collection;
  if (isCollectionChild(channelName)) {
    collection = item.parent;
  } else {
    collection = item;
  }

  if (!collection) return {};
  const color = collection.content.colors[0] && collection.content.colors[0].value;
  if (!color) return {};

  return {
    backgroundColor: `#${color}`,
  };
};

type IFeedItem = {
  item: Object,
};

const FeedItem = ({
  item,
}: IFeedItem) => (
  <Card
    link={content.links(item)}
    classes={cardClasses(item)}
    imageclasses={["rounded-top"]}
    image={{ url: getImage(item), ratio: "square", full: isCollectionItem(item) }}
    itemTheme={itemTheme(item)}
    wrapperClasses={wrapperClasses(item)}
    itemStyles={itemStyles(item)}
    linkAll
  >
    <style>{overlayStyles(item)}</style>

    <div className="text-left">
      <h4 className={h4Classes(item)}>{item.title}</h4>
      <i className={iconClasses(item)} />
      <h7 className={categoryClasses(item)}>{categories.name(item)}</h7>
      <h7 style={{ marginTop: "5px" }} className={timeClasses(item)}>{time.relative(item)}</h7>
    </div>
  </Card>
);

export default FeedItem;
