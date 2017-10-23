<p align="center" >
  <a href="http://newspring.cc">
    <img src="https://s3.amazonaws.com/ns.images/newspring/icons/newspring-church-logo-black.png" alt="NewSpring Church" title="NewSpring Church" />
  </a>
</p>

On Board Block
=======================

The on boarding block is used to handle the workflow of data for on-boarding a user. This includes [signing in](#sign-in), [signing up](#sign-up), [sending a password reset](#forgot-password), and [resetting a password](#reset-password). This block is used in conjunction with the [on board actions](../../actions/on-board/README.md) and the [on board reducer](../../reducers/on-board/README.md).

## Entry point

When using the on board component, it is best to include the entire block. [The index file](./index.jsx) contains the state handling of the sub components as well as integration with redux. Usage:

```javascript
export default class AccountPage extends Component {
  render () {
    return (
      <OnBoard/>
    )
  }
}
```

#### Props

The block does not take or support any props currently

## Sign-in

The [sign-in component](./on-board.Signin.jsx) is used to handle both sign-in and sign-up states. It renders the toggle switch between sign-in and sign-up, the form for taking data, and handles validation using [inputs](../../components/forms/README.md#inputs).

#### Props
* **save**: `Function` | method to save value on valid input blur | **required**
* **data**: `Object` | store of email, password, and terms | **required** | *reactive*
* **back**: `Function` | method to go back in the history | **required**
* **forgot**: `Function` | method to change state to show forgot component | **required**
* **errors**: `Object` | map of errors currently related to accountsing | **required** | *reactive*
* **account**: `Boolean` | bool indicating if the credentials match an existing account | **required** | *reactive*
* **state**: `String` | string representing the state of the block | **required** | *reactive*
* **success**: `Boolean` | bool indicating if the form submission succeeded | **required** | *reactive*
* **header**: `Object` | React element or component to render as the header
* **toggles**: `Array` | Array containing labels of

> developing...
