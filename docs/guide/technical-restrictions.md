# Technical restrictions
* IE8 and below is not supported depends on Vue.js.
* IE9 needs a polyfill for TypedArray classes used in three.js ([js-polyfills/typedarray.js](https://github.com/inexorabletash/polyfill/blob/master/typedarray.js)
is a one of the options).
* IE needs a polyfill for ResizeObserver class to detect resizing canvas.