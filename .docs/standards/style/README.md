<p align="center" >
  <a href="http://newspring.cc">
    <img src="https://s3.amazonaws.com/ns.images/newspring/icons/newspring-church-logo-black.png" alt="NewSpring Church" title="NewSpring Church" />
  </a>
</p>

Javascript Style Guidelines
=======================

We follow the stellar guidelines of Airbnb which can be found [here](https://github.com/airbnb/javascript/blob/master/README.md)

Go read it. Really.

We will be adding linting as an automated task to our products in the near future.

However, we have a few adjustments to how Airbnb does things:

## Strings

  - [6.1](#6.1) <a name='6.1'></a> Use double quotes `""` for strings.

    eslint rules: [`quotes`](http://eslint.org/docs/rules/quotes.html).

    ```javascript
    // bad
    const name = 'Capt. Janeway';

    // good
    const name = "Capt. Janeway";
    ```

## jQuery

  Don't use it. Its not included, don't add it.
