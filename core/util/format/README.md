<p align="center" >
  <a href="http://newspring.cc">
    <img src="https://s3.amazonaws.com/ns.images/newspring/icons/newspring-church-logo-black.png" alt="NewSpring Church" title="NewSpring Church" />
  </a>
</p>


Format
=======================


## Methods

#### Format.addFormat

```javascript
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

Format.addFormat("capitalize", capitalize);

```


## Default Formatters

#### toCurrency

```javascript
import { Format } from "apollos.core/lib"

const money = 1000.5040
const dollars = Format.toCurrency(money)

console.log(dollars) // $1,000.50

```


#### toDateString

```javascript
import { Format } from "apollos.core/lib"

const now = new Date();
const date = Format.toDateString(now);

console.log(date) // <Month> <date>, <year>

const shorthandDate = Format.toDateString(now, true);
console.log(shorthandDate) // <Mon> <date>, <year>

```
