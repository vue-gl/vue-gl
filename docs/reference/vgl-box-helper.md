---
layout: reference
---
{% include breadcrumbs/helpers.md %} VglBoxHelper
# VglBoxHelper `<vgl-box-helper>`
A helper component to show the world-axis-aligned bounding box around its parent, corresponding [THREE.BoxHelper](https://threejs.org/docs/index.html#api/helpers/BoxHelper).
## Mixins
See the mixin components below for common properties.
* [VglLineSegments](vgl-line-segments)

## Properties
* {% include prop.md name="color" type="string" %} - Size of the lines representing the axes.

## Example usage
```html
<vgl-renderer antialias style="width: 300px; height: 150px;">
    <vgl-scene>
        <vgl-sphere-geometry name="sph"></vgl-sphere-geometry>
        <vgl-mesh-standard-material name="mtl"></vgl-mesh-standard-material>
        <vgl-mesh geometry="sph" material="mtl">
            <vgl-box-helper></vgl-box-helper>
        </vgl-mesh>
        <vgl-ambient-light></vgl-ambient-light>
        <vgl-directional-light position="0 1 1"></vgl-directional-light>
    </vgl-scene>
    <vgl-perspective-camera orbit-position="5 1 0.5"></vgl-perspective-camera>
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
            <vgl-sphere-geometry name='sph'></vgl-sphere-geometry>
            <vgl-mesh-standard-material name='mtl'></vgl-mesh-standard-material>
            <vgl-mesh geometry='sph' material='mtl'>
                <vgl-box-helper></vgl-box-helper>
            </vgl-mesh>
            <vgl-ambient-light></vgl-ambient-light>
            <vgl-directional-light position='0 1 1'></vgl-directional-light>
        </vgl-scene>
        <vgl-perspective-camera orbit-position='5 1 0.5'></vgl-perspective-camera>
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
