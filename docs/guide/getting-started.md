# Getting started
## Installation
There are two ways to use VueGL.

* [Loading pre-built scripts on the browser](#loading-pre-built-scripts-on-the-browser)  
  Easy way to try using the library. You need only a text editor.
* [Building a script to be loaded with a module bundler](#building-a-script-to-be-loaded-with-a-module-bundler)  
  More efficient way for building products. It needs Node.js and npm (Node package manager) to be
  installed.

### Loading pre-built scripts on the browser
Put &lt;script&gt; tags before your code using VueGL. VueGL depends on Vue.js and Three.js so that you need to load them before VueGL.

```html
<!-- Dependency libraries has to be loaded before VueGL. -->
<script src="path/to/vue.js"></script>
<script src="path/to/three.js"></script>
<!-- Loading VueGL. -->
<script src="path/to/vue-gl.js"></script>
```

The global namespace object `VueGL` is accessible after loading VueGL. For example,
&lt;VglRenderer&gt; component is under the `VglRenderer` property of the `VueGL`.

```js
// Registering the VglRenderer as a global component.
Vue.component('VglRenderer', VueGL.VglRenderer);
```

#### Downloads
VueGL and its dependency scripts can be found at following pages.

* Vue.js - [Installation](https://vuejs.org/v2/guide/installation.html#Direct-lt-script-gt-Include)
* Three.js - [Releases](https://github.com/mrdoob/three.js/releases)
* VueGL - [Releases](https://github.com/vue-gl/vue-gl/releases)

#### from CDN
You can also load scripts from CDNs. To load them, just replace src attribute of &lt;script&gt; tags.

```html
<!-- Latest versions from UNPKG -->
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/three"></script>
<script src="https://unpkg.com/vue-gl"></script>

<!-- Latest versions from jsDeliver -->
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script src="https://cdn.jsdelivr.net/npm/three"></script>
<script src="https://cdn.jsdelivr.net/npm/vue-gl"></script>
```

### Building a script to be loaded with a module bundler
VueGL and its dependencies are also available on [npm](//www.npmjs.com). If you build your app with
a module bundler such as [Webpack](//webpack.js.org) or [rollup.js](//rollupjs.org), it is easy to integrate VueGL to your app.

Note that Vue.js and Three.js are peer dependencies of VueGL, then you have to explicitly install
them.

```sh
npm i vue three vue-gl
```

Then you can import VueGL components like below.

```js
// CommonJS
const { VglRenderer, VglScene } = require('vue-gl');
```
```js
// ECMA Script
import { VglRenderer, VglScene } from 'vue-gl';
```

## Registering components
Vue.js supports global and local component registration. If you are using a module bundler, you may
prefer [local registration](//vuejs.org/v2/guide/components-registration.html#Local-Registration).
For prototyping, [global registration](//vuejs.org/v2/guide/components-registration.html#Global-Registration)
is the more convenient way.

### Global registration
Use `Vue.component()` method to register components.

When using pre-built VueGL script, the global namespace object `VueGL` has all components as its own
properties. For example, the script below registers the &lt;VglRenderer&gt; component.
```html
<script>
  Vue.component('VglRenderer', VueGL.VglRenderer);
</script>
```
The script below registers all available VueGL components globally.
```js
Object.entries(VueGL).forEach(([name, component]) => Vue.component(name, component));
```

### Local registration
Pass components to `components` option for the Vue instance. 

When using a module bundler, you can import or require only necessary components for the current module.

```js
// CommonJS
const { VglRenderer } = require('vue-gl');

module.exports = {
  components: { VglRenderer },
  // Other component option definitions
};
```
```js
// ECMA Script
import { VglRenderer } from 'vue-gl';

export default {
  components: { VglRenderer },
  // Other component option definitions
};
```

## Drawing a scene with VueGL
Here is a simple example to draw a cube on the WebGL canvas.
```html
<script src="path/to/vue.js"></script>
<script src="path/to/three.js"></script>
<script src="path/to/vue-gl.js"></script>
<vgl-renderer id="canvas">
  <template #scene>
    <vgl-scene>
      <vgl-mesh>
        <template #geometry>
          <vgl-box-geometry />
        </template>
        <template #material>
          <vgl-mesh-standard-material />
        </template>
      </vgl-mesh>
      <vgl-directional-light :position-x="2" :position-y="1.5" :position-z="1" />
    </vgl-scene>
  </template>
  <template #camera>
    <vgl-perspective-camera :position-x="2" :position-y="1.5" :position-z="1" rotation="lookAt" />
  </template>
</vgl-renderer>
<script>
  new Vue({ components: VueGL, el: '#canvas' });
</script>
```
<simple-cube-example />
&lt;VglRenderer&gt; initializes a canvas for our drawings. It requires `scene` and `camera` slots to be defined.

The example scene has a mesh object and a directional light.

The mesh is configured its geometry and material via `geometry` and `material` slots. Every slot of
VueGL components would have appropriate other VueGL components like this.

The directional light is configured its position via `position-x`, `position-y` and `position-z`
props. Usually each prop of VueGL component accepts primitive value to configure corresponding
Three.js instance.

The perspective camera has `position-` props like the directional light and also `rotation` prop.
The value of `rotation` prop represents how to determine the camera direction. When `lookAt` mode
is selected, the camera faces to the specified position. In this case, it faces to (0, 0, 0) since
`look-at-x`, `look-at-y` and `look-at-z` props are omitted and their default value is 0.
