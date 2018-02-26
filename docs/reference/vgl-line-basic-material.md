---
layout: reference
---
{% include breadcrumbs/materials.md %} VglLineBasicMaterial
# VglLineBasicMaterial `<vgl-line-basic-material>`
A material for drawing wireframe-style geometries, corresponding [THREE.LineBasicMaterial](https://threejs.org/docs/index.html#api/materials/LineBasicMaterial).
## Mixins
See the mixin components below for common properties.
* [VglMaterial](vgl-material)

## Properties
* {% include prop.md name="color" type="string" %} - CSS style color of the material.
* {% include prop.md name="lights" type="boolean" %} - A boolean whether the material is affected by lights.
* {% include prop.md name="linewidth" type="float" %} - The line thickness.
* {% include prop.md name="linecap" type="string" %} - Define appearance of line ends. Possible values are "butt", "round" and "square".
* {% include prop.md name="linejoin" type="string" %} - Define appearance of line joints. Possible values are "round", "bevel" and "miter".

## Example usage
```html
<vgl-renderer antialias style="width: 300px; height: 150px;">
    <vgl-scene>
        <vgl-box-geometry name="box" width=7.5 height=7.5 depth=7.5></vgl-box-geometry>
        <vgl-line-basic-material name="line"></vgl-line-basic-material>
        <vgl-line geometry="box" material="line"></vgl-line>
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
            <vgl-line-basic-material name='line'></vgl-line-basic-material>
            <vgl-line geometry='box' material='line'></vgl-line>
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
