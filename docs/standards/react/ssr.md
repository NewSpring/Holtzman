<p align="center" >
  <a href="http://newspring.cc">
    <img src="https://s3.amazonaws.com/ns.images/newspring/icons/newspring-church-logo-black.png" alt="NewSpring Church" title="NewSpring Church" />
  </a>
</p>

SSR with React
=======================

Since we care about our users, our app should be as close to 100% possible to render on the server. Aside from client specific actions (like `window` related things), the component should be able to be converted into a string with given in memory data.

### Common pitfalls

*Problem*
```bash
ReferenceError: window is not defined
```

*Solution*
```javascript
if (typeof window != "undefined" && window != null) {
  // your window scripts here
}
```

### Testing

Although we have automated tests to catch pitfalls, it is good practice to run your changes using `--production` to verify the app is rendering the way you think it should.
