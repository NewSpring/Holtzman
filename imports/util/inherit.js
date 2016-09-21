

function inherit(Child, Parent) {
  // copy Parent static properties
  const child = Object.assign(Child, Parent);

  // a middle member of prototype chain: takes the prototype from the Parent
  const Middle = () => {
    this.constructor = child;
  };
  Middle.prototype = Parent.prototype;
  child.prototype = new Middle();
  child.__super__ = Parent.prototype; // eslint-disable-line
  return child;
}

export default { inherit };
