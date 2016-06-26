<p align="center" >
  <a href="http://newspring.cc">
    <img src="https://s3.amazonaws.com/ns.images/newspring/icons/newspring-church-logo-black.png" alt="NewSpring Church" title="NewSpring Church" />
  </a>
</p>

newwwspring.cc
=======================
[![Circle CI](https://circleci.com/gh/NewSpring/newwwspring.cc/tree/master.svg?style=svg)](https://circleci.com/gh/NewSpring/newwwspring.cc/tree/master)

Initial site to launch for NewSpring using Rock and the Apollos framework. It will eventually become newspring.cc

## Running

```bash
$ npm i
$ norma build
$ norma
```


### Running with local version of Apollos
```bash
$ cd <my path to my local apollos project> && npm link
$ cd <back to this project>
$ cd ./.meteor/local/webpack-npm/node_modules/ && npm link apollos
$ cd <back to this projects root>
$ norma
```
