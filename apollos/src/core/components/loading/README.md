<p align="center" >
  <a href="http://newspring.cc">
    <img src="https://s3.amazonaws.com/ns.images/newspring/icons/newspring-church-logo-black.png" alt="NewSpring Church" title="NewSpring Church" />
  </a>
</p>

Loading States
=======================

Components used to display loading states and to handle the loading of things.

## ImageLoader

`ImageLoader` is a fork of [react-imageloader](https://github.com/hzdg/react-imageloader), but with extended functionality to support CSS background-images.

Both versions require a `preloader` function, which is used to display the loading state. This defaults to returning an `img` element.

```javascript
  const preloader = () => {
    return <p>Loading...</p>
  }

  <ImageLoader
    src="/img/something.jpg"
    preloader=preloader
  />
```

In order to use this with a background image, `ImageLoader` allows you to pass in a function for generating the element, which could include a background image or anything else.

```javascript
  preloader() {
    return <p>Loading...</p>
  }

  renderElement() {
    return (
      <div style={{
        backgroundImage: this.src
      }}>
      </div>
    );
  }

  <ImageLoader
    src="/img/something.jpg"
    preloader={preloader}
    renderElement={renderElement}
  />
```
