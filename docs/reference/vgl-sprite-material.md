---
layout: reference
---
{% include breadcrumbs/materials.md %} VglSpriteMaterial
# VglSpriteMaterial `<vgl-sprite-material>`
A material for a use with a [VglSprite](vgl-sprite) component, corresponding [THREE.SpriteMaterial](https://threejs.org/docs/index.html#api/materials/SpriteMaterial).
## Mixins
See the mixin components below for common properties.
* [VglMaterial](vgl-material)

## Properties
* {% include prop.md name="color" type="string" %} - CSS style color of the material.
* {% include prop.md name="map" type="string" %} - The texture map of the material.

## Example usage
```html
<vgl-renderer antialias style="width: 300px; height: 150px;">
    <vgl-scene>
        <vgl-texture name="tex" src="path/to/image.png"></vgl-texture>
        <vgl-sprite-material name="spm" map="tex"></vgl-sprite-material>
        <vgl-sprite material="spm"></vgl-sprite>
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
            <vgl-texture name='tex' src='../img/star.gif'></vgl-texture>
            <vgl-sprite-material name='spm' map='tex'></vgl-sprite-material>
            <vgl-sprite material='spm'></vgl-sprite>
        </vgl-scene>
        <vgl-perspective-camera orbit-position='3 1 1'></vgl-perspective-camera>
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
