---
layout: reference
---
[Home](..) &gt; [References](.) &gt; [Materials](.#materials) &gt; VglLineBasicMaterial
# VglLineBasicMaterial `<vgl-line-basic-material>`
A material for drawing wireframe-style geometries, corresponding [THREE.LineBasicMaterial](https://threejs.org/docs/index.html#api/materials/LineBasicMaterial).
## Mixins
See the mixin components below for common properties.
* [VglMaterial](vgl-material)

## Properties
* `color` - CSS style color of the material.
* `lights` - A boolean whether the material is affected by lights.
* `linewidth` - The line thickness.
* `linecap` - Define appearance of line ends. Possible values are "butt", "round" and "square".
* `linejoin` - Define appearance of line joints. Possible values are "round", "bevel" and "miter".

## Example usage
```html
<vgl-renderer :antialias="true" style="width: 300px; height: 150px;">
    <vgl-scene>
        <vgl-box-geometry name="box" width=7.5 height=7.5 depth=7.5></vgl-box-geometry>
        <vgl-line-basic-material name="line"></vgl-line-basic-material>
        <vgl-line geometry="box" material="line"></vgl-line>
    </vgl-scene>
    <vgl-perspective-camera orbit-position="radius: 20; phi: 1; theta: 1;"></vgl-perspective-camera>
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
            <vgl-box-geometry name='box' width=7.5 height=7.5 depth=7.5></vgl-box-geometry>
            <vgl-line-basic-material name='line'></vgl-line-basic-material>
            <vgl-line geometry='box' material='line'></vgl-line>
        </vgl-scene>
        <vgl-perspective-camera orbit-position='radius: 20; phi: 1; theta: 1;'></vgl-perspective-camera>
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
