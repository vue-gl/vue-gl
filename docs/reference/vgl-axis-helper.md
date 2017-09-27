---
layout: reference
---
[Home](..) &gt; [References](.) &gt; [Helpers](.#helpers) &gt; VglAxisHelper
# VglAxisHelper `<vgl-axis-helper>`
An axis object to visualize the the 3 axes in a simple way, corresponding [THREE.AxisHelper](https://threejs.org/docs/index.html#api/helpers/AxisHelper). The X axis is red. The Y axis is green. The Z axis is blue.
## Mixins
See the mixin components below for common properties.
* [VglLineSegments](vgl-line-segments)

## Properties
* `size` - Size of the lines representing the axes.

## Example usage
```html
<vgl-renderer :antialias="true" style="width: 300px; height: 150px;">
    <vgl-scene>
        <vgl-axis-helper></vgl-axis-helper>
    </vgl-scene>
    <vgl-perspective-camera orbit-position="radius: 3; phi: 1; theta: 0.5;"></vgl-perspective-camera>
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
            <vgl-axis-helper></vgl-axis-helper>
        </vgl-scene>
        <vgl-perspective-camera orbit-position='radius: 3; phi: 1; theta: 0.5;'></vgl-perspective-camera>
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
