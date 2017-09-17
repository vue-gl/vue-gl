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
Then, the following code will be rendered as a WebGL canvas.
```
<div id="app">
    <vgl-renderer>
        <vgl-scene>
            <vgl-sphere-geometry />
            <vgl-mesh-standard-material />
            <vgl-mesh />
        </vgl-scene>
        <vgl-camera orbit="radius: 10; phi: 1; theta: 1;" />
    </vgl-renderer>
</div>
<script>
    new Vue({
        el: "#app"
    });
</script>
```
<iframe srcdoc="
    <style>
        body {
            margin: 0;
        }
        #app {
            height: 100vh;
        }
    </style>
    <script src='https://unpkg.com/vue/dist/vue.min.js'></script>
    <script src='https://unpkg.com/three/build/three.min.js'></script>
    <script src='js/vue-gl.min.js'></script>
    <div id='app'>
        <vgl-renderer>
            <vgl-scene>
                <vgl-sphere-geometry />
                <vgl-mesh-standard-material />
                <vgl-mesh />
            </vgl-scene>
            <vgl-camera orbit='radius: 10; phi: 1; theta: 1;' />
        </vgl-renderer>
    </div>
    <script>
        new Vue({
            el: '#app'
        });
    </script>
"></iframe>


