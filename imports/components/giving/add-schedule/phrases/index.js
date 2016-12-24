// @flow

type ITertiaryPhrase = {
  additionalClasses?: string,
  text?: string,
};

const TertiaryPhrase = ({
  additionalClasses,
  text = "",
}: ITertiaryPhrase) => {
  const classes = [
    "text-dark-tertiary",
    "display-inline-block",
    "push-half-bottom",
  ];

  if (additionalClasses) {
    classes.push(additionalClasses);
  }

  return (
    <h3 className={classes.join(" ")}>
      {text}
    </h3>
  );
};

export default TertiaryPhrase;
