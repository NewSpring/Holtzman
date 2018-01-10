export default function generateData(newData) {
  const defaultData = {
    title: "Welcome | NewSpring Church",
    description: "NewSpring Church exists to reach people far from God and teach them how to follow Jesus step by step. We currently have 16 campuses across the state of South Carolina.",
    image: "http://ns.images.s3.amazonaws.com/newspring/site/empty-tomb.jpg",
  };

  if (newData.title) {
    newData = { // eslint-disable-line
      ...newData,
      ...{
        title: `${newData.title} | NewSpring Church`,
      },
    };
  }

  const data = { ...defaultData, ...newData };

  const { description, title, image } = data;
  delete data.description;
  delete data.title;
  delete data.image;


  return { ...{
    title,
    meta: [
      {
        name: "description",
        content: description,
      },

      // Rich Snippets
      {
        itemprop: "name",
        content: title,
      },
      {
        itemprop: "description",
        content: description,
      },
      {
        itemprop: "image",
        content: image,
      },

      // Site Verification
      {
        name: "google-site-verification",
        content: "UNk6frcn4tNFIJoQQhjFc2Rx_Pmb1SXXsyYBKUrDgXg",
      },
      {
        name: "msvalidate.01",
        content: "611077482F129A86B86095000B59B955",
      },

      // twitter cards
      {
        name: "twitter:card",
        content: image ? "summary_large_image" : "summary",
      },
      {
        name: "twitter:title",
        content: title,
      },
      {
        name: "twitter:description",
        content: description,
      },
      {
        name: "twitter:image:src",
        content: image,
      },
      {
        name: "twitter:site",
        content: "@newspring",
      },
      {
        name: "twitter:creator",
        content: "@newspring",
      },

      // Open Graph
      {
        name: "og:title",
        content: title,
      },
      {
        name: "og:description",
        content: description,
      },
      {
        name: "og:image",
        content: image,
      },
      {
        name: "og:url",
        content: __meteor_runtime_config__.ROOT_URL,
      },
      {
        name: "og:site_name",
        content: "NewSpring Church",
      },
      {
        name: "og:app_id",
        content: "167012243402263",
      },
      {
        name: "fb:app_id",
        content: "167012243402263",
      },
    ],
    link: [
      // Google+
      {
        rel: "author",
        href: "https://plus.google.com/+newspringchurch/posts",
      },
      {
        rel: "publisher",
        href: "https://plus.google.com/+newspringchurch",
      },
    ],
  },
    ...data };
}
