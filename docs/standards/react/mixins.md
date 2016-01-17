<p align="center" >
  <a href="http://newspring.cc">
    <img src="https://s3.amazonaws.com/ns.images/newspring/icons/newspring-church-logo-black.png" alt="NewSpring Church" title="NewSpring Church" />
  </a>
</p>

Mixins and Decorators
=======================

Mixins (or Decorators as we write them) are used to provide common lifecycle based functionality to components. They allow for DRY patterns to be used without care about the purpose of a component's purpose. ReactMixin is a great tool for creating and implementing mixins.

### Common Mixins
- [@connect](./../redux/README.md)
- [ReactMeteorData](./reactivity.md)
- [Paginate](./reactivity.md) // coming soon


## Anatomy of a mixin

Mixins can vary in function but they tend to have a few things in common. First, they are setup / instantiated using `componentWillMount`. They setup actions that can be canceled / garbage collected which are configured to be removed in `componentWillUnmount`. Aside from that, they can specify their own methods, require methods on a component, (like ReactMeteorData), or even require `refs` to be added.

More to come...
