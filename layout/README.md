<p align="center" >
  <a href="http://newspring.cc">
    <img src="https://s3.amazonaws.com/ns.images/newspring/icons/newspring-church-logo-black.png" alt="NewSpring Church" title="NewSpring Church" />
  </a>
</p>


Apollos Layout
=======================

*Apollos.layout uses [Meteorhacks](https://github.com/meteorhacks) FlowLayout as its backbone. For the original library go [here](https://github.com/meteorhacks/flow-layout).
Much thanks to [Arunoda ](https://github.com/arunoda) and his team for their excellent work moving forward rendering in Meteor.*

** This will be under heavy development with much tighter integration into Apollos Components **

### Layout Manager for Apollos

This is a layout manager designed for the apollos architecture. This is a very simple layout manager right now. It will does following:

* Allow you to render a layout template to the UI
* Allow you to pass data to the layout
* Only re-render when necessary parts of the layout
* Can be used with multiple layouts

## Usage

Create following few templates

~~~html
<template name="layout1">
  {{> Template.dynamic template=top}}
  {{> Template.dynamic template=main}}
</template>

<template name="header">
  <h1>This is the header</h1>
</template>

<template name="postList">
  <h2>This is the postList area.</h2>
</template>

<template name="singlePost">
  <h2>This is the singlePost area.</h2>
</template>
~~~

Now you can render the layout with:

~~~coffeescript
Apollos.layout.render('layout1', { top: "header", main: "postList" })
~~~

Then you will get output like below:

~~~html
  <h1>This is the header</h1>
  <h2>This is the postList area.</h2>
~~~

Sometimes later, you can render the layout again:

~~~coffeescript
Apollos.layout.render('layout1', { top: "header", main: "singlePost" })
~~~

Since only the `main` is changed, `top` section won't get re-rendered. Here's the HTML you'll get:

~~~html
  <h1>This is the header</h1>
  <h2>This is the singlePost area.</h2>
~~~

### Rendering Multiple Templates

Likewise you can create multiple templates and switch between each other.
But when you are changing the layout, whole UI will get re-rendered again.

So, it's a good idea to use a few layouts if possible.
