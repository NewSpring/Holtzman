
// @flow

import contentHelper from "../../../util/content";
import categories from "../../../util/categories";
import { MiniCard } from "../../@primitives/UI/cards";

function getImage(images: [Object], label: string = "2:1") {
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


const renderLikes = (likes: [Object]) => {
  if (!Array.isArray(likes)) return undefined;
  return likes.map((item, i) => {
    let formatted;
    if (item.__typename === "Content") { // eslint-disable-line no-underscore-dangle
      formatted = {
        title: item.title,
        image: getImage(item.parent ? item.parent.content.images : item.content.images, "1:1"),
        icon: categories.icon(item),
        category: categories.name(item),
        link: contentHelper.links(item),
      };
    } else if (item.__typename === "Group") { // eslint-disable-line no-underscore-dangle
      formatted = {
        title: item.name,
        image: item.photo,
        icon: "icon-groups",
        category: "Groups",
        link: `/groups/${item.id}`,
      };
    }

    return (
      <MiniCard
        {...formatted}
        key={i}
      />
    );
  });
};

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
    { renderLikes(props.likes) }
  </div>
);
