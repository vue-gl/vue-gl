---
layout: reference
---
{% include breadcrumbs/geometries.md %} VglCylinderGeometry
# VglCylinderGeometry `<vgl-cylinder-geometry>`
This is a component for generating cylinder geometries, corresponding [THREE.CylinderGeometry](https://threejs.org/docs/index.html#api/geometries/CylinderGeometry).
## Mixins
See the mixin components below for common properties.
* [VglGeometry](vgl-geometry)

## Properties
* {% include prop.md name="radiusTop" type="float" %} - Radius of the cylinder at the top.
* {% include prop.md name="radiusBottom" type="float" %} - Radius of the cylinder at the bottom.
* {% include prop.md name="height" type="float" %} - Height of the cylinder.
* {% include prop.md name="radialSegments" type="int" %} - Number of segmented faces around the circumference of the cylinder.
* {% include prop.md name="heightSegments" type="int" %} - Number of rows of faces along the height of the cylinder.
* {% include prop.md name="openEnded" type="boolean" %} - A Boolean indicating whether the ends of the cylinder are open or capped.
* {% include prop.md name="thetaStart" type="float" %} - Start angle for first segment.
* {% include prop.md name="thetaLength" type="float" %} - The central angle of the circular sector.

## Example usage
```html
<vgl-renderer antialias style="width: 300px; height: 150px;">
    <vgl-scene>
        <vgl-cylinder-geometry name="cylinder" radius-top=7.5 radius-bottom=6 height=10></vgl-cylinder-geometry>
        <vgl-mesh-standard-material name="std"></vgl-mesh-standard-material>
        <vgl-mesh geometry="cylinder" material="std"></vgl-mesh>
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
            <vgl-cylinder-geometry name='cylinder' radius-top=7.5 radius-bottom=6 height=10></vgl-cylinder-geometry>
            <vgl-mesh-standard-material name='std'></vgl-mesh-standard-material>
            <vgl-mesh geometry='cylinder' material='std'></vgl-mesh>
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
