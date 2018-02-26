---
layout: reference
---
{% include breadcrumbs/materials.md %} VglMeshStandardMaterial
# VglMeshStandardMaterial `<vgl-mesh-standard-material>`
A standard physically based material, corresponding [THREE.MeshStandardMaterial](https://threejs.org/docs/index.html#api/materials/MeshStandardMaterial). Using Metallic-Roughness workflow.
## Mixins
See the mixin components below for common properties.
* [VglMaterial](vgl-material)

## Properties
* {% include prop.md name="color" type="string" %} - CSS style color of the material.
* {% include prop.md name="map" type="string" %} - The color map of the material.

## Example usage
```html
<vgl-renderer antialias style="width: 300px; height: 150px;">
    <vgl-scene>
        <vgl-box-geometry name="box" width=7.5 height=7.5 depth=7.5></vgl-box-geometry>
        <vgl-mesh-standard-material name="std" color="#00ffff"></vgl-mesh-standard-material>
        <vgl-mesh geometry="box" material="std"></vgl-mesh>
        <vgl-ambient-light color='#ffeecc'></vgl-ambient-light>
        <vgl-directional-light position='0 2 1'></vgl-directional-light>
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
            <vgl-mesh-standard-material name='std' color='#00ffff'></vgl-mesh-standard-material>
            <vgl-mesh geometry='box' material='std'></vgl-mesh>
            <vgl-ambient-light color='#ffeecc'></vgl-ambient-light>
            <vgl-directional-light position='0 2 1'></vgl-directional-light>
        </vgl-scene>
        <vgl-perspective-camera orbit-position='20 1 1'></vgl-perspective-camera>
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
