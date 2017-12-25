---
layout: reference
---
{% include breadcrumbs/materials.md %} VglShadowMaterial
# VglShadowMaterial `<vgl-shadow-material>`
This material can receive shadows but otherwise is completely transparent, corresponding [THREE.ShadowMaterial](https://threejs.org/docs/index.html#api/materials/ShadowMaterial).
## Mixins
See the mixin components below for common properties.
* [VglMaterial](vgl-material)

## Example usage
```html
<vgl-renderer antialias shadow-map-enabled alpha style="width: 300px; height: 150px;">
    <vgl-scene>
        <vgl-box-geometry name="box" width=1 height=1 depth=1></vgl-box-geometry>
        <vgl-mesh-standard-material name="std" color="#ffbbaa"></vgl-mesh-standard-material>
        <vgl-mesh geometry="box" material="std" position="0 0.5 0" cast-shadow></vgl-mesh>
        <vgl-plane-geometry name="plane" width=3.5 height=3.5></vgl-plane-geometry>
        <vgl-shadow-material name="shadow"></vgl-shadow-material>
        <vgl-mesh geometry="plane" material="shadow" rotation="-1.570796 0 0" receive-shadow></vgl-mesh>
        <vgl-ambient-light color="#ffeecc"></vgl-ambient-light>
        <vgl-directional-light position="-1 2 2" cast-shadow></vgl-directional-light>
    </vgl-scene>
    <vgl-perspective-camera orbit-position="3 1 0.7" orbit-target="0 0.5 0"></vgl-perspective-camera>
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
    <vgl-renderer antialias shadow-map-enabled alpha class='vgl-canvas'>
        <vgl-scene>
            <vgl-box-geometry name='box' width=1 height=1 depth=1></vgl-box-geometry>
            <vgl-mesh-standard-material name='std' color='#ffbbaa'></vgl-mesh-standard-material>
            <vgl-mesh geometry='box' material='std' position='0 0.5 0' cast-shadow></vgl-mesh>
            <vgl-plane-geometry name='plane' width=3.5 height=3.5></vgl-plane-geometry>
            <vgl-shadow-material name='shadow'></vgl-shadow-material>
            <vgl-mesh geometry='plane' material='shadow' rotation='-1.570796 0 0' receive-shadow></vgl-mesh>
            <vgl-ambient-light color='#ffeecc'></vgl-ambient-light>
            <vgl-directional-light position='-1 2.5 2' cast-shadow></vgl-directional-light>
        </vgl-scene>
        <vgl-perspective-camera orbit-position='3 1 0.7' orbit-target='0 0.5 0'></vgl-perspective-camera>
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
