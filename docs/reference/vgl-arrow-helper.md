---
layout: reference
---
{% include breadcrumbs/helpers.md %} VglArrowHelper
# VglArrowHelper `<vgl-arrow-helper>`
An 3D arrow object for visualizing directions, corresponding [THREE.ArrowHelper](https://threejs.org/docs/index.html#api/helpers/ArrowHelper).
## Mixins
See the mixin components below for common properties.
* [VglObject3d](vgl-object3d)

## Properties
* {% include prop.md name="dir" type="vector3" %} - Direction from origin.
* {% include prop.md name="length" type="float" %} - Length of the arrow.
* {% include prop.md name="color" type="string" %} - Color of the arrow.
* {% include prop.md name="headLength" type="float" %} - The length of the head of the arrow.
* {% include prop.md name="headWidth" type="float" %} - The width of the head of the arrow.

## Example usage
```html
<vgl-renderer antialias style="width: 300px; height: 150px;">
    <vgl-scene>
        <vgl-arrow-helper position="-0.3 0.15 0.2" dir="1 0 0"></vgl-arrow-helper>
    </vgl-scene>
    <vgl-perspective-camera orbit-position="2 1 0.5"></vgl-perspective-camera>
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
            <vgl-arrow-helper position='-0.3 0.15 0.2' dir='1 0 0'></vgl-arrow-helper>
        </vgl-scene>
        <vgl-perspective-camera orbit-position='2 1 0.5'></vgl-perspective-camera>
    </vgl-renderer>
    <script src='../js/vue.min.js'></script>
    <script src='../js/three.min.js'></script>
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
