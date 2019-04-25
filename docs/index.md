---
toc:
  - Overview
  - Getting started
  - Reactive rendering
  - Supported browsers
---
# Introduction

## Overview

[Vue.js](https://vuejs.org) components for reactive 3D rendering. Depends on [three.js](https://threejs.org/).

You can render 3D components on canvas by coding custom html tags.
It's not only for integration with other Vue.js applications,
but also for drawing 3D graphics more easier!

## Getting started

You need to load the vue.js and the three.js scripts with the vue-gl script.

```html
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/three"></script>
<script src="https://unpkg.com/vue-gl"></script>
<script>
    Object.keys(VueGL).forEach(name => {
        Vue.component(name, VueGL[name]);
    });
</script>
```

You can also get install via npm. The three.js module will be installed as a dependency.

```sh
npm install --save vue vue-gl
```

```js
import * as VueGL from "vue-gl";

Object.keys(VueGL).forEach(name => {
    Vue.component(name, VueGL[name]);
});
```

Then, the following code will render a sphere on the canvas.

{% include example.html url='/examples/overview.html' %}

## Reactive rendering

It works with the reactive data bindings of Vue.js.
Follwing code uses [form input bindings](https://vuejs.org/v2/guide/forms.html)
and pass datas to the position property of a mesh object.
VueGL renders a sphere at your requested position at once.

{% include example.html url="/examples/reactive-rendering.html" %}

## Multiple renderers

Multiple renderers can share the same datas.
It might be helpful if you want to reduce using resouces.

{% include example.html url="/examples/multiple-renderers.html" %}

## Supported browsers

All modern browsers except IE < 8 are supported, depends on Vue.js and three.js.
Note that IE9 needs a polyfill for TypedArray class ([js-polyfills/typedarray.js](https://github.com/inexorabletash/polyfill/blob/master/typedarray.js)
is a one of the options).
