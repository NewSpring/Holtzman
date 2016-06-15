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
  - `/app`: native mobile app
  - `/my.newspring.cc`: give site

Information on running the individual sites can be found in their respective root directories.

## Deploys

This project can be automatically deployed by Travis CI using release tags. We have 3 different environments to deploy to: alpha, beta, production.

To do a release, simply create a tag using the following naming convention:

```
app/alpha/0.0.3
app/beta/1.0
my.newspring.cc/production/3.4.5
```
