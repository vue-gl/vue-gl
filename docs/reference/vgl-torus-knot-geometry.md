---
layout: reference
---
{% include breadcrumbs/geometries.md %} VglTorusKnotGeometry
# VglTorusKnotGeometry `<vgl-torus-knot-geometry>`
A component for generating torus knot geometries, corresponding [THREE.TorusKnotGeometry](https://threejs.org/docs/index.html#api/geometries/TorusKnotGeometry).
## Mixins
See the mixin components below for common properties.
* [VglGeometry](vgl-geometry)

## Properties
* {% include prop.md name="radius" type="float" %} - Radius of the torus.
* {% include prop.md name="tube" type="float" %} - Diamiter of the tube.
* {% include prop.md name="radialSegments" type="int" %} - Number of segments of the tube's section.
* {% include prop.md name="tubularSegments" type="int" %} - Number of segments along to the tube length direction.
* {% include prop.md name="p" type="int" %} - This value determines how many times the geometry winds around its axis of rotational symmetry.
* {% include prop.md name="q" type="int" %} - This value determines, how many times the geometry winds around a circle in the interior of the torus.

## Example usage
```html
<vgl-renderer antialias style="width: 300px; height: 150px;">
    <vgl-scene>
        <vgl-torus-knot-geometry name="torus" radius=20 tube=5></vgl-torus-knot-geometry>
        <vgl-mesh-standard-material name="std"></vgl-mesh-standard-material>
        <vgl-mesh geometry="torus" material="std"></vgl-mesh>
        <vgl-ambient-light color="#ffeecc"></vgl-ambient-light>
        <vgl-directional-light position="0 1 2"></vgl-directional-light>
    </vgl-scene>
    <vgl-perspective-camera orbit-position="100 1 0.5"></vgl-perspective-camera>
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
            <vgl-torus-knot-geometry name='torus' radius=20 tube=5></vgl-torus-knot-geometry>
            <vgl-mesh-standard-material name='std'></vgl-mesh-standard-material>
            <vgl-mesh geometry='torus' material='std'></vgl-mesh>
            <vgl-ambient-light color='#ffeecc'></vgl-ambient-light>
            <vgl-directional-light position='0 1 2'></vgl-directional-light>
        </vgl-scene>
        <vgl-perspective-camera orbit-position='100 1 0.5'></vgl-perspective-camera>
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
