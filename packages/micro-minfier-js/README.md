<p align="center" >
  <a href="http://newspring.cc">
    <img src="https://s3.amazonaws.com/ns.images/newspring/icons/newspring-church-logo-black.png" alt="NewSpring Church" title="NewSpring Church" />
  </a>
</p>

Micro Minifier for Meteor
=========================

> What is this? A bundle for ants?!

Minify your Meteor bundle and remove dead code. This minifier will bundle per your environment variables and drop any dead code that would never evaluate.

For instance:

``` javascript
if (process.env.NODE_ENV === "development") {
  console.log('development only');
}

if (process.env.NODE_ENV != "development") {
  console.log('not development');
}
```

After running Meteor build in production mode, you'll
get this:

``` javascript
console.log('not development');
```

### Use case

Many libraries include development and production code in their npm modules. React does this and has a much larger bundle size when development code isn't removed. This minifier allows you to create production code bundles on the fly!
