Junction-Mixins
===============

Sass Mixin library that powers the Junction front-end framework

### Functions

 - $use-extend
 - $use-map
 - $use-number


### Mixins

 - $use-vendor
 - $use-rotate
 - $use-positions
 - $use-fixed-ratio
 - $use-floating
 - $use-breakpoints
 - $use-namespace
 - $use-keyframes
 - $use-columns
 - $use-shapes
 - $use-typography
 - $use-newspring-icon


### Defaults

`_breakpoints.scss`
```javascript

$breakpoints: (
  //Mobile devices meant to be held with one hand
  'palm'          'screen and (max-width: 480px)',
  'palm-wide'     'screen and (min-width: 481px) and (max-width: 768px)',
  'palm-wide-and-up' 'screen and (min-width: 481px)',
  'handheld'      'screen and (max-width: 768px)',
  //Devices meant to be held with two hands but not on a desk
  'lap'           'screen and (min-width: 769px) and (max-width: 1024px)',
  'lap-and-up'    'screen and (min-width: 769px)',
  'lap-wide'      'screen and (min-width: 1025px) and (max-width: 1280px)',
  'lap-wide-and-up' 'screen and (min-width: 1025px)',
  'portable'      'screen and (min-width: 769px) and (max-width: 1280px)',
  //Devices meant to stand and be used on a table/desk
  'desk'          'screen and (min-width: 1281px) and (max-width: 1680px)',
  'desk-and-up'   'screen and (min-width: 1281px)',
  'desk-wide'     'screen and (min-width: 1681px)',
  'anchored'      'screen and (min-width: 1281px)',
) !default;

```
