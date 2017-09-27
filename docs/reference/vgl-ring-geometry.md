---
layout: reference
---
[Home](..) &gt; [References](.) &gt; [Geometries](.#geometries) &gt; VglRingGeometry
# VglRingGeometry `<vgl-ring-geometry>`
This is a simple shape component of Euclidean geometry, corresponding [THREE.RingGeometry](https://threejs.org/docs/index.html#api/geometries/RingGeometry). It is contructed from a number of triangular segments that are oriented around a central point and extend as far out as a given radius. It is built counter-clockwise from a start angle and a given central angle. It can also be used to create regular polygons, where the number of segments determines the number of sides.
## Mixins
See the mixin components below for common properties.
* [VglGeometry](vgl-geometry)

## Properties
* `innerRadius` - Inner radius of the ring.
* `outerRadius` - Outer radius of the ring.
* `thetaSegments` - Number of segments along to the tangential direction.
* `phiSegments` - Number of segments along to the radial direction.
* `thetaStart` - The starting angle.
* `thetaLength` - The central angle.

## Example usage
```html
<vgl-renderer :antialias="true" style="width: 300px; height: 150px;">
    <vgl-scene>
        <vgl-ring-geometry name="ring" inner-radius=5 outer-radius=10></vgl-ring-geometry>
        <vgl-mesh-standard-material name="std"></vgl-mesh-standard-material>
        <vgl-mesh geometry="ring" material="std"></vgl-mesh>
        <vgl-ambient-light color="#ffeecc"></vgl-ambient-light>
        <vgl-directional-light position="0 1 2"></vgl-directional-light>
    </vgl-scene>
    <vgl-perspective-camera orbit-position="radius: 25; phi: 1; theta: 0.5;"></vgl-perspective-camera>
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
            <vgl-ring-geometry name='ring' inner-radius=5 outer-radius=10></vgl-ring-geometry>
            <vgl-mesh-standard-material name='std'></vgl-mesh-standard-material>
            <vgl-mesh geometry='ring' material='std'></vgl-mesh>
            <vgl-ambient-light color='#ffeecc'></vgl-ambient-light>
            <vgl-directional-light position='0 1 2'></vgl-directional-light>
        </vgl-scene>
        <vgl-perspective-camera orbit-position='radius: 25; phi: 1; theta: 0.5;'></vgl-perspective-camera>
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
