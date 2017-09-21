# VueGL Documentation and Examples
## Overview
[Vue.js](https://vuejs.org) components for reactive 3D rendering. Depends on [three.js](https://threejs.org/).
## Getting started
You need to load the vue.js and the three.js scripts with the vue-gl script.
```
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/three"></script>
<script src="https://unpkg.com/vue-gl"></script>
<script>
    Object.keys(VueGL).forEach(name => {
        Vue.component(name, VueGL[name]);
    });
</script>
```
You can also get install via npm. The three.js module will be installed as a dependency.
```
npm install --save vue vue-gl
```
```
import * as VueGL from "vue-gl";

Object.keys(VueGL).forEach(name => {
    Vue.component(name, VueGL[name]);
});
```
Then, the following code will render a sphere on the canvas.
```
<vgl-renderer class="vgl-canvas" style="width: 300px; height: 150px;">
    <vgl-scene>
        <vgl-sphere-geometry></vgl-sphere-geometry>
        <vgl-mesh-standard-material></vgl-mesh-standard-material>
        <vgl-mesh></vgl-mesh>
        <vgl-ambient-light></vgl-ambient-light>
        <vgl-directional-light></vgl-directional-light>
    </vgl-scene>
    <vgl-perspective-camera orbit-position="radius: 200; phi: 1; theta: 1;"></vgl-perspective-camera>
</vgl-renderer>
<script>
    new Vue({
        el: ".vgl-canvas"
    });
</script>
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
    <vgl-renderer class='vgl-canvas'>
        <vgl-scene>
            <vgl-sphere-geometry></vgl-sphere-geometry>
            <vgl-mesh-standard-material></vgl-mesh-standard-material>
            <vgl-mesh></vgl-mesh>
            <vgl-ambient-light></vgl-ambient-light>
            <vgl-directional-light></vgl-directional-light>
        </vgl-scene>
        <vgl-perspective-camera orbit-position='radius: 200; phi: 1; theta: 1;'></vgl-perspective-camera>
    </vgl-renderer>
    <script src='https://unpkg.com/vue/dist/vue.min.js'></script>
    <script src='https://unpkg.com/three/build/three.js'></script>
    <script src='js/vue-gl.js'></script>
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
