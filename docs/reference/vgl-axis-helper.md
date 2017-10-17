---
layout: reference
---
{% include breadcrumbs/helpers.md %} &gt; VglAxisHelper
# VglAxisHelper `<vgl-axis-helper>`
An axis object to visualize the the 3 axes in a simple way, corresponding [THREE.AxisHelper](https://threejs.org/docs/index.html#api/helpers/AxisHelper). The X axis is red. The Y axis is green. The Z axis is blue.
## Mixins
See the mixin components below for common properties.
* [VglLineSegments](vgl-line-segments)

## Properties
* {% include prop.md name="size" type="float" %} - Size of the lines representing the axes.

## Example usage
```html
<vgl-renderer antialias style="width: 300px; height: 150px;">
    <vgl-scene>
        <vgl-axis-helper></vgl-axis-helper>
    </vgl-scene>
    <vgl-perspective-camera orbit-position="3 1 0.5"></vgl-perspective-camera>
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
            <vgl-axis-helper></vgl-axis-helper>
        </vgl-scene>
        <vgl-perspective-camera orbit-position='3 1 0.5'></vgl-perspective-camera>
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
