Holtzman
=======================
[![NewSpring
Church](https://img.shields.io/badge/NEWSPRING_CHURCH-Holtzmann-6BAC43.svg?style=flat&logoWidth=17&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd%2BUAAAABGdBTUEAALGPC/xhBQAAAeFJREFUSA29lU0rRFEYx%2B81k/eFUpO3hUmREpGEYrKQ2VGslLKwkw/iC/AFbKVsvSTFIMVydsSCGHsvmev3THOv6cy5Z17c66nfnDnP23/Oveecsa0yzHGcYdIWYAo6oQMikIFXuIETOLJt%2B4mxOkNoCdJQrn2RuANDFSlSEIcUVGtZCjchWlKYpARkIAg7p0mLryjBBHxCkHZMs9oiUZzyGINamfqDt3WCf3lnqoA6/8Yx4Ikykd0Ytu2LoC0fKKUZ%2BuS7xpbx3Wv8rkt2Yi9MwCrI%2BdSZg7NNxEZKLK1fV63z0WcMng39VmoonNcVV%2BPjlrmibt1QmxTBaUOCNsQK6mASutUERHfx%2BV1vPSIo92LZhkgDyddwBnfM1zTFDxqfuGIVC1Ikr%2BB3i1vWhnRS7EOZu9OcoN%2BucpPUsUtxNCtz07RJVvhmytDEpKbQcker0GH6LsUZU0LQMRG8DbqpqZ8InpoSgo6J4CFkg27s1y/KQX3kLO2RsOiT1Eo8VhBTd2VEiUtq8f9fvoF7eY8zT%2BV9oQ7ySC1WecGwFapSvrl3hngs9fguYTBM4dwKRYBVvjPMgtz4oZknKAqIvjDMwA7IH%2Bb/GY94FA4gUPPeod9SUGsnloQ5iIMcEaERKrYfBD49JTL9FwYAAAAASUVORK5CYII%3D)](https://newspring.cc)
[![Build Status](https://travis-ci.org/NewSpring/Holtzman.svg)](https://travis-ci.org/NewSpring/Holtzman)
[![Coverage Status](https://coveralls.io/repos/github/NewSpring/Holtzman/badge.svg?branch=master)](https://coveralls.io/github/NewSpring/Holtzman?branch=master)

Holtzmann is a reactive application framework for building high speed, web + native, reactive applications. It is built using Reactjs, Redux, and Meteor. This repository contains the application framework and instructions for usage.

**Table of Contents**

[Prerequisites](#prerequisites)

[Quick Start](#quick-start)

[Structure](#structure)

[Local Development](#local-development)
  * [Testing](#testing)
  * [Linting](#linting)
  * [Typing](#typing)

[Deploys](#deploys)

[Contributing](#contributing)

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
- `/.dev`: command line scripts used for deployment, testing, etc
- `/server`: entry point for server
- `/stylesheets`: sass for generating our css using sass and junction
- `*/__tests__`: tests adjacent to the module they are testing
- `*/__stories__`: react storybook stories adjacent to the module they are displaying
- `*/__mocks__`: module mocks for testing adjacent to the module they mock.
- `main.html`: root HTML file
- `mobile-config.js`: used to generate cordova apps
- `package.json`: used to manage yarn dependencies and etc.
- `yarn.lock`: used to make sure all developers are using the same package versions

### Imports directory

`/imports/` contains all of the working files for Holtzman. Inside are the following directories:
- `/components`: React components and higher-ordered components.
- `/data`: all data manipulation methods and utilities.
- `/deprecated`: old files that are to be removed. **Nothing new should be added here**.
- `/pages`: app pages
- `/util`: additional helper functions

## Local Development

### Basics

To install all dependencies, we use [Yarn](https://yarnpkg.com/). To get started:
1. Clone down the repo
2. Make sure you have the Yarn CLI [installed](https://yarnpkg.com/en/docs/install)
3. Run `yarn`.
4. run `npm link`. This will bind `apollos` to your system to be used to run this app ([more info](https://docs.npmjs.com/cli/link)).

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

### Testing

This project uses [Jest](https://facebook.github.io/jest/) for unit tests. These tests are located in `__tests__` subfolders adjacent to the thing they're testing.

To run tests, call `yarn test` or `yarn test -- --watch`. This will also run `eslint` and `flow` tests when complete.

### Linting

This project includes linting using [ESLint](http://eslint.org/).  To enable linting in Visual Studio Code, you will need to install the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

To install the extension you'll need to press `⌘+P`, paste the following command and press enter.

```
ext install vscode-eslint
```

To manually run eslint, use `yarn lint`.

### Typing

This project contains static typing for some of our code. We use [Flow](https://flowtype.org/) for this. To enable flow to a file,
add `// @flow` to the very top of the file.

To run flow, use `yarn flow`.

## CI and Deploys

This project is automatically tested on Jenkins CI. It is tested on every branch push as well as every PR. If a PR is open, then pushes to the branch being requested also get tested.

- For authenticated users, detailed test results can be see in the [Jenkins Control Panel](https://ci.newspring.io)
- Test results can also be seen under the [branches tab](https://github.com/newspring/holtzman) in GitHub

This project can be deployed by Jenkins through its [web UI](https://ci.newspring.io). We have 2 different versions of the application: web and native. We also have 2 different environments to deploy to: beta and production. Currently, only the web platform can be deployed through Jenkins. Native builds currently are manually run and submitted.

## Deploy Process

This details how administrators to the repository with admin access inside Jenkins can deploy the project to all of our platforms.

- Tests are run for all pull requests.
  - Passing tests for pull requests generate a GitHub tag in the format:<br />
  `GH<GitHub PR Number>-B<Jenkins Build number>`
- Building For Web
  - Open the `Holtzman-Web` project in Jenkins.
  - Click `Build with Parameters` on the sidebar.
  - Choose the environment (beta or production)
  - Choose the tag you wish to deploy
  - Click Build

## Contributing

For more information about contributing PRs and issues, see our [Contribution Guidelines](CONTRIBUTING.md).

[Good First PR](https://github.com/NewSpring/Holtzman/labels/good first pr) is a great starting point for people new to this project.
