---
layout: reference
---
{% include breadcrumbs/cameras.md %} VglPerspectiveCamera
# VglPerspectiveCamera `<vgl-perspective-camera>`
Camera that uses perspective projection, corresponding [THREE.PerspectiveCamera](https://threejs.org/docs/index.html#api/cameras/PerspectiveCamera). Camera frustum aspect ratio is automatically set to the renderer aspect ratio.
## Mixins
See the mixin components below for common properties.
* [VglCamera](vgl-camera)

## Properties
* {% include prop.md name="near" type="float" %} - Camera frustum near plane.
* {% include prop.md name="far" type="float" %} - Camera frustum far plane.
* {% include prop.md name="fov" type="float" %} - Camera frustum vertical field of view, from bottom to top of view, in degrees.
* {% include prop.md name="zoom" type="float" %} - Zoom factor of the camera.

## Example usage
```html
<vgl-renderer antialias style="width: 300px; height: 150px;">
    <vgl-scene>
        <vgl-box-geometry name="box" width=7.5 height=7.5 depth=7.5></vgl-box-geometry>
        <vgl-mesh-standard-material name="std"></vgl-mesh-standard-material>
        <vgl-mesh geometry="box" material="std"></vgl-mesh>
        <vgl-ambient-light color="#ffeecc"></vgl-ambient-light>
        <vgl-directional-light position="0 1 2"></vgl-directional-light>
    </vgl-scene>
    <vgl-perspective-camera orbit-position="20 1 1"></vgl-perspective-camera>
</vgl-renderer>
```
<div class="vgl-example"><iframe class="vgl-example__content" srcdoc="
    <style>
        body {
            margin: 0;
            overflow: hidden;
        }
        .vgl-canvas {
            height: 100vh;
        }
    </style>
    <vgl-renderer antialias class='vgl-canvas'>
        <vgl-scene>
            <vgl-box-geometry name='box' width=7.5 height=7.5 depth=7.5></vgl-box-geometry>
            <vgl-mesh-standard-material name='std'></vgl-mesh-standard-material>
            <vgl-mesh geometry='box' material='std'></vgl-mesh>
            <vgl-ambient-light color='#ffeecc'></vgl-ambient-light>
            <vgl-directional-light position='0 1 2'></vgl-directional-light>
        </vgl-scene>
        <vgl-perspective-camera orbit-position='20 1 1'></vgl-perspective-camera>
    </vgl-renderer>
    <script src='https://unpkg.com/vue/dist/vue.min.js'></script>
    <script src='https://unpkg.com/three/build/three.min.js'></script>
    <script src='../js/vue-gl.js'></script>
    <script>
        Object.keys(VueGL).forEach(function(name) {
            Vue.component(name, VueGL[name]);
        });
        const vm = new Vue({
            el: '.vgl-canvas'
        });
    </script>
"></iframe></div>
<script src="https://unpkg.com/srcdoc-polyfill@1.0.0/srcdoc-polyfill.min.js"></script>
