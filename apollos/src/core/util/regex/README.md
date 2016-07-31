<p align="center" >
  <a href="http://newspring.cc">
    <img src="https://s3.amazonaws.com/ns.images/newspring/icons/newspring-church-logo-black.png" alt="NewSpring Church" title="NewSpring Church" />
  </a>
</p>


Regex
=======================


## Methods

#### Format.addRegex

```javascript
import { Regex } from "apollo.core/lib"

const rockEmail = /[\w\.\'_%-]+(\+[\w-]*)?@([\w-]+\.)+[\w-]+/;


Regex.addRegex("rockEmail", rockEmail);
Regex.rockEmail.test("few@newspring.cc") // true

```


## Default Regex
