var Component, Namespace, addEvents, argumentsConstructor, bindComponent, bindDataContext, createUIHooks, fn, method, methodName, originalDOMRangeAttach, originalDot, originalGetTemplate, originalInclude, ref, registerFirstCreatedHook, registerHooks, viewToTemplateInstance, wrapHelper, slice = [].slice,
    extend = function (child, parent) {
        for (var key in parent) {
            if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    },
    hasProp = {}.hasOwnProperty;

Namespace = (function () {
    function Namespace(namespace, templateInstance1) {
        this.namespace = namespace;
        this.templateInstance = templateInstance1;
    }

    return Namespace;

})();


/*

  We extend the original dot operator to support {{> Foo.Bar}}. This
  goes through a getTemplateHelper path, but we want to redirect it to
  the getTemplate path. So we mark it in getTemplateHelper and then
  here call getTemplate.
 */

originalDot = Spacebars.dot;

Spacebars.dot = function () {
    var args, value;
    value = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    if (value instanceof Namespace) {
        return Blaze._getTemplate(value.namespace + "." + (args.join('.')), value.templateInstance);
    }
    return originalDot.apply(null, [value].concat(slice.call(args)));
};


/*

  If Namespace gets all the way to the Spacebars.include it means that
  we are in the situation where there is both namespace and component
  with the same name, and user is including a component. But namespace
  reference is created instead (because we do not know in advance that
  there is no Spacebars.dot call around lookup call). So we dereference
  the reference and try to resolve a template. Of course,
  a component might not really exist.
 */

originalInclude = Spacebars.include;

Spacebars.include = function () {
    var args, templateOrFunction;
    templateOrFunction = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    if (templateOrFunction instanceof Namespace) {
        templateOrFunction = Blaze._getTemplate(templateOrFunction.namespace, templateOrFunction.templateInstance);
    }
    return originalInclude.apply(null, [templateOrFunction].concat(slice.call(args)));
};


/*

  We override the original lookup method with a similar one,
  which supports components as well.

  Now the order of the lookup will be, in order:
    a helper of the current template
    a property of the current component
    the name of a component
    the name of a template
    global helper
    a property of the data context

  Returns a function, a non-function value, or null. If a function
  is found, it is bound appropriately.

  NOTE: This function must not establish any reactive dependencies itself.
  If there is any reactivity in the value, lookup should return a function.

  TODO: Should we also lookup for a property of the
  component-level data context (and template-level data context)?
 */

Blaze._getTemplateHelper = function (template, name, templateInstance) {
    var component, helper, ref;
    if (template.__helpers.has(name)) {
        helper = template.__helpers.get(name);
        if (helper != null) {
            return wrapHelper(bindDataContext(helper), templateInstance);
        } else {
            return null;
        }
    }
    if (name in template) {
        if (template[name] != null) {
            return wrapHelper(bindDataContext(template[name]), templateInstance);
        } else {
            return null;
        }
    }
    if (!templateInstance) {
        return null;
    }

/*
  
    Do not resolve component helpers if inside Template.dynamic.
    The reason is that Template.dynamic uses a data context value with
    name "template" internally. But when used inside a component the data
    context lookup is then resolved into a current component's template
    method and not the data context "template". To force the data
    context resolving Template.dynamic should use "this.template" in
    its templates, but it does not, so we have a special case here for it.
   */
    if ((ref = template.viewName) === "Template.__dynamicWithDataContext" || ref === "Template.__dynamic") {
        return null;
    }

/*
  
    TODO:
    - Blaze.View::lookup should not introduce any reactive dependencies.
    - Can we simply ignore reactivity here?
    - Can this template instance or parent template instances change
      without reconstructing the component as well? I don't think so.
    - Only data context is changing and this is why templateInstance
      or .get() are reactive and we do not care about data context here.
   */
    component = Tracker.nonreactive(function () {
        return templateInstance().get("component");
    });
    if (component) {
        if (name in component) {
            return wrapHelper(bindComponent(component, component[name]), templateInstance);
        }
    }

/*
  
    A special case to support {{> Foo.Bar}}. This goes through a
    getTemplateHelper path, but we want to redirect it to the
    getTemplate path. So we mark it and leave to Spacebars.dot
    to call getTemplate.
  
    TODO:
      - We should provide a _components.base.getNamespace method
        instead of accessing components directly.
   */
    if (name && name in _components.base.components) {
        return new Namespace(name, templateInstance);
    }
    return null;
};

bindComponent = function (component, helper) {
    if (typeof helper === "function") {
        return _.bind(helper, component);
    } else {
        return helper;
    }
};

bindDataContext = function (helper) {
    if (typeof helper === "function") {
        return function () {
            var data;
            data = Blaze.getData();
            if (data == null) {
                data = {};
            }
            return helper.apply(data, arguments);
        };
    } else {
        return helper;
    }
};

wrapHelper = function (f, templateFunc) {
    if (!Blaze.Template._withTemplateInstanceFunc) {
        return Blaze._wrapCatchingExceptions(f, "template helper");
    }
    if (typeof f !== "function") {
        return f;
    }
    return function () {
        var args, self;
        self = this;
        args = arguments;
        return Blaze.Template._withTemplateInstanceFunc(templateFunc, function () {
            return Blaze._wrapCatchingExceptions(f, "template helper").apply(self, args);
        });
    };
};

viewToTemplateInstance = function (view) {

/*
  
    We skip contentBlock views which are injected by Meteor when
    using block helpers (in addition to block helper view). This
    matches more the visual structure of templates and not
    the internal implementation.
   */
    var isContent, isElse;
    isContent = view.name === "(contentBlock)";
    isElse = view.name === "(elseBlock)";
    while (view && (!view.template || isContent || isElse)) {
        view = view.originalParentView || view.parentView;
    }
    if (!(view != null ? view.templateInstance : void 0)) {
        return null;
    }
    return _.bind(view.templateInstance, view);
};

addEvents = function (view, component) {
    var action, event, eventMap, events, eventsList, fn, i, len;
    eventsList = component.events();
    if (!_.isArray(eventsList)) {
        console.log("`events` methods from the component `" + (component.componentName() || 'unnamed') + "` did not return an array of event maps");
        return;
    }
    for (i = 0, len = eventsList.length; i < len; i++) {
        events = eventsList[i];
        eventMap = {};
        fn = function (event, action) {
            return eventMap[event] = function () {
                var _event, args, currentView, templateInstance, withTemplateInstanceFunc;
                args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
                _event = args[0];
                currentView = Blaze.getView(event.currentTarget);
                templateInstance = viewToTemplateInstance(currentView);
                withTemplateInstanceFunc = Template._withTemplateInstanceFunc;

/*
        
          We set template instance based on the current target so
          that inside event handlers Component.currentComponent()
          returns the component of event target.
         */
                withTemplateInstanceFunc(templateInstance, function () {

/*
          
            We set view based on the current target so that
            inside event handlers Component.currentData()
            (and Blaze.getData() and Template.currentData())
            returns data context of event target and not component/template.
           */
                    return Blaze._withCurrentView(currentView, function () {
                        return action.apply(component, args);
                    });
                });
            };
        };
        for (event in events) {
            action = events[event];
            fn(event, action);
        }
        Blaze._addEventMap(view, eventMap);
        return;
    }
};

originalGetTemplate = Blaze._getTemplate;

Blaze._getTemplate = function (name, templateInstance) {
    var isFunction, template;
    template = Tracker.nonreactive(function () {
        var componentParent, ref;
        componentParent = typeof templateInstance === "function" ? templateInstance().get("component") : void 0;
        return (ref = Component.getComponent(name)) != null ? ref.renderComponent(componentParent) : void 0;
    });
    isFunction = typeof template === "function";
    if (template && (template instanceof Blaze.Template || isFunction)) {
        return template;
    }
    return originalGetTemplate(name);
};

createUIHooks = function (component, parentNode) {
    return {
        insertElement: (function (_this) {
            return function (node, before) {
                if (node._uihooks == null) {
                    node._uihooks = createUIHooks(component, node);
                }
                return component.insertDOMElement(parentNode, node, before);
            };
        })(this),
        moveElement: (function (_this) {
            return function (node, before) {
                if (node._uihooks == null) {
                    node._uihooks = createUIHooks(component, node);
                }
                return component.moveDOMElement(parentNode, node, before);
            };
        })(this),
        removeElement: (function (_this) {
            return function (node) {
                if (node._uihooks == null) {
                    node._uihooks = createUIHooks(component, node);
                }
                return component.removeDOMElement(node.parentNode, node);
            };
        })(this)
    };
};

originalDOMRangeAttach = Blaze._DOMRange.prototype.attach;

Blaze._DOMRange.prototype.attach = function (parentElement, nextNode, _isMove, _isReplace) {
    var component, oldUIHooks, ref;
    if (component = (ref = this.view._templateInstance) != null ? ref.component : void 0) {
        oldUIHooks = parentElement._uihooks;
        try {
            parentElement._uihooks = createUIHooks(component, parentElement);
            return originalDOMRangeAttach.apply(this, arguments);
        } finally {
            if (oldUIHooks) {
                parentElement._uihooks = oldUIHooks;
            }
        }
    }
    return originalDOMRangeAttach.apply(this, arguments);
};

registerHooks = function (template, hooks) {
    if (!template.onCreated) {
        return;
    }
    template.onCreated(hooks.onCreated);
    template.onRendered(hooks.onRendered);
    template.onDestroyed(hooks.onDestroyed);
};

registerFirstCreatedHook = function (template, onCreated) {
    if (!template._callbacks) {
        return;
    }
    template._callbacks.created.unshift(onCreated);
};

Apollos.components = {};

Component = (function (superClass) {
    extend(Component, superClass);

    function Component() {
        return Component.__super__.constructor.apply(this, arguments);
    }

    Component.getComponentForElement = function (domElement) {
        var ref, template;
        if (!domElement) {
            return null;
        }
        if (domElement.nodeType !== Node.ELEMENT_NODE) {
            console.log("Expected DOM element.");
            return;
        }
        template = (ref = Blaze.getView(domElement)) != null ? ref.templateInstance() : void 0;
        return (template != null ? template.get('component') : void 0) || null;
    };

    Component.prototype.getFirstWith = function (component, propertyName) {
        if (propertyName in this) {
            return this;
        }
        return null;
    };


/*
  
    This class method more or less just creates an instance of a
    component and calls its renderComponent method. But because we
    want to allow passing arguments to the component in templates,
    we have some complicated code around to extract and pass
    those arguments. It is similar to how data context is passed
    to block helpers. In a data context visible only to the
    block helper template.
  
    TODO: This could be made less hacky.
    See https://github.com/meteor/meteor/issues/3913
   */

    Component.renderComponent = function (componentParent) {
        return Tracker.nonreactive((function (_this) {
            return function () {
                var component, componentClass, data, error;
                componentClass = _this;
                try {

/*
          
            We check data context in a non-reactive way, because we
            want just to peek into it and determine if data context
            contains component arguments or not. And while component
            arguments might change through time, the fact that they are
            there at all or not ("args" template helper was used or not)
            does not change through time. So we can check that non-reactively.
           */
                    data = Template.currentData();
                } catch (_error) {
                    error = _error;

/*
          
            The exception can be thrown when there is no current view
            which happens when there is no data context yet, thus also
            no arguments were provided through"args" template helper,
            so we just continue normally.
           */
                    data = null;
                }
                if ((data != null ? data.constructor : void 0) !== argumentsConstructor) {
                    component = new componentClass();
                    return component.renderComponent(componentParent);
                }

/*
        
          We want to reactively depend on the data context for
          arguments, so we return a function instead of a template.
          Function will be run inside an autorun, a reactive context.
         */
                return function () {

/*
          
            We cannot use Template.getData() inside a normal autorun
            because current view is not defined inside a normal autorun.
            But we do not really have to depend reactively on the current
            view, only on the data context of a known
            (the closest Blaze.With) view. So we get this view by ourselves.
           */
                    var currentWith, reactiveArguments, template;
                    currentWith = Blaze.getView("with");

/*
          
            By default dataVar in the Blaze.With view uses ReactiveVar
            with default equality function which sees all objects
            as different. So invalidations are triggered for every
            data context assignments even if data has not really
            changed. This is why we use our own ReactiveVar with
            EJSON.equals which we keep updated inside an autorun.
            Because it uses EJSON.equals it will invalidate our function
            only if really changes.
          
            See https://github.com/meteor/meteor/issues/4073
           */
                    reactiveArguments = new ReactiveVar([], EJSON.equals);

/*
          
            This autorun is nested in the outside autorun so it gets
            stopped automatically when the outside autorun gets invalidated.
           */
                    Tracker.autorun(function (computation) {
                        data = currentWith.dataVar.get();
                        return reactiveArguments.set(data._arguments);
                    });

/*
          
            Use arguments for the constructor. Here we register a
            reactive dependency on our own ReactiveVar.
           */
                    component = (function (func, args, ctor) {
                        ctor.prototype = func.prototype;
                        var child = new ctor,
                            result = func.apply(child, args);
                        return Object(result) === result ? result : child;
                    })(componentClass, reactiveArguments.get(), function () {});
                    template = component.renderComponent(componentParent);

/*
          
            It has to be the first callback so that other callbacks
            have a correct data context.
           */
                    registerFirstCreatedHook(template, function () {

/*
            
              Arguments were passed in as a data context. Restore
              original (parent) data context. Same logic as in
              Blaze._InOuterTemplateScope.
             */
                        this.view.originalParentView = this.view.parentView;
                        return this.view.parentView = this.view.parentView.parentView.parentView;
                    });
                    return template;
                };
            };
        })(this));
    };

    Component.prototype.renderComponent = function (componentParent) {

/*
    
      To make sure we do not introduce any reactive dependency.
      This is a conscious design decision. Reactivity should be
      changing data context, but components should be more stable,
      only changing when structure change in rendered DOM. You can change
      the component you are including (or pass different arguments)
      reactively though.
     */
        return Tracker.nonreactive((function (_this) {
            return function () {
                var base, component, componentTemplate, template, templateBase;
                component = _this;
                if (component._internals == null) {
                    component._internals = {};
                }
                componentTemplate = component.template();
                if (_.isString(componentTemplate)) {
                    templateBase = Template[componentTemplate];
                    if (!templateBase) {
                        console.log("Template '" + componentTemplate + "' cannot be found.");
                        return;
                    }
                } else {
                    templateBase = componentTemplate;
                }

/*
        
          Create a new component template based on the Blaze template.
          We want our own template  because the same Blaze template
          could be reused between multiple components.
        
          TODO:
            - Should we cache these templates based on
              (componentName, templateBase) pair?
        
            - We could use two levels of ES6 Maps,
              componentName -> templateBase -> template.
        
            - What about component arguments changing?
         */
                template = new Blaze.Template("Component." + (component.componentName() || 'unnamed'), templateBase.renderFunction);
                if ((base = _this.component)._internals == null) {
                    base._internals = {};
                }
                registerHooks(template, {
                    onCreated: function () {
                        var _default, _name, _var, base1, base2, base3, i, j, len, len1, method, ref, subHandle, subscriptions, subscriptionsList, varList, vars;
                        if (componentParent) {

/*
              
                component.parent is reactive, so we use
                Tracker.nonreactive just to make sure we do not leak any
                reactivity here.
               */
                            Tracker.nonreactive((function (_this) {
                                return function () {

/*
                  
                    TODO:
                      - Should we support that the same component can be
                        rendered multiple times in parallel?
                  
                      - How could we do that?
                      - For different component parents or only the same one?
                   */
                                    component.parent(componentParent);
                                    return componentParent.addChild(component);
                                };
                            })(this));
                        }
                        this.view._onViewRendered((function (_this) {
                            return function () {
                                if (_this.view.renderCount !== 1) {
                                    return;
                                }
                                return addEvents(_this.view, component);
                            };
                        })(this));

/*
            
              Reactive vars are great, but registering them as template helpers
              and setting the default values isn't great yet. Here we attach
              each var to the component that way it can be gotten via .get
              and is available in the template as a tag. I'm a little bit
              worried about polluting the render namespace so should this
              be kept on the vars object?
             */
                        varList = component.vars();
                        if (_.isArray(varList)) {
                            for (i = 0, len = varList.length; i < len; i++) {
                                vars = varList[i];
                                for (_var in vars) {
                                    _default = vars[_var];
                                    if (component[_var]) {
                                        console.log(_var + " is already a method on " + (component.componentName()));
                                        continue;
                                    }

/*
                  
                    @TODO:
                      - Need to add in way to add reactive comparators
                      - Need to be able to extend vars from parent components
                   */
                                    component[_var] = new ReactiveVar(_default);
                                }
                            }
                        }

/*
            
              Since meteor 1.1 we can use this.subscribe within the on
              created function to subscribe to a publications for the
              lifecycle of the template instance. Here we auto bind
              them with support for arguments and callbacks
            
              @TODO:
                - Need to be able to extend subscribes from parent components
             */
                        subscriptionsList = component.subscriptions();
                        if (_.isArray(subscriptionsList)) {
                            for (j = 0, len1 = subscriptionsList.length; j < len1; j++) {
                                subscriptions = subscriptionsList[j];
                                if (typeof subscriptions === "string") {
                                    this.subscribe(subscriptions);
                                    continue;
                                }
                                if (_.isObject(subscriptions)) {
                                    for (_name in subscriptions) {
                                        method = subscriptions[_name];
                                        subHandle = [_name];
                                        if ((ref = method.args) != null ? ref.length : void 0) {
                                            subHandle = subHandle.concat(method.args);
                                        }
                                        if (method.callback) {
                                            subHandle.push(method.callback);
                                        }
                                        this.subscribe.apply(this, subHandle);
                                        continue;
                                    }
                                }
                            }
                        }
                        this.component = component;

/*
            
              TODO:
                - Should we support that the same component can be
                  rendered multiple times in parallel?
                - How could we do that?
                - For different component parents or only the same one?
             */
                        this.component._internals.templateInstance = this;
                        this.component.onCreated();
                        if ((base1 = this.component._internals).isCreated == null) {
                            base1.isCreated = new ReactiveVar(true);
                        }
                        this.component._internals.isCreated.set(true);
                        if ((base2 = this.component._internals).isRendered == null) {
                            base2.isRendered = new ReactiveVar(false);
                        }
                        this.component._internals.isRendered.set(false);
                        if ((base3 = this.component._internals).isDestroyed == null) {
                            base3.isDestroyed = new ReactiveVar(false);
                        }
                        this.component._internals.isDestroyed.set(false);
                    },
                    onRendered: function () {
                        var base1;
                        this.component.onRendered();
                        if ((base1 = this.component._internals).isRendered == null) {
                            base1.isRendered = new ReactiveVar(true);
                        }
                        return this.component._internals.isRendered.set(true);
                    },
                    onDestroyed: function () {
                        return this.autorun((function (_this) {
                            return function (computation) {
                                var base1, base2;
                                if (_this.component.children().length) {
                                    return;
                                }
                                computation.stop();
                                _this.component._internals.isCreated.set(false);
                                if ((base1 = _this.component._internals).isRendered == null) {
                                    base1.isRendered = new ReactiveVar(false);
                                }
                                _this.component._internals.isRendered.set(false);
                                if ((base2 = _this.component._internals).isDestroyed == null) {
                                    base2.isDestroyed = new ReactiveVar(true);
                                }
                                _this.component._internals.isDestroyed.set(true);
                                _this.component.onDestroyed();
                                if (componentParent) {
                                    component.parent(null);
                                    componentParent.removeChild(component);
                                }
                                delete _this.component._internals.templateInstance;
                            };
                        })(this));
                    }
                });
                return template;
            };
        })(this));
    };

    Component.prototype.template = function () {
        var template;
        template = this.constructor.componentName();
        if (!template) {
            console.log("Component is missing a name and component's 'template' method is not overridden.");
            return;
        }
        return template;
    };

    Component.prototype.onCreated = function () {};

    Component.prototype.onRendered = function () {};

    Component.prototype.onDestroyed = function () {};

    Component.prototype.isCreated = function () {
        var base;
        if (this._internals == null) {
            this._internals = {};
        }
        if ((base = this._internals).isCreated == null) {
            base.isCreated = new ReactiveVar(false);
        }
        return this._internals.isCreated.get();
    };

    Component.prototype.isRendered = function () {
        var base;
        if (this._internals == null) {
            this._internals = {};
        }
        if ((base = this._internals).isRendered == null) {
            base.isRendered = new ReactiveVar(false);
        }
        return this._internals.isRendered.get();
    };

    Component.prototype.isDestroyed = function () {
        var base;
        if (this._internals == null) {
            this._internals = {};
        }
        if ((base = this._internals).isDestroyed == null) {
            base.isDestroyed = new ReactiveVar(false);
        }
        return this._internals.isDestroyed.get();
    };

    Component.prototype.insertDOMElement = function (parent, node, before) {
        if (before == null) {
            before = null;
        }
        if (parent && node && (node.parentNode !== parent || node.nextSibling !== before)) {
            parent.insertBefore(node, before);
        }
    };

    Component.prototype.moveDOMElement = function (parent, node, before) {
        if (before == null) {
            before = null;
        }
        if (parent && node && (node.parentNode !== parent || node.nextSibling !== before)) {
            parent.insertBefore(node, before);
        }
    };

    Component.prototype.removeDOMElement = function (parent, node) {
        if (parent && node && node.parentNode === parent) {
            parent.removeChild(node);
        }
    };

    Component.prototype.events = function () {
        return [];
    };

    Component.prototype.subscriptions = function () {
        return [];
    };

    Component.prototype.vars = function () {
        return [];
    };

    Component.prototype.data = function () {
        return Blaze.getData(this._internals.templateInstance.view) || null;
    };


/*
  
    Caller-level data context. Reactive. Use this to get in event handlers
    the data context at the place where event originated (target context).
    In template helpers the data context where template helpers were called.
    In onCreated, onRendered, and onDestroyed, the same as @data().
    Inside a template this is the same as this.
   */

    Component.prototype.currentData = function () {
        return Blaze.getData() || null;
    };

    Component.prototype.component = function () {
        return this;
    };


/*
  
    Caller-level component. In most cases the same as @, but in event
    handlers it returns the component at the place where event
    originated (target component).
   */

    Component.prototype.currentComponent = function () {
        var ref;
        return ((ref = Template.instance()) != null ? ref.get("component") : void 0) || null;
    };

    Component.prototype.firstNode = function () {
        return this._internals.templateInstance.firstNode;
    };

    Component.prototype.lastNode = function () {
        return this._internals.templateInstance.lastNode;
    };

    return Component;

})(_components.base);

ref = Blaze.TemplateInstance.prototype;
fn = function (methodName, method) {
    return Component.prototype[methodName] = function () {
        var args, ref1;
        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        return (ref1 = this._internals.templateInstance)[methodName].apply(ref1, args);
    };
};
for (methodName in ref) {
    method = ref[methodName];
    fn(methodName, method);
}

argumentsConstructor = function () {
    return false;
};


/*

  TODO:
    - Find a way to pass arguments to the component without having
    to introduce one intermediary data context into the data context
    hierarchy (in fact two data contexts, because we add
    one more when restoring the original one)
 */

Template.registerHelper("args", function () {
    var obj;
    obj = {};
    obj.constructor = argumentsConstructor;
    obj._arguments = arguments;
    return obj;
});


/*

  We make Template.dynamic resolve to the component if component name is
  specified as a template name, and not to the non-component template which
  is probably used only for the content. We simply reuse Blaze._getTemplate.

  TODO:
    - How to pass args?
    - Maybe simply by using Spacebars nested expressions
      (https://github.com/meteor/meteor/pull/4101)?
    - Template.dynamic template="..." data=(args ...)?
    - But this exposes the fact that args are passed as data context.
    - Maybe we should simply override Template.dynamic and add "args" argument?

  TODO:
    - This can be removed once https://github.com/meteor/meteor/pull/4036
    is merged in.
 */

Template.__dynamicWithDataContext.__helpers.set("chooseTemplate", function (name) {
    return Blaze._getTemplate(name, (function (_this) {
        return function () {
            return Template.instance();
        };
    })(this));
});

Apollos.Component = Component;