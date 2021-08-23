# Example components usage
Example components are used for conveniently trying Three.js example classes. They can be found at dist/js/examples directory.

## Loading &lt;script&gt; directly on the browser
Each example component is in an independent script file so that you need only scripts contain
necessary components to be loaded.

The following example loads &lt;VglObjLoader&gt; component. Note that you have to put dependent
scripts before example component scripts. Example components are injected to the `VueGL` namespace.
```html
<script src="path/to/vue.js"></script>
<script src="path/to/three.js"></script>
<script src="path/to/vue-gl.js"></script>
<script src="path/to/vue-gl/examples/loaders/vgl-obj-loader.js"></script>
<script>
// VueGL.VglObjLoader is available here.
</script>
```
Then register loaded components to use them.
```js
Vue.component('VglObjLoader', VueGL.VglObjLoader);
```
If you are registering all VueGL components to Vue.js globally, basic registration code like below
works fine since example components are just added to the namespace. 
```js
Object.entries(VueGL).forEach(([name, component]) => Vue.component(name, component));
```

## Using npm and module bundler
For import/require example components, each module exports a component object as default.
```js
// commonJS
const VglObjLoader = require('vue-gl/dist/examples/loaders/vgl-obj-loader');
```
```js
// ECMA Script
import VglObjLoader from 'vue-gl/dist/examples/loaders/vgl-obj-loader';
```
