<p align="center" >
  <a href="http://newspring.cc">
    <img src="https://s3.amazonaws.com/ns.images/newspring/icons/newspring-church-logo-black.png" alt="NewSpring Church" title="NewSpring Church" />
  </a>
</p>

Apollos
=======================
[![Build Status](https://travis-ci.org/NewSpring/Apollos.svg)](https://travis-ci.org/NewSpring/Apollos)

Apollos is a reactive application framework for building high speed, web + native, reactive applications. It is built using Reactjs, Redux, and Meteor. This repository contains the application framework and instructions for usage.

## Who was Apollos?

* <a href="https://www.biblegateway.com/passage/?search=Acts%2018:24-28&version=NIV">Acts 18:24-28</a>
* <a href="https://www.biblegateway.com/passage/?search=Acts+19:1&version=NIV">Acts 19:1</a>
* <a href="https://www.biblegateway.com/passage/?search=1+Corinthians+1:12-13&version=NIV">1 Corinthians 1:12-13</a>
* <a href="https://www.biblegateway.com/passage/?search=1%20Corinthians%203:6&version=NIV">1 Corinthians 3:6</a>
* <a href="https://www.biblegateway.com/passage/?search=Titus%203:13&version=NIV">Titus 3:13</a>

## Structure

This repo contains the core Apollos framework, as well as the sites that share the core Apollos code:

- `/apollos`: shared code
- `/sites`: root site directory
  - `/newspring`: newspring.cc (currently my.newspring.cc)

## Prerequisites

- [Meteor](curl https://install.meteor.com/ | sh): `curl https://install.meteor.com/ | sh`;  
- [Node](https://nodejs.org/en/download/)

## Local Development

To install, clone down this repo and run `npm install && npm link`. This will bind `apollos` to your system to be used to run this app.

> *NOTICE*
Until meteor 1.4 ships (with native node support), you need to run ` meteor npm run` before each of these commands. For instance: `meteor npm run apollos run newspring`
This is due to Meteor running a different version of node. See [this](https://github.com/meteor/meteor/issues/4314) for a more detailed explanation.
During this period, you must also use `--` as a break when passing options. For instance: `meteor npm run apollos newspring -- --native`

`apollos setup <site>`: This command will bootstrap individual sites. This may take some time.

`apollos run <site>`: This will start a local server to serve the site and print its address in your console.

`apollos run <site> --native`: This will run the native version of the application but allow you to work on most of the code in your web browser.

`apollos run <site> --ios`: This will run the native app of a given site in the iOS simulator

`apollos run <site> --android`: This will run the native app of a given site in the android simulator

`apollos run <site> --ios --device`: This will run the native app of a given site through xCode so it can be run on a local device

## Deploys

This project can be automatically deployed by Travis CI using release tags. We have 3 different environments to deploy to: alpha, beta, production.

To do a release, simply create a tag using the following naming convention:

```
app/alpha/0.0.3
app/beta/1.0
my.newspring.cc/production/3.4.5
```
