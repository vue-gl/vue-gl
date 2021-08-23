# WebGL with Vue.js

**VueGL** is a component library for rendering 3D graphics with [Vue.js](//vuejs.org) and
[three.js](//threejs.org).

Using **VueGL**, you can handle **WebGL** very easy. In addition, drawn graphics are responsively
re-rendered when detecting data changes.

**Vue.js** is one of very popular frameworks for building web apps or interactive web sites.

**three.js** is a 3D graphics library to use **WebGL**. It provides classes wrapping WebGL APIs.

They aim different targets to be rendered, **Vue.js** for DOM and **three.js** for WebGL context.
These APIs are completely different and that causes a mess when we want them to work together.

Then **VueGL** is a solution. Bridges them!
