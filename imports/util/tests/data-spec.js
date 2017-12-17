
export const DATA_SPEC_ATTRIBUTE_NAME = "data-spec";

/**
* Finds all instances of components in the rendered `componentWrapper` that are DOM components
* with the `data-spec` attribute matching `name`.
* @param {ReactWrapper} componentWrapper -
    Rendered componentWrapper (result of mount, shallow, or render)
* @param {string} specName -
    Name of `data-spec` attribute value to find
* @param {string|Function} typeFilter -
    (Optional) Expected type of the wrappers (defaults to all HTML tags)
* @returns {ReactComponent[]} All matching DOM components
*/
export const getSpecWrappers = (componentWrapper, specName, typeFilter) => {
  let specWrappers;

  if (!typeFilter) {
    specWrappers = componentWrapper.find(`[${DATA_SPEC_ATTRIBUTE_NAME}="${specName}"]`);
  } else {
    specWrappers = componentWrapper.findWhere(wrapper => (
      wrapper.prop(DATA_SPEC_ATTRIBUTE_NAME) === specName && wrapper.type() === typeFilter
    ));
  }

  return specWrappers;
};

/**
* Like getSpecWrappers() but expects there to be one result, and returns that one result,
* or throws exception if there is any other number of matches besides one.
* @param {ReactWrapper} componentWrapper -
    Rendered componentWrapper (result of mount, shallow, or render)
* @param {string} specName -
    Name of `data-spec` attribute value to find
* @param {string|Function} typeFilter -
    (Optional) Expected type of the wrappers (defaults to all HTML tags)
* @returns {ReactComponent} Single matching DOM component
*/
export const getSingleSpecWrapper = (componentWrapper, specName, typeFilter) => {
  const specWrappers = getSpecWrappers(componentWrapper, specName, typeFilter);

  if (specWrappers.length !== 1) {
    throw new Error(`Expected single "${specName}" spec wrapper. Received: ${specWrappers.length}.`);
  }

  return specWrappers.first();
};
