---
layout: reference
---
[Home](..) &gt; [References](.) &gt; [Helpers](.#helpers) &gt; VglArrowHelper
# VglArrowHelper `<vgl-arrow-helper>`
An 3D arrow object for visualizing directions, corresponding [THREE.ArrowHelper](https://threejs.org/docs/index.html#api/helpers/ArrowHelper).
## Mixins
See the mixin components below for common properties.
* [VglObject3d](vgl-object3d)

## Properties
* `dir` - Direction from origin.
* `length` - Length of the arrow.
* `color` - Color of the arrow.
* `headLength` - The length of the head of the arrow.
* `headWidth` - The width of the head of the arrow.

## Example usage
```html
<vgl-renderer :antialias="true" style="width: 300px; height: 150px;">
    <vgl-scene>
        <vgl-arrow-helper position="-0.3 0.15 0.2"></vgl-arrow-helper>
    </vgl-scene>
    <vgl-perspective-camera orbit-position="radius: 2; phi: 1; theta: 0.5;"></vgl-perspective-camera>
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
    <vgl-renderer :antialias='true' class='vgl-canvas'>
        <vgl-scene>
            <vgl-arrow-helper position='-0.3 0.15 0.2'></vgl-arrow-helper>
        </vgl-scene>
        <vgl-perspective-camera orbit-position='radius: 2; phi: 1; theta: 0.5;'></vgl-perspective-camera>
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
