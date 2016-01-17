<p align="center" >
  <a href="http://newspring.cc">
    <img src="https://s3.amazonaws.com/ns.images/newspring/icons/newspring-church-logo-black.png" alt="NewSpring Church" title="NewSpring Church" />
  </a>
</p>

Apollos React/JSX Style Guide
=======================


> heavily influenced by Airbnb's style guide


## Basic Rules

- Only include one React component per file.
  - However, multiple [Stateless, or Pure, Components](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions) are allowed per file. eslint rule: [`react/no-multi-comp`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-multi-comp.md#ignorestateless).
- Always use JSX syntax.
- Do not use `React.createElement` unless you're initializing the app from a file that is not JSX.


## Class vs `React.createClass`

- Use `class extends React.Component` unless you have a very good reason to use mixins.

  eslint rules: [`react/prefer-es6-class`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-es6-class.md).

    ```javascript
    // bad
    const Listing = React.createClass({
      render() {
        return <div />;
      }
    });

    // good
    class Listing extends React.Component {
      render() {
        return <div />;
      }
    }
    ```

## Naming

  - **Extensions**: Use `.jsx` extension for React components.
  - **Filename**: Use PascalCase for filenames. E.g., `ReservationCard.jsx`.
  - **Reference Naming**: Use PascalCase for React components and camelCase for their instances.

    eslint rules: [`react/jsx-pascal-case`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md).

    ```javascript
    // bad
    import reservationCard from "./ReservationCard";

    // good
    import ReservationCard from "./ReservationCard";

    // bad
    const ReservationItem = <ReservationCard />;

    // good
    const reservationItem = <ReservationCard />;
    ```

  - **Component Naming**: Use the filename as the component name. For example, `ReservationCard.jsx` should have a reference name of `ReservationCard`. However, for root components of a directory, use `index.jsx` as the filename and use the directory name as the component name:

    ```javascript
    // bad
    import Footer from "./Footer/Footer";

    // bad
    import Footer from "./Footer/index";

    // good
    import Footer from "./Footer";
    ```


## Alignment

  - Follow these alignment styles for JSX syntax

  eslint rules: [`react/jsx-closing-bracket-location`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md).

    ```javascript
    // bad
    <Foo superLongParam="bar"
         anotherSuperLongParam="baz" />

    // good
    <Foo
      superLongParam="bar"
      anotherSuperLongParam="baz"
    />

    // if props fit in one line then keep it on the same line
    <Foo bar="bar" />

    // children get indented normally
    <Foo
      superLongParam="bar"
      anotherSuperLongParam="baz"
    >
      <Spazz />
    </Foo>
    ```

## Quotes

  - Always use double quotes (`"`) for JSX attributes, and all other JS.

  > Why? JSX attributes [can't contain escaped quotes](http://eslint.org/docs/rules/jsx-quotes), so double quotes make conjunctions like `"don't"` easier to type.
  > Regular HTML attributes also typically use double quotes instead of single, so JSX attributes mirror this convention.

  eslint rules: [`jsx-quotes`](http://eslint.org/docs/rules/jsx-quotes).

    ```javascript
    // bad
    <Foo bar='bar' />

    // good
    <Foo bar="bar" />

    // bad
    <Foo style={{ left: '20px' }} />

    // good
    <Foo style={{ left: "20px" }} />
    ```

## Spacing

  - Always include a single space in your self-closing tag.

    ```javascript
    // bad
    <Foo/>

    // very bad
    <Foo                 />

    // bad
    <Foo
     />

    // good
    <Foo />
    ```

## Props

  - Always use camelCase for prop names.

    ```javascript
    // bad
    <Foo
      UserName="hello"
      phone_number={12345678}
    />

    // good
    <Foo
      userName="hello"
      phoneNumber={12345678}
    />
    ```

  - Omit the value of the prop when it is explicitly `true`.

  eslint rules: [`react/jsx-boolean-value`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md).

    ```javascript
    // bad
    <Foo
      hidden={true}
    />

    // good
    <Foo
      hidden
    />
    ```
## Parentheses

  - Wrap JSX tags in parentheses when they span more than one line.

  eslint rules: [`react/wrap-multilines`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/wrap-multilines.md).

    ```javascript
    // bad
    render() {
      return <MyComponent className="long body" foo="bar">
               <MyChild />
             </MyComponent>;
    }

    // good
    render() {
      return (
        <MyComponent className="long body" foo="bar">
          <MyChild />
        </MyComponent>
      );
    }

    // good, when single line
    render() {
      const body = <div>hello</div>;
      return <MyComponent>{body}</MyComponent>;
    }
    ```

## Tags

  - Always self-close tags that have no children.

  eslint rules: [`react/self-closing-comp`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md).

    ```javascript
    // bad
    <Foo className="stuff"></Foo>

    // good
    <Foo className="stuff" />
    ```

  - If your component has multi-line properties, close its tag on a new line.

  eslint rules: [`react/jsx-closing-bracket-location`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md).

    ```javascript
    // bad
    <Foo
      bar="bar"
      baz="baz" />

    // good
    <Foo
      bar="bar"
      baz="baz"
    />
    ```


## Ordering

  - Ordering for `class extends React.Component`:

  1. `constructor`
  1. optional `static` methods
  1. `componentWillMount`
  1. `componentDidMount`
  1. `componentWillReceiveProps`
  1. `shouldComponentUpdate`
  1. `componentWillUpdate`
  1. `componentDidUpdate`
  1. `componentWillUnmount`
  1. *clickHandlers or eventHandlers* like `onClickSubmit()` or `onChangeDescription()`
  1. *getter methods for `render`* like `getSelectReason()` or `getFooterContent()`
  1. *Optional render methods* like `renderNavigation()` or `renderProfilePicture()`
  1. `render`

  - How to define `propTypes`, `defaultProps`, `contextTypes`, etc...

    ```javascript
    import { Component, PropTypes } from "react";

    export default class Link extends React.Component {

      static propTypes = {
        id: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
        text: PropTypes.string,
      }

      static defaultProps = {
        text: 'Hello World',
      }

      render() {
        return <a href={this.props.url} data-id={this.props.id}>{this.props.text}</a>
      }
    };

    ```
