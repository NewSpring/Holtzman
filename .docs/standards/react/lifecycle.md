<p align="center" >
  <a href="http://newspring.cc">
    <img src="https://s3.amazonaws.com/ns.images/newspring/icons/newspring-church-logo-black.png" alt="NewSpring Church" title="NewSpring Church" />
  </a>
</p>

React Component Lifecycle
=======================

## componentWillMount

Similar to Blaze's `onCreated`, this method is called only when a component is first created. If a component is disposed of, then re-rendered, this will be called again.

> setState will not re-render

```javascript
componentWillMount() {
  // invoked once, before initial 'render'
}
```

## componentDidMount

Similar to Blaze's `onRendered`, this method is good for event binding and async fetching of data that shouldn't prevent rendering

> setState will not re-render

```javascript
componentDidMount() {
  // invoked once (client-only), after initial 'render'
}
```

## componentWillReceiveProps

This method is called when a components props are being updated or changed. It is not called on the initial render but is useful for async actions and state setting

> setState will not re-render

```javascript
componentWillReceiveProps = (nextProps) => {
  // invoked when component is receiving props, not for initial 'render'
}

```

## shouldComponentUpdate

A comparison function used to prevent rerendering of a component. Returning `false` will allow the nextProps / nextState to be set but not render the component. A useful tool to narrow rerenders and improve performance

> setState will re-render

```javascript
shouldComponentUpdate = (nextProps, nextState) => {
  // invoked before rendering with new props, not for initial 'render'
}

```

## componentWillUpdate

Called before a new render of a component but after all of the data has changed. Can't use this.setState here

```javascript
componentWillUpdate = (nextProps, nextState) => {
  // invoked immediately before rendering with new props or state, not for initial 'render'
  // see componentWillReceiveProps if you need to call setState
}
```

## componentDidUpdate

> setState will re-render

```javascript
componentDidUpdate = (prevProps, prevState) => {
  // invoked immediately after DOM updates, not for initial 'render'
}
```

## componentWillUnmount

Similar to Blaze's `onDestroyed`, this method is called only when a component is destroyed. It is important to clean up reactive data binding, or event handlers if created in the component lifecycle.

```javascript
componentWillUnmount() {
  // invoked immediately before a component is unmounted from the DOM
}
```
