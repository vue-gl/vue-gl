---
layout: reference
---
{% include breadcrumbs/geometries.md %} VglTextGeometry
# VglTextGeometry `<vgl-text-geometry>`
A component for generating text as a single geometry, corresponding [THREE.TextGeometry](https://threejs.org/docs/index.html#api/geometries/TextGeometry).
## Mixins
See the mixin components below for common properties.
* [VglExtrudeGeometry](vgl-extrude-geometry)

## Properties
* {% include prop.md name="text" type="string" %} - The text that needs to be shown.
* {% include prop.md name="font" type="string" %} - The path or URL to the facetype json file. This can also be a Data URI.
* {% include prop.md name="size" type="float" %} - Size of the text.
* {% include prop.md name="height" type="float" %} - Thickness to extrude text.
* {% include prop.md name="curveSegments" type="int" %} - Number of points on the curves.
* {% include prop.md name="bevelEnabled" type="bool" %} - Turn on bevel.
* {% include prop.md name="bevelThickness" type="float" %} - How deep into text bevel goes.
* {% include prop.md name="bevelSize" type="float" %} - How far from text outline is bevel.
* {% include prop.md name="bevelSegments" type="int" %} - Number of bevel segments.
* {% include prop.md name="bevelSegments" type="int" %} - Number of bevel segments.

## Example usage
```html
<vgl-renderer antialias style="width: 300px; height: 150px;">
    <vgl-scene>
        <vgl-font src="" name="font"></vgl-font>
        <vgl-text-geometry name="text" font="path/to/font.json" text="Text to be displayed."></vgl-text-geometry>
        <vgl-mesh-standard-material name="std"></vgl-mesh-standard-material>
        <vgl-mesh geometry="text" material="std" position="-750 0 0"></vgl-mesh>
        <vgl-ambient-light color="#ffeecc"></vgl-ambient-light>
        <vgl-directional-light position="0 1 2"></vgl-directional-light>
    </vgl-scene>
    <vgl-perspective-camera orbit-position="1000 1.3 0.3"></vgl-perspective-camera>
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
            <vgl-text-geometry name='text' font='https://unpkg.com/three/examples/fonts/helvetiker_regular.typeface.json' text='Text to be displayed.'></vgl-text-geometry>
            <vgl-mesh-standard-material name='std'></vgl-mesh-standard-material>
            <vgl-mesh geometry='text' material='std' position='-750 0 0'></vgl-mesh>
            <vgl-ambient-light color='#ffeecc'></vgl-ambient-light>
            <vgl-directional-light position='0 1 2'></vgl-directional-light>
        </vgl-scene>
        <vgl-perspective-camera orbit-position='1000 1.3 0.3'></vgl-perspective-camera>
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
