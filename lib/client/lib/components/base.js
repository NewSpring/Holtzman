/*

  Comparing arrays of components by reference. This might not be really
  necessary to do, because all operations we officially support modify
  length of the array (add a new component or remove an old one). But
  if somebody is modifying the reactive variable directly we want a sane
  behavior. The default ReactiveVar equality always returns false when
  comparing any non-primitive values. Because the order of components in
  the children array is arbitrary we could further improve this comparison
  to compare arrays as sets, ignoring the order. Or we could have some
  canonical order of components in the array.
 */
var Base, ComponentNamespace, addCard, addCardState, arrayReferenceEquals, cards, createNamespace, getComponent, getNamespace, getPathAndName, isolateValue, setComponent;

arrayReferenceEquals = function (a, b) {
    var i, j, ref;
    if (a.length !== b.length) {
        return false;
    }
    for (i = j = 0, ref = a.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
};


/*

  Similar idea to https://github.com/awwx/meteor-isolate-value. We want
  to make sure that internal reactive dependency inside function fn really
  changes the result of function fn before we trigger an outside reactive
  computation invalidation. The downside is that function fn is called twice
  if the result changes (once to check if the outside reactive computation
  should be invalidated and the second time  when the outside reactive
  computation is rerun afterwards). Function fn should not have any
  side effects.
 */

isolateValue = function (fn) {
    var dependency, lastValue;
    if (!Tracker.active) {
        return fn();
    }
    lastValue = null;
    dependency = new Tracker.Dependency();
    Tracker.autorun(function (computation) {
        var value;
        value = fn();
        if (computation.firstRun) {
            return lastValue = value;
        } else {
            if (!arrayReferenceEquals(value, lastValue)) {
                return dependency.changed();
            }
        }
    });
    dependency.depend();
    return lastValue;
};

getPathAndName = function (name) {
    var path;
    path = name.split(".");
    name = path.pop();
    return {
        path: path,
        name: name
    };
};

getNamespace = function (components, path) {
    var match, segment;
    match = components;
    while ((segment = path.shift()) != null) {
        match = match[segment];
        if (!_.isObject(match)) {
            return null;
        }
    }
    if (!_.isObject(match)) {
        return null;
    }
    return match || null;
};

createNamespace = function (components, path) {
    var match, segment;
    match = components;
    while ((segment = path.shift()) != null) {
        if (!(segment in match)) {
            match[segment] = new components.constructor();
        }
        match = match[segment];
    }
    return match;
};

getComponent = function (components, name) {
    var namespace, path, ref, ref1;
    if (!name) {
        return null;
    }
    ref = getPathAndName(name), path = ref.path, name = ref.name;
    namespace = getNamespace(components, path);
    if (!namespace) {
        return null;
    }
    return ((ref1 = namespace[components.constructor.COMPONENT]) != null ? ref1[name] : void 0) || null;
};

setComponent = function (components, name, component) {
    var name1, namespace, path, ref;
    ref = getPathAndName(name), path = ref.path, name = ref.name;
    namespace = createNamespace(components, path);
    if (namespace[name1 = components.constructor.COMPONENT] == null) {
        namespace[name1] = new components.constructor();
    }
    return namespace[components.constructor.COMPONENT][name] = component;
};

ComponentNamespace = (function () {
    function ComponentNamespace() {}


/*
  
    We have a special field for components. This allows us to have the
    namespace with the same name as a component, without overriding
    anything in the component (we do not want to use component object
    as a namespace object).
   */

    ComponentNamespace.COMPONENT = "";

    return ComponentNamespace;

})();

cards = {};

addCardState = function (component, card) {
    var obj;
    obj = {};
    obj[component.componentName()] = {
        component: component
    };
    if (!cards[card]) {
        cards[card] = {
            component: component,
            states: obj
        };
        return;
    }
    if (cards[card] && !cards[card].states) {
        cards[card].states = obj;
        return;
    }
    if (cards[card].states[component.componentName()]) {
        return;
    }
    cards[card].states[component.componentName()] = {
        component: component
    };
};

addCard = function (component) {
    if (cards[component.componentName()] && !cards[component.componentName()].states) {
        console.log("Card " + (component.componentName()) + " is already registed");
        return;
    }
    if (cards[component.componentName()]) {
        return;
    }
    return cards[component.componentName()] = {
        component: component
    };
};

Base = (function () {
    function Base() {}

    Base.components = new ComponentNamespace();

    Base.register = function (componentName, componentClass) {
        if (!componentName) {
            console.log("Component name is required for registration.");
            return;
        }
        if (componentClass == null) {
            componentClass = this;
        }
        if (getComponent(this.components, componentName)) {
            console.log("Component '" + componentName + "' already registered.");
            return;
        }

/*
    
      The last condition is to make sure we do not throw the exception
      when registering a subclass. Subclassed components have at this
      stage the same component as the parent component, so we have to
      check if they are the same class. If not, this is not an error,
      it is a subclass.
     */
        if (componentClass.componentName() && componentClass.componentName() !== componentName && getComponent(this.components, componentClass.componentName()) === componentClass) {
            console.log("Component '" + componentName + "' already registered under the name '" + (componentClass.componentName()) + "'.");
            return;
        }
        componentClass.componentName(componentName);
        setComponent(this.components, componentName, componentClass);
        return this;
    };


/*
  
    From a card state
    1. Check to see if the card is registered
    2. If it isn't, register the name
    3. See if state is registered
    3. Attach the name of the component to the card
  
  
    From a card
    1. See if card is registered
    2. If it is attach class?
    3. If not register and attach class?
    4. Map states to card for use
   */

    Base.card = function (cardName, cardClass) {
        var isCard;
        if (!cardName) {
            debug("Card name or `true` is required for registration.");
            return;
        }
        cardClass || (cardClass = this);
        isCard = typeof cardName === "boolean";
        if (isCard) {
            addCard(cardClass);
            return this;
        }
        addCardState(cardClass, cardName);
        console.log(cards);
        return this;
    };

    Base.getComponent = function (componentsNamespace, componentName) {
        if (!componentName) {
            componentName = componentsNamespace;
            componentsNamespace = this.components;
        }
        if (!componentName) {
            return null;
        }
        return getComponent(componentsNamespace, componentName);
    };


/*
  
    Component name is set in the register class method. If not using a
    registered component and a component name is wanted, component name
    has to be set manually or this class method should be overridden
    with a custom implementation. Care should be taken that unregistered
    components have their own name and not the name of their parent
    class, which they would have by default. Probably component name
    should be set in the constructor for such classes, or by calling
    componentName class method manually on the new class of
    this new component.
   */

    Base.componentName = function (componentName) {
        if (componentName) {
            this._componentName = componentName;
            return this;
        }
        return this._componentName || null;
    };

    Base.prototype.componentName = function () {
        return this.constructor.componentName();
    };


/*
  
    The order of components is arbitrary and does not necessary match
    siblings relations in DOM. nameOrComponent is optional and it
    limits the returned children only to those.
   */

    Base.prototype.children = function (nameOrComponent) {
        var base, child;
        if (this._internals == null) {
            this._internals = {};
        }
        if ((base = this._internals).children == null) {
            base.children = new ReactiveVar([], arrayReferenceEquals);
        }
        if (!nameOrComponent) {
            return (function () {
                var j, len, ref, results;
                ref = this._internals.children.get();
                results = [];
                for (j = 0, len = ref.length; j < len; j++) {
                    child = ref[j];
                    results.push(child);
                }
                return results;
            }).call(this);
        }
        if (_.isString(nameOrComponent)) {
            return this.childrenWith((function (_this) {
                return function (child, parent) {
                    return child.componentName() === nameOrComponent;
                };
            })(this));
        }
        return this.childrenWith((function (_this) {
            return function (child, parent) {
                if (child.constructor === nameOrComponent) {
                    return true;
                }
                if (child === nameOrComponent) {
                    return true;
                }
                return false;
            };
        })(this));
    };


/*
  
    The order of components is arbitrary and does not necessary match
    siblings relations in DOM. Returns children which pass a mapping function.
   */

    Base.prototype.childrenWith = function (propertyOrMatcherOrFunction) {
        var matcher, property;
        if (typeof propertyOrMatcherOrFunction === "string") {
            property = propertyOrMatcherOrFunction;
            propertyOrMatcherOrFunction = (function (_this) {
                return function (child, parent) {
                    return property in child;
                };
            })(this);
        } else if (!typeof propertyOrMatcherOrFunction === "function") {
            matcher = propertyOrMatcherOrFunction;
            propertyOrMatcherOrFunction = (function (_this) {
                return function (child, parent) {
                    var value;
                    for (property in matcher) {
                        value = matcher[property];
                        if (!property in child) {
                            return false;
                        }
                        if (typeof child[property] === "function") {
                            if (!child[property]() === value) {
                                return false;
                            }
                        } else {
                            if (!child[property] === value) {
                                return false;
                            }
                        }
                    }
                    return true;
                };
            })(this);
        }
        return isolateValue((function (_this) {
            return function () {
                var child, j, len, ref, results;
                ref = _this.children();
                results = [];
                for (j = 0, len = ref.length; j < len; j++) {
                    child = ref[j];
                    if (propertyOrMatcherOrFunction.call(_this, child, _this)) {
                        results.push(child);
                    }
                }
                return results;
            };
        })(this));
    };

    Base.prototype.addChild = function (child) {
        var base;
        if (this._internals == null) {
            this._internals = {};
        }
        if ((base = this._internals).children == null) {
            base.children = new ReactiveVar([], arrayReferenceEquals);
        }
        this._internals.children.set(Tracker.nonreactive((function (_this) {
            return function () {
                return _this._internals.children.get().concat([child]);
            };
        })(this)));
        return this;
    };

    Base.prototype.removeChild = function (child) {
        var base;
        if (this._internals == null) {
            this._internals = {};
        }
        if ((base = this._internals).children == null) {
            base.children = new ReactiveVar([], arrayReferenceEquals);
        }
        this._internals.children.set(Tracker.nonreactive((function (_this) {
            return function () {
                return _.without(_this._internals.children.get(), child);
            };
        })(this)));
        return this;
    };

    Base.prototype.parent = function (parent) {
        var base;
        if (this._internals == null) {
            this._internals = {};
        }

/*
    
      We use reference equality here. This makes reactivity not
      invalidate the computation if the same component instance
      (by reference) is set as a parent.
     */
        if ((base = this._internals).parent == null) {
            base.parent = new ReactiveVar(null, function (a, b) {
                return a === b;
            });
        }
        if (!_.isUndefined(parent)) {
            this._internals.parent.set(parent);
            return this;
        }
        return this._internals.parent.get();
    };

    return Base;

})();

_components.base = Base;