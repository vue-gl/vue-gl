---
layout: reference
---
{% include breadcrumbs/geometries.md %} VglConeGeometry
# VglConeGeometry `<vgl-cone-geometry>`
This is a component for generating cone geometries, corresponding [THREE.ConeGeometry](https://threejs.org/docs/index.html#api/geometries/ConeGeometry).
## Mixins
See the mixin components below for common properties.
* [VglCylinderGeometry](vgl-cylinder-geometry)

## Properties
* {% include prop.md name="radius" type="float" %} - Radius of the cone at the base.

## Example usage
```html
<vgl-renderer antialias style="width: 300px; height: 150px;">
    <vgl-scene>
        <vgl-cone-geometry name="cone" radius=7.5 height=10></vgl-cone-geometry>
        <vgl-mesh-standard-material name="std"></vgl-mesh-standard-material>
        <vgl-mesh geometry="cone" material="std" position="0 2.5 0"></vgl-mesh>
        <vgl-ambient-light color="#ffeecc"></vgl-ambient-light>
        <vgl-directional-light position="0 1 2"></vgl-directional-light>
    </vgl-scene>
    <vgl-perspective-camera orbit-position="20 1 0.5"></vgl-perspective-camera>
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
            <vgl-cone-geometry name='cone' radius=7.5 height=10></vgl-cone-geometry>
            <vgl-mesh-standard-material name='std'></vgl-mesh-standard-material>
            <vgl-mesh geometry='cone' material='std' position='0 2.5 0'></vgl-mesh>
            <vgl-ambient-light color='#ffeecc'></vgl-ambient-light>
            <vgl-directional-light position='0 1 2'></vgl-directional-light>
        </vgl-scene>
        <vgl-perspective-camera orbit-position='20 1 0.5'></vgl-perspective-camera>
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
