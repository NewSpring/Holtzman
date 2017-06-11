
import PropTypes from "prop-types";
import { Link } from "react-router";
import Loading from "../../@primitives/UI/loading/Spinner";
import Hero from "../../@primitives/UI/hero";
import { MiniCard } from "../../@primitives/UI/cards";

import RecentLikes from "../../shared/likes-list";

// reducer helpers
import backgrounds from "../../../util/backgrounds";
import categories from "../../../util/categories";

const cardPropsReducer = (c) => ({
  title: c.title,
  category: categories.name(c),
  icon: categories.icon(c),
  image: c ? backgrounds.image(c, { label: "2:1" }) : "",
  link: c.meta.urlTitle,
});

function getImage(images, label = "2:1") {
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

const RenderRecentLikes = ({
  recentLikes,
  recentLoading,
  show,
}) => {
  if (!show) return null;
  return (
    <section className="soft-half background--light-secondary">
      {(recentLoading || (!recentLoading && recentLikes && recentLikes.length)) &&
        <div className="one-whole text-center">
          <h5 className="flush soft-bottom">Recently Liked By Others</h5>
        </div>
      }
      {recentLoading && <div className="text-center" data-spec="loading"><Loading /></div>}
      {recentLikes && <RecentLikes likes={recentLikes} />}
    </section>
  );
};

RenderRecentLikes.propTypes = {
  recentLikes: PropTypes.object,
  recentLoading: PropTypes.bool,
  show: PropTypes.bool,
};

const Layout = ({
  featuredItem,
  recommendedItems,
  textItems,
  recentLikes,
  recentLoading,
}) => (
  <div style={{ overflowY: "hidden", height: "100%" }} className="background--light-primary">

    <section className="hard background--light-secondary">
      <h6 className="push-left soft-half-bottom soft-top">Recommended by NewSpring</h6>
    </section>

    <Hero {...{ content: featuredItem, hideDate: true }} />

    <section className="soft-half background--light-secondary">
      <div className="grid flush">
        {recommendedItems && recommendedItems.map((item, i) =>
          <MiniCard {...cardPropsReducer(item)} key={i} />
        )}
      </div>
    </section>

    <RenderRecentLikes
      recentLikes={recentLikes}
      recentLoading={recentLoading}
      show={!process.env.WEB}
    />

    {textItems && (
      <div className="soft-half background--light-secondary">
        <div className="card soft one-whole">
          <div className="card__item">
            <p className="flush">
              <small>
                <em>
                  Are you looking for&nbsp;
                  {textItems.map((x, i) => {
                    let delimeter = ", ";
                    if (textItems[i].id === textItems[textItems.length - 1].id) {
                      delimeter = "";
                    } else if (textItems[i].id === textItems[textItems.length - 2].id) {
                      delimeter = " or ";
                    }

                    return (
                      <span key={i}>
                        <Link to={x.meta.urlTitle} >{x.title}</Link>
                        {delimeter}
                      </span>
                    );
                  })}?
                </em>
              </small>

            </p>

          </div>
        </div>
      </div>
    )}
  </div>
);

Layout.propTypes = {
  featuredItem: PropTypes.object,
  recommendedItems: PropTypes.array,
  textItems: PropTypes.array,
  recentLikes: PropTypes.array,
  recentLoading: PropTypes.bool,
};

export default Layout;

export {
  RenderRecentLikes,
  getImage,
};
