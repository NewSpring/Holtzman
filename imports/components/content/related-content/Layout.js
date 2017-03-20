// @flow
import Loading from "../../@primitives/UI/loading";
import MiniCard from "../../@primitives/UI/cards/MiniCard";

// reducer helpers
import backgrounds from "../../../util/backgrounds";
import contentHelper from "../../../util/content";
import categories from "../../../util/categories";

const cardPropsReducer = (c: Object): Object => ({
  title: c.title,
  category: categories.name(c),
  icon: categories.icon(c),
  image: c ? backgrounds.image(c, { label: "2:1" }) : "",
  link: contentHelper.links(c),
});

// Loading Content
type ILoadingContent = {
  loading: boolean,
};

const LoadingContent = ({ loading }: ILoadingContent) => {
  if (!loading) return null;
  return (
    <div className="one-whole text-center soft">
      <Loading />
    </div>
  );
};

type ILayout = {
  title: string,
  content: Object,
  loading: boolean,
};

const Layout = ({
  title,
  content,
  loading,
}: ILayout) => (
  <section className="soft-half-sides@palm soft-double@palm-wide soft-top soft-half-bottom background--light-secondary">
    <div className="one-whole text-center">
      <h5 className="flush soft-bottom">{title}</h5>
    </div>
    <LoadingContent loading={loading} />
    <div>
      {content && content.map((c, key) => (
        <div
          key={key}
          className="soft-half-bottom@palm-wide"
          style={{
            maxWidth: "480px",
            margin: "0 auto",
          }}
        >
          <MiniCard {...cardPropsReducer(c)} />
        </div>
      ))}
    </div>
  </section>
);

export default Layout;

export {
  LoadingContent,
};
