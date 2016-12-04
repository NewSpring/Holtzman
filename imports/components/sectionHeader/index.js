
const halvesClasses = "one-half floating display-inline-block soft-half";

type ISectionHeader = {
  title?: string,
  link?: Object, // React component
};

const SectionHeader = ({ title, link }: ISectionHeader) =>
  <div className="background--light-secondary one-whole">
    <div className={`${halvesClasses} floating--left`}>
      <h6 className="floating__item text-dark-primary flush">
        {title}
      </h6>
    </div>
    <div className={`${halvesClasses} floating--right`}>
      {link}
    </div>
  </div>
  ;

export default SectionHeader;
