---
layout: reference
---
{% include breadcrumbs/helpers.md %} &gt; VglGridHelper
# VglGridHelper `<vgl-grid-helper>`
A component to define grids, corresponding [THREE.GridHelper](https://threejs.org/docs/index.html#api/helpers/GridHelper). Grids are two-dimensional arrays of lines.
## Mixins
See the mixin components below for common properties.
* [VglLineSegments](vgl-line-segments)

## Properties
* {% include prop.md name="size" type="float" %} - The size of the grid.
* {% include prop.md name="divisions" type="int" %} - The number of divisions across the grid.
* {% include prop.md name="colorCenterLine" type="string" %} - The color of the centerline.
* {% include prop.md name="colorGrid" type="string" %} - The color of the lines of the grid.

## Example usage
```html
<vgl-renderer antialias style="width: 300px; height: 150px;">
    <vgl-scene>
        <vgl-grid-helper></vgl-grid-helper>
    </vgl-scene>
    <vgl-perspective-camera orbit-position="15 1 0.5"></vgl-perspective-camera>
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
            <vgl-grid-helper></vgl-grid-helper>
        </vgl-scene>
        <vgl-perspective-camera orbit-position='15 1 0.5'></vgl-perspective-camera>
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
