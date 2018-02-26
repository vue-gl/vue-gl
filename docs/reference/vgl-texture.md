---
layout: reference
---
{% include breadcrumbs/textures.md %} VglTexture
# VglTexture `<vgl-texture>`
A texture to apply to a surface or as a reflection or refraction map, corresponding [THREE.Texture](https://threejs.org/docs/index.html#api/textures/Texture).
## Properties
* {% include prop.md name="src" type="string" %} - The path or URL to the file. This can also be a Data URI.

## Example usage
```html
<vgl-renderer antialias style="width: 300px; height: 150px;">
    <vgl-scene>
        <vgl-plane-geometry name="plane" width=512 height=512></vgl-plane-geometry>
        <vgl-texture src="path/to/image.jpg" name="texture"></vgl-texture>
        <vgl-mesh-standard-material name="std" map="texture"></vgl-mesh-standard-material>
        <vgl-mesh geometry="plane" material="std"></vgl-mesh>
        <vgl-ambient-light color="#ffeecc"></vgl-ambient-light>
        <vgl-directional-light position="0 1 2"></vgl-directional-light>
    </vgl-scene>
    <vgl-perspective-camera orbit-position="700 1 0.5"></vgl-perspective-camera>
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
            <vgl-plane-geometry name='plane' width=512 height=512></vgl-plane-geometry>
            <vgl-texture src='../img/shimoguri.jpg' name='texture'></vgl-texture>
            <vgl-mesh-standard-material name='std' map='texture'></vgl-mesh-standard-material>
            <vgl-mesh geometry='plane' material='std'></vgl-mesh>
            <vgl-ambient-light color='#ffeecc'></vgl-ambient-light>
            <vgl-directional-light position='0 1 2'></vgl-directional-light>
        </vgl-scene>
        <vgl-perspective-camera orbit-position='700 1 0.5'></vgl-perspective-camera>
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
