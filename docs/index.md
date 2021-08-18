# WebGL on Vue.js

**VueGL** is a component library for rendering 3D graphics with [Vue.js](//vuejs.org)
and [three.js](//threejs.org).

**VueGL** integrates **three.js** objects(classes) into **Vue.js** components. You
can draw 3D objects powered by **WebGL** very easy. In addition, drawn graphics are
responsively rendered when a data watcher detects effective changes.

**VueGL** is a component library for [Vue.js](https://vuejs.org) and enables to
handle [three.js](https://threejs.org/) objects through Vue.js' API.

**Vue.js** is one of very popular frameworks for building web apps or interactive
web sites. **Vue.js** renders data to DOM declaretively and dynamically, so that
makes creating interactive interfaces easier.

**three.js** is a 3D graphics library to use **WebGL**. It provides classes wrapping
WebGL APIs, so that we can handle 3D objects intuitively.

They aim different targets to be rendered. **Vue.js** renders into DOM and **three.js**
renderes into canvas.

Then **VueGL** bridge them! VueGL components render data to **WebGL** canvas
declaretively and dynamically.