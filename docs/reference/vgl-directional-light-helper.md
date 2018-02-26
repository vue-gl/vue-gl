---
layout: reference
---
{% include breadcrumbs/helpers.md %} VglDirectionalLightHelper
# VglDirectionalLightHelper `<vgl-directional-light-helper>`
A helper component to assist with visualizing a DirectionalLight's effect on the scene, corresponding [THREE.DirectionalLightHelper](https://threejs.org/docs/index.html#api/helpers/DirectionalLightHelper).
## Mixins
See the mixin components below for common properties.
* [VglObject3d](vgl-object3d)

## Properties
* {% include prop.md name="color" type="string" %} - If this is not the set the helper will take the color of the light.
* {% include prop.md name="size" type="float" %} - Dimensions of the plane.

## Example usage
```html
<vgl-renderer antialias style="width: 300px; height: 150px;">
    <vgl-scene>
        <vgl-directional-light position="0 0.5 0.5" color="#ff9966">
            <vgl-directional-light-helper></vgl-directional-light-helper>
        </vgl-directional-light>
    </vgl-scene>
    <vgl-perspective-camera orbit-position="8 1.8 0.5"></vgl-perspective-camera>
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
            <vgl-directional-light position='0 0.5 0.5' color='#ff9966'>
                <vgl-directional-light-helper></vgl-directional-light-helper>
            </vgl-directional-light>
        </vgl-scene>
        <vgl-perspective-camera orbit-position='8 1.8 0.5'></vgl-perspective-camera>
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
