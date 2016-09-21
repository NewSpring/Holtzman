Holtzmann
=======================
[![NewSpring
Church](https://img.shields.io/badge/NEWSPRING_CHURCH-Holtzmann-6BAC43.svg?style=flat&logoWidth=17&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd%2BUAAAABGdBTUEAALGPC/xhBQAAAeFJREFUSA29lU0rRFEYx%2B81k/eFUpO3hUmREpGEYrKQ2VGslLKwkw/iC/AFbKVsvSTFIMVydsSCGHsvmev3THOv6cy5Z17c66nfnDnP23/Oveecsa0yzHGcYdIWYAo6oQMikIFXuIETOLJt%2B4mxOkNoCdJQrn2RuANDFSlSEIcUVGtZCjchWlKYpARkIAg7p0mLryjBBHxCkHZMs9oiUZzyGINamfqDt3WCf3lnqoA6/8Yx4Ikykd0Ytu2LoC0fKKUZ%2BuS7xpbx3Wv8rkt2Yi9MwCrI%2BdSZg7NNxEZKLK1fV63z0WcMng39VmoonNcVV%2BPjlrmibt1QmxTBaUOCNsQK6mASutUERHfx%2BV1vPSIo92LZhkgDyddwBnfM1zTFDxqfuGIVC1Ikr%2BB3i1vWhnRS7EOZu9OcoN%2BucpPUsUtxNCtz07RJVvhmytDEpKbQcker0GH6LsUZU0LQMRG8DbqpqZ8InpoSgo6J4CFkg27s1y/KQX3kLO2RsOiT1Eo8VhBTd2VEiUtq8f9fvoF7eY8zT%2BV9oQ7ySC1WecGwFapSvrl3hngs9fguYTBM4dwKRYBVvjPMgtz4oZknKAqIvjDMwA7IH%2Bb/GY94FA4gUPPeod9SUGsnloQ5iIMcEaERKrYfBD49JTL9FwYAAAAASUVORK5CYII%3D)](https://newspring.cc)
[![Build Status](https://travis-ci.org/NewSpring/Holtzmann.svg)](https://travis-ci.org/NewSpring/Holtzmann)

Holtzmann is a reactive application framework for building high speed, web + native, reactive applications. It is built using Reactjs, Redux, and Meteor. This repository contains the application framework and instructions for usage.

## Prerequisites

- [Meteor](curl https://install.meteor.com/ | sh): `curl https://install.meteor.com/ | sh`;
- [Node 6](https://nodejs.org/en/download/)

## Quick Start

```
git clone git@github.com:NewSpring/Holtzmann.git
cd Holtzmann
npm link
apollos setup
apollos run
```

## Structure

This repo contains the code base used to build v5 of the NewSpring site and native app. Our sites and native apps share much of the same functionality, and therefore share the same code.

- `/assets`: additional assets that don't need to be loaded over a web server
- `/client`: entry point for client
- `/imports`: basically all code, client and server
- `/public`: static assets to be loaded from web server
- `/scripts`: command line scripts used for deployment, testing, etc
- `/server`: entry point for server
- `/stylesheets`: sass for generating our css using sass and junction
- `main.html`: root HTML file
- `mobile-config.js`: used to generate cordova apps
- `package.json`: used to manage npm dependencies and etc.

## Local Development

To install, clone down this repo and run `npm link`. This will bind `apollos` to your system to be used to run this app.

`apollos setup`: This command will bootstrap the application. This may take some time.

  - `-c || --clean`: Force rebuild of application
  - `-l || --log <level>`: NOT IMPLEMENTED

`apollos run`: This will start a local server to serve the site and print its address in your console.

  - `-p || --port`: NOT IMPLEMENTED
  - `-v || --verbosity`: NOT IMPLEMENTED
  - `-q || --quick`: Removes built files (`.meteor/local`)
  - `-n || --native`: This will run the native version of the application but allow you to work on most of the code in your web browser
  - `--ios`: Run the native app in the iOS simulator
  - `--android`: Run the native app in the Android simulator
  - `--device`: Run the native app on a device. Use in conjunction with `--ios` or `--android`
  - `--production`: Run the application in production mode
  - `--debug`: Run the application in debug mode

## Linting

This project includes linting using ESLint.  To enable linting in Visual Studio Code, you will need to install the ESLint extension.

To install the extension you'll need to press `⌘+P`, paste the following command and press enter.

```
ext install vscode-eslint
```

## Deploys

This project can be automatically deployed by Travis CI using release tags. We have 2 different versions of the application, web and native. We also have 3 different environments to deploy to: alpha, beta, production.

To deploy, create a release/tag using a combination of the site name, site version, environment target, and version number.

```
newspring/web/production/1.0.8
newspring/native/beta/0.0.3-45
```
