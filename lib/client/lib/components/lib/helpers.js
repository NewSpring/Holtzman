/*

  Access parent template instance. "height" is the number of levels beyond
  the current template instance to look. By default block helper template
  instances are skipped, but if "includeBlockHelpers" isset to true,
  they are not.

  See https://github.com/meteor/meteor/issues/3071
 */
var parentView;

parentView = function (view, includeBlockHelpers) {
    if (includeBlockHelpers) {
        return view.originalParentView || view.parentView;
    } else {
        return view.parentView;
    }
};

Blaze.TemplateInstance.prototype.__parent = function (height, includeBlockHelpers) {
    var i, template, view;
    height || (height = 1);
    i = 0;
    template = this;
    while (i < height && template) {
        view = parentView(template.view, includeBlockHelpers);

/*
    
      We skip contentBlock views which are injected by Meteor when using
      block helpers (in addition to block helper view). This matches more
      the visual structure of templates and not the internal implementation.
     */
        while (view && (!view.template || view.name === "(contentBlock)" || view.name === "(elseBlock)")) {
            view = parentView(view, includeBlockHelpers);
        }
        if (!view) {
            return null;
        }

/*
    
      Body view has template field, but not templateInstance,
      which more or less signals that we reached the top.
     */
        if (typeof view.templateInstance === "function") {
            template = view.templateInstance();
        } else {
            template = null;
        }
        i++;
    }
    return template;
};


/*

  Allow easy access to a template instance field when you do not know exactly
  on which instance (this, or parent, or parent's parent, ...)
  a field is defined.

  This allows easy restructuring of templates in HTML, moving things to included
  templates without having to change everywhere in the code instance levels.
  It also allows different structures of templates, when once template
  is included at one level, and some other time at another. Levels do
  not matter anymore, just that the field exists somewhere.
 */

Blaze.TemplateInstance.prototype.get = function (fieldName) {
    var template;
    template = this;
    while (template) {
        if (fieldName in template) {
            return template[fieldName];
        }
        template = template.__parent(1, true);
    }
};