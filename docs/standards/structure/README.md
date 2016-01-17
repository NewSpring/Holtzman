<p align="center" >
  <a href="http://newspring.cc">
    <img src="https://s3.amazonaws.com/ns.images/newspring/icons/newspring-church-logo-black.png" alt="NewSpring Church" title="NewSpring Church" />
  </a>
</p>

Apollos Project Structure
=======================

The apollos project is meant to be a large scale base for building apollos powered applications. It includes a number of things that not all applications will use / need.

## Structure

- .docs
- .idea
- core
- *other sections*
- config
- tests

## .docs

This holds the gitbook full of documentation for using Apollos when building sites and applications. The structure is broken down into chapters of the book and their pages.

## .idea

This holds the in progress spec / discussion about new features, new standards, and general ideas to move the project forward. It is a wild west and feel free to get in and start creating things.

## core

The core folder contains the most used and most basic set of actions related to apollos. It is used for instrumenting applications, handling the store, base components, and multi-stack configuration. The base of how other sections / sites live in core.

## *other sections*

Thanks to SSR, we are able to split our applications into chunks when sending to the client. A chunk should be self contained as much as possible (pulling from core is okay) and should expose an index.js with lazy loading routes.

// @TODO merge rock and core

## config

Not a folder, but rather the configuration files for the project. Editor configs, linting, CI scripts, etc.

## Tests

Automated tests for each module added to the project.
