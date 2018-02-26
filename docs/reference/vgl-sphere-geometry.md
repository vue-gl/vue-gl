---
layout: reference
---
{% include breadcrumbs/geometries.md %} VglSphereGeometry
# VglSphereGeometry `<vgl-sphere-geometry>`
This is a component for generating sphere geometries, corresponding [THREE.SphereGeometry](https://threejs.org/docs/index.html#api/geometries/SphereGeometry).
## Mixins
See the mixin components below for common properties.
* [VglGeometry](vgl-geometry)

## Properties
* {% include prop.md name="radius" type="float" %} - Sphere radius.
* {% include prop.md name="widthSegments" type="int" %} - Number of horizontal segments.
* {% include prop.md name="heightSegments" type="int" %} - Number of vertical segments.
* {% include prop.md name="phiStart" type="float" %} - Specify horizontal starting angle.
* {% include prop.md name="phiLength" type="float" %} - Specify horizontal sweep angle size.
* {% include prop.md name="thetaStart" type="float" %} - Specify vertical starting angle.
* {% include prop.md name="thetaLength" type="float" %} - Specify vertical sweep angle size.

## Example usage
```html
<vgl-renderer antialias style="width: 300px; height: 150px;">
    <vgl-scene>
        <vgl-sphere-geometry name="sphere" radius=7.5 width-segments=64 height-segments=32></vgl-sphere-geometry>
        <vgl-mesh-standard-material name="std"></vgl-mesh-standard-material>
        <vgl-mesh geometry="sphere" material="std"></vgl-mesh>
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
            <vgl-sphere-geometry name='sphere' radius=7.5 width-segments=64 height-segments=32></vgl-sphere-geometry>
            <vgl-mesh-standard-material name='std'></vgl-mesh-standard-material>
            <vgl-mesh geometry='sphere' material='std'></vgl-mesh>
            <vgl-ambient-light color='#ffeecc'></vgl-ambient-light>
            <vgl-directional-light position='0 1 2'></vgl-directional-light>
        </vgl-scene>
        <vgl-perspective-camera orbit-position='20 1 0.5'></vgl-perspective-camera>
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
