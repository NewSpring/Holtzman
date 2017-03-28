// @flow

import contentHelper from "../../../util/content";
import categories from "../../../util/categories";
import { MiniCard } from "../../@primitives/UI/cards";

export function getImage(images: [Object], label: string = "2:1") {
  if (!images || !images.length) return "";
  let selectedImage = "";

  for (const image of images) {
    if (image.fileLabel === label) {
      selectedImage = image.url;
      break;
    }
    selectedImage = image.url;
  }
  return selectedImage;
}

/* eslint-disable no-underscore-dangle */
const renderLikes = (likes: [Object]) => {
  if (!Array.isArray(likes)) return undefined;
  return likes.map((item, i) => {
    let formatted;
    if (item.__typename === "Content") {
      // if the item has an image, default to it. If not, use the parent.
      // if the parent doesn't have images, pass empty array to getImage()
      let images;
      if (!item.content || !item.content.images || item.content.images.length === 0) {
        if (item.parent && item.parent.content && item.parent.content.images) {
          images = item.parent.content.images;
        } else {
          images = [{}];
        }
      } else {
        images = item.content.images;
      }

      formatted = {
        title: item.title,
        image: getImage(images, "1:1"),
        icon: categories.icon(item),
        category: categories.name(item),
        link: contentHelper.links(item),
      };
    } else if (item.__typename === "Group") {
      formatted = {
        title: item.name,
        image: item.photo,
        icon: "icon-groups",
        category: "Groups",
        link: `/groups/${item.id}`,
      };
    }

    return <MiniCard {...formatted} key={i} />;
  });
};
/* eslint-enable no-underscore-dangle */

/*
  likes: [
    {__typename: "Group", id: "12345", name: "hello", photo: "https://..."}
    {
      __typename: "Content",
      channelName: "study_entries",
      content: {images: []},
      id: "12345",
      parent:{SAME},
      title: "dsfhsjdk"
    }
  ]
*/
type ILikesList = {
  likes: [Object],
};

export default (props: ILikesList) => (
  <div>
    {renderLikes(props.likes)}
  </div>
);
