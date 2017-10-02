
// @flow

const halvesClasses = "one-half floating display-inline-block";

type ISectionHeader = {
  title?: string,
  link?: Object, // React component
};

const SectionHeader = ({ title, link }: ISectionHeader) =>
  (<div className="one-whole">
    <div className={`${halvesClasses} floating--left soft soft-half-left`}>
      <h6 className="floating__item text-dark-tertiary flush">
        {title}
      </h6>
    </div>
    <div className={`${halvesClasses} floating--right soft soft-half-right`}>
      {link}
    </div>
  </div>)
  ;

export default SectionHeader;
