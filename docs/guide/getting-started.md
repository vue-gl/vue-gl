---
nav_order: 2
parent: Guide
---

# Getting started
{: .no_toc}

## Table of contents
{: .no_toc .text-delta}

* toc
{:toc}

---

## Install VueGL and dependent libraries
See [installation guide](installation) to know various installation methods.

To load latest libraries from UNPKG, put following codes into the HTML.

```html
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/three"></script>
<script src="https://unpkg.com/vue-gl"></script>
```

## Register VueGL components to Vue
Vue.js supports global and local component registration. If you are using a module
bundler like [Webpack](//webpack.js.org) or [rollup.js](//rollupjs.org), you may
prefer [local registration](//vuejs.org/v2/guide/components-registration.html#Local-Registration).
For prototyping, [global registration](//vuejs.org/v2/guide/components-registration.html#Global-Registration)
is a more convenient way.

To register all VueGL components, run following script after loading libraries.

```js
Object.keys(VueGL).forEach((name) => Vue.component(name, VueGL[name]));
```

## Create a canvas with VueGL
[`VglRenderer`](/components/renderers/vgl-renderer) is a VueGL component that initializes
`<canvas>` element for our drawings. The canvas is created in `<div>` wrapper container
and is responsively resized to container size. To avoid unstable behaviors, apply
size constraints enough to the wrapper `<div>` element.

Following template and CSS create a canvas with specific size.

HTML

```html
<vgl-renderer class="getting-started"></vgl-renderer>
```

CSS

```css
.getting-started {
  width: 400px;
  height: 247px;
}
```

Then create a Vue instance and you will see a black canvas on browser.

```js
new Vue({ el: '.getting-started' });
```

Here is the result of loading codes so far. To try it in your local environment,
copy and save the whole HTML below, then load it on a modern web browser.

<div class="code-example">
  <div class="max-width-1-2">
    <div class="aspect-1618-1000">
      <vgl-renderer></vgl-renderer>
    </div>
  </div>
</div>
```html
<!DOCTYPE html>
<head>
  <meta charset="utf-8">
  <style>
    .getting-started {
      width: 400px;
      height: 247px;
    }
  </style>
</head>
<body>
  <vgl-renderer class="getting-started"></vgl-renderer>
  <script src="https://unpkg.com/vue"></script>
  <script src="https://unpkg.com/three"></script>
  <script src="https://unpkg.com/vue-gl"></script>
  <script>
    Object.keys(VueGL).forEach((name) => Vue.component(name, VueGL[name]));
    new Vue({ el: '.getting-started' });
  </script>
</body>
```

## Draw 3D objects on canvas
To render objects on the canvas, define a scene and a camera in [`VglRenderer`](/components/renderers/vgl-renderer)'s
default [slot](//vuejs.org/v2/guide/components.html#Content-Distribution-with-Slots).

A scene must be a [`VglScene`](/components/scenes/vgl-scene) component. `VglScene`
component can have components to be rendered as its descendants. Any components
of [objects](/components/objects) can be rendered.

A camera must be one of [cameras](/components/cameras). The position and rotation
of the camera determine where in the scene space to be rendered.

Definition of scene and camera is like below.

<div class="code-example">
  <div class="max-width-1-2">
    <div class="aspect-1618-1000">
      <vgl-renderer id="getting-started-2">
        <vgl-box-geometry name="box"></vgl-box-geometry>
        <vgl-scene>
          <vgl-mesh geometry="box"></vgl-mesh>
        </vgl-scene>
        <vgl-perspective-camera orbit-position="3 1 0.5"></vgl-perspective-camera>
      </vgl-renderer>
    </div>
  </div>
</div>
```html
<vgl-renderer class="getting-started">
  <vgl-box-geometry name="box"></vgl-box-geometry>
  <vgl-scene>
    <vgl-mesh geometry="box"></vgl-mesh>
  </vgl-scene>
  <vgl-perspective-camera orbit-position="3 1 0.5"></vgl-perspective-camera>
</vgl-renderer>
```

In the example above, the [`VglScene`](/components/scenes/vgl-scene) component has
a [`VglMesh`](/components/objects/vgl-mesh) component as its child. So that the
mesh object is rendered.

The `VglMesh` component gets `geometry` prop as its geometry's name. Since VueGL
provides [namespaces](namespaces) to specify objects by name under the `VglRenderer`,
the geometry created by [`VglBoxGeometry`](/components/geometries/vgl-box-geometry)
named 'box' is used as geometry of the mesh.

The [`VglPerspectiveCamera`](/components/cameras/vgl-perspective-camera) gets a
string as the `orbit-position` prop. The string '3 1 0.5' is parsed as
`new THREE.Spherical(3, 1, 0.5)` because `orbit-position` prop has type of `spherical`.
Then camera position is set to (radius, phi, theta) = (3, 1rad, 0.5rad) on spherical
coordinate system. Props of VueGL components have their specific types. For more
information, see the [prop types](/prop-types) reference.

[Installation](installation){: .btn .nav-prev}
[Namespaces](namespaces){: .btn .nav-next}
{: .d-flex .mt-8 .justify-between}
