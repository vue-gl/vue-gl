---
has_children: true
nav_order: D
---
# API / Example Components

## Trying example components

Each example components are built standalone under the [dist/js/examples](https://unpkg.com/browse/vue-gl/dist/examples/).

### Load with \<script> tag
If you are loading `VueGL` and dependencies directly in the browser with `<script>`
element, example components also can be loaded in the same way.

The loaded example components will be injected under the `VueGL` namespace.
Resister the loaded components to `Vue` before using them just like the basic components.

The example code below loads and registers the `VglObjLoader` component.

```html
<script src="/path/to/vue-gl/examples/loaders/vgl-obj-loader.js"></script>
<script>
  Vue.component('VglObjLoader', VueGL.VglObjLoader);
</script>
```

Now you can use the `<vgl-obj-loader>` component in your Vue templates.

Typically you also need to load and register the `VueGL` basic components to render
the example components. In this case, the only thing you have to do is loading the
example component scripts just before registering components.

```html
<script src="/path/to/vue.min.js"></script>
<script src="/path/to/three.min.js"></script>
<script src="/path/to/vue-gl.js"></script>
<script src="/path/to/vue-gl/examples/loaders/vgl-obj-loader.js"></script>
<script>
  Object.keys(VueGL).forEach((name) => Vue.component(name, VueGL[name]));
</script>
```

### Using npm
Example components also can be handled by module bundlers. Just import and register
from the dist/examples directory.

```js
const VglObjLoader = require('vue-gl/dist/examples/loaders/vgl-obj-loader');
Vue.component('VglObjLoader', VglObjLoader);
```
