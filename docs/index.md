# VueGL Documentation and Examples
## Overview
Vue.js components for reactive 3D rendering. Depends on three.js.
## Usage
### At first
Via npm, run
```
npm install --save vue vue-gl
```
For browsers, insert
```
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/three"></script>
<script src="https://unpkg.com/vue-gl"></script>
```
### Use as global components
```
import Vue from "vue/dist/vue.esm.js";
import * as VueGL from "vue-gl";

Object.keys(VueGL).forEach((componentName) => {
    Vue.component(componentName, VueGL[componentName]);
});
```
Then, the example template below will be rendered as a WebGL canvas.
```
<vgl-renderer>
    <vgl-scene>
        <vgl-cube-geometry name="cube" />
        <vgl-standard-material name="std" />
        <vgl-mesh geometry="cube" material="std" />
    </vgl-scene>
    <vgl-camera orbit="phi: 1; theta: 1; radius: 10" />
</vgl-renderer>
```
## Examples
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/three"></script>
<script src="js/vue-gl.js"></script>
<script>
    Object.keys(VueGL).forEach((c) => {
        Vue.component(c, VueGL[c]);
    });
</script>
<div id="ex1">
    <div>
        <vgl-abstract>
            {{msg}}
        </vgl-abstract>
    </div>
</div>
<script>
    new Vue({
        el: "#ex1",
        data: {
            msg: "To check vue is started..."
        }
    });
</script>
