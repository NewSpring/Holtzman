<p align="center" >
  <a href="http://newspring.cc">
    <img src="https://s3.amazonaws.com/ns.images/newspring/icons/newspring-church-logo-black.png" alt="NewSpring Church" title="NewSpring Church" />
  </a>
</p>

Client Folder
=======================

The client folder is a tricky thing in some ways with Apollos. In traditional meteor apps, this is loaded *only* on the client. In apollos apps, the code is executed on the server during SSR. So watch your window washing.

## Structure

- [layouts](#layouts)
- [blocks](#blocks)
- [components](#components)
- [methods](#methods)
- [store](#store)
  - [actions](#actions)
  - [middlewares](#middlewares)
  - [reducers](#reducers)
- [index.js](#index)
- [startup.js](#startup)


## Blocks

Blocks are used complex components (always include a container components) which interact with data in some way. They should be able to be included on any site with out fear for lack of data as they register and call data they need on their own. Blocks can contain custom components that are used only by their block, otherwise shared sub components should be in the component folder

## Components

Components make up stateful and stateless components but not container components. They should be highly testable, data independent, and useable by any application.

## Layouts

> @TODO: depreciate layouts?

Layouts are structural oriented components that are used to construct applications. They can be used for just structural or can include blocks to create structure + guaranteed data. One example is the `Auth` layout which ensures child routes require a login.


## Store

The store folder contains all actions related to the redux store. Party time.

## Actions

> export from ./store

The actions folder is used to store action creators for the redux store. Each folder should take the name of the key in the store it will become, and expose `types` as well as all of the methods for manipulating the store.


## Middlewares

> don't export from ./store

Middlewares asynchronously interact with the store to do external actions and update the store. If you need to manipulate data, submit a form, or setup a logging service, you are probably looking at a middleware. Like actions and reducers, this should try to have a 1:1 store key => folder

## Reducers

> don't export from ./store

Reducers are the powerhouse of the application. They makeup the store and allow us to create a seamless applications between all devices. Reducers should have a 1:1 store key => folder mapping and should have corresponding actions in the action folder.


## index.js

Each client folder should contain a grouping index which exports the subfolders in an expected manner.

## startup.js

This file should be imported by `index.js`, should have no exports, and should be used to instrument any actions needed for the client files to run. (subscriptions, external lib configurations, config, etc)
