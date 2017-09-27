---
layout: reference
---
[Home](..) &gt; [References](.) &gt; [Materials](.#materials) &gt; VglPointsMaterial
# VglPointsMaterial `<vgl-points-material>`
The default material used by [VglPoints](vgl-points), corresponding [THREE.PointsMaterial](https://threejs.org/docs/index.html#api/materials/PointsMaterial).
## Mixins
See the mixin components below for common properties.
* [VglMaterial](vgl-material)

## Properties
* `color` - CSS style color of the material.
* `size` - The size of the points.
* `sizeAttenuation` - Specify whether points' size will get smaller with the distance.

## Example usage
```html
<vgl-renderer :antialias="true" style="width: 300px; height: 150px;">
    <vgl-scene>
        <vgl-box-geometry name="box" width=7.5 height=7.5 depth=7.5></vgl-box-geometry>
        <vgl-points-material name="pts" color="#ff0000"></vgl-points-material>
        <vgl-points geometry="box" material="pts"></vgl-points>
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
            <vgl-points-material name='pts' color='#ff0000'></vgl-points-material>
            <vgl-points geometry='box' material='pts'></vgl-points>
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
