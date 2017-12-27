---
layout: reference
---
{% include breadcrumbs/helpers.md %} &gt; VglPolarGridHelper
# VglPolarGridHelper `<vgl-polar-grid-helper>`
A component to define polar grids, corresponding [THREE.PolarGridHelper](https://threejs.org/docs/index.html#api/helpers/PolarGridHelper). Grids are two-dimensional arrays of lines.
## Mixins
See the mixin components below for common properties.
* [VglLineSegments](vgl-line-segments)

## Properties
* {% include prop.md name="radius" type="float" %} - The radius of the polar grid.
* {% include prop.md name="radials" type="int" %} - The number of radial lines.
* {% include prop.md name="circles" type="int" %} - The number of circles.
* {% include prop.md name="divisions" type="int" %} - The number of line segments used for each circle.
* {% include prop.md name="color1" type="string" %} - The first color used for grid elements.
* {% include prop.md name="color2" type="string" %} - The second color used for grid elements.

## Example usage
```html
<vgl-renderer antialias style="width: 300px; height: 150px;">
    <vgl-scene>
        <vgl-polar-grid-helper></vgl-polar-grid-helper>
    </vgl-scene>
    <vgl-perspective-camera orbit-position="25 1 0"></vgl-perspective-camera>
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
            <vgl-polar-grid-helper></vgl-polar-grid-helper>
        </vgl-scene>
        <vgl-perspective-camera orbit-position='25 1 0'></vgl-perspective-camera>
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
